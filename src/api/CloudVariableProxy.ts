import { CloudVariableDefinition } from "./CloudVariableDefinition";
import { CloudVariable } from "./CloudVariable";
import { CloudVariableManager } from "./CloudVariableManager";
import { CloudVariableState } from "./CloudVariableState";
import { CloudVariableIdentity } from "./CloudVariableIdentity";
import { IdUtil } from "./IdUtil";
import { OwnerType } from "./OwnerType";
import {
	TimeSpan,
	CancellationTokenSource,
	List,
	Out,
} from "@bombitmanbomb/utils";
import { CloudVariableHelper } from "./CloudVariableHelper";
export class CloudVariableProxy {
	public static WRITE_DELAY_SECONDS = 30.0;
	public static REFRESH_INTERVAL_SECONDS = 300.0;
	public static UNREGISTER_DELAY_SECONDS = 300.0;
	public _definition!: CloudVariableDefinition;
	private _variable!: CloudVariable;
	private _manager!: CloudVariableManager;
	private _readTask!: (() => unknown) | null; // TODO
	private _readCancel!: CancellationTokenSource | null;
	private _writeTask!: (() => unknown) | null | Promise<unknown>;
	private _unregisterCancel!: CancellationTokenSource | null;
	public State!: CloudVariableState;
	public get HasValidValue(): boolean {
		return (
			this.State != CloudVariableState.Uninitialized &&
			this.State != CloudVariableState.Invalid
		);
	}
	public LastCloudWrite!: Date;
	public LastCloudRead!: Date;
	public Identity!: CloudVariableIdentity;
	public get HasListeners(): boolean {
		return this._valueChanged != null;
	}
	public get RawValue(): string {
		return this._variable?.Value;
	}
	public get IsDefinitionOwner(): boolean {
		if (this._definition == null) return false;
		return IdUtil.GetOwnerType(this._definition.DefinitionOwnerId) ==
			OwnerType.User
			? this._definition.DefinitionOwnerId == this.Cloud.CurrentUser?.Id
			: this.Cloud.IsCurrentUserMemberOfGroup(
				this._definition.DefinitionOwnerId
			  );
	}
	public get IsVariableOwner(): boolean {
		return IdUtil.GetOwnerType(this.Identity.ownerId) == OwnerType.User
			? this.Identity.ownerId == this.Cloud.CurrentUser?.Id
			: this.Cloud.IsCurrentUserMemberOfGroup(this.Identity.ownerId);
	}
	public PublicRead!: boolean;
	public PublicWrite!: boolean;
	public PrivateWrite!: boolean;
	public get Cloud(): CloudXInterface {
		return this._manager.Cloud;
	}
	private _valueChanged: unknown; //TODO
	constructor(identity: CloudVariableIdentity, manager: CloudVariableManager) {
		this.CloudVariableProxy(identity, manager);
	}
	public CloudVariableProxy(
		identity: CloudVariableIdentity,
		manager: CloudVariableManager
	): void {
		this.Identity = identity;
		this._manager = manager;
		this.State = CloudVariableState.Uninitialized;
		this.ScheduleUnregistration();
		const Loop = () => {
			this.Refresh().then(() => {
				TimeSpan.Delay(TimeSpan.fromSeconds(300.0)).then(() => {
					if (
						this.State != CloudVariableState.Unregistered &&
						this.State != CloudVariableState.Invalid
					) {
						Loop();
					}
				});
			});
		};
	}
	public Register(onChanged: () => unknown): void {
		if (this.State == CloudVariableState.Unregistered)
			throw new Error("Proxy has been unregistered!");
		let flag = false;
		if (this._unregisterCancel != null && !this.IsVariableOwner) flag = true;
		this._unregisterCancel?.Cancel();
		this._unregisterCancel = null;
		this._valueChanged = onChanged;
		if (!flag) return;
		this.Refresh();
	}
	public Unregister(onChanged: unknown): void {
		if (this.State == CloudVariableState.Unregistered)
			throw new Error("Proxy has been unregistered!");
		this._valueChanged = onChanged; //TODO HANDLER
		if (this._valueChanged != null) return;
		this.ScheduleUnregistration();
	}

	private ScheduleUnregistration(): void {
		this._unregisterCancel = new CancellationTokenSource(null);
		const proxy = this;
		TimeSpan.Delay(
			TimeSpan.fromSeconds(300),
			proxy._unregisterCancel?.Token
		).then(() => {
			if (
				proxy._unregisterCancel?.IsCancellationRequested ||
				!proxy._manager.TryUnregisterProxy(proxy)
			)
				return;
			proxy.State = CloudVariableState.Unregistered;
		});
	}
	public WriteToCloud(): boolean {
		if (this.State == CloudVariableState.Unregistered)
			throw new Error("Proxy has been unregistered!");
		if (this.State != CloudVariableState.ChangedLocally)
			throw new Error(
				`Variable isn't changed locally! State: ${this.State}, Identity: ${this.Identity}`
			);
		if (
			new Date(new Date().getTime() - this.LastCloudWrite.getTime()).getTime() /
				1000 <
				30.0 ||
			this._writeTask == null
		)
			return false;
		this.State = CloudVariableState.WrittenToCloud;
		this.LastCloudWrite = new Date();
		this._writeTask = (async () => {
			try {
				await this._manager.WriteVariable(this._variable);
				this._readCancel?.Cancel();
				this._readCancel = null;
			} catch (error) {
				error;
			} finally {
				this._writeTask = null;
			}
		})();
		return true;
	}
	public async ForceWriteToCloud(): Promise<void> {
		if (this.State != CloudVariableState.ChangedLocally)
			throw new Error(
				`Variable isn't changed locally! State: ${this.State}, Identity: ${this.Identity}`
			);
		const writeTask = this._writeTask;
		if (writeTask != null) await writeTask;
		await this._manager.WriteVariable(this._variable);
	}
	public async Refresh(): Promise<any> {
		const readTask = this._readTask;
		if (readTask != null) return readTask;
		if (
			this.State == CloudVariableState.ChangedLocally ||
			this._writeTask != null
		)
			return new Promise((a) => {
				a(void 0);
			}); //TODO Task
		if (this._readTask != null) return this._readTask;
		this._readCancel = new CancellationTokenSource();
		const cancel = this._readCancel.Token;
		const task = async () => {
			try {
				let result = await this._manager.ReadVariable(
					this.Identity.ownerId,
					this.Identity.path
				);
				while (!this.Cloud.Friends.InitialFriendsLoaded)
					await TimeSpan.Delay(TimeSpan.fromSeconds(0.5));
				//
				if (
					cancel.IsCancellationRequested ||
					this.State == CloudVariableState.ChangedLocally
				)
					return;
				if (result == null) {
					this.State = CloudVariableState.Invalid;
				} else {
					const num =
						this._variable == null
							? 1
							: this._variable?.Value != result.Variable?.Value
								? 1
								: 0;
					this._definition = result.Definition;
					this._variable = result.Variable;
					this.PublicRead = this.CanAccessInPublic(
						this._definition.ReadPermissions
					);
					this.PublicWrite = this.CanAccessInPublic(
						this._definition.WritePermissions
					);
					this.PrivateWrite = this.CanAccessInPrivate(
						this._definition.WritePermissions
					);
					this.LastCloudRead = new Date();
					this.State = CloudVariableState.ReadFromTheCloud;
					if (num != 0) this.RunChangedEvent();
				}
				result = null;
			} catch (error) {
				error;
			} finally {
				this._readTask = null;
			}
		};
		this._readTask = task;
		task();
		return task;
	}
	public CanAccessInPublic(permissions: List<string>): boolean {
		for (const permission of permissions) {
			if (
				CloudVariableHelper.AllowsPublicAccess(permission) &&
				this.CanAccessInPrivate(permission)
			)
				return true;
		}
		return false;
	}
	CanAccessInPrivate(perm: string): boolean;
	CanAccessInPrivate(permissions: List<string>): boolean;
	public CanAccessInPrivate(permissions: List<string> | string): boolean {
		if (typeof permissions === "string") {
			return (
				permissions == "anyone" ||
				((!CloudVariableHelper.RequiresDefinitionOwner(permissions) ||
					this.IsDefinitionOwner) &&
					(!CloudVariableHelper.RequiresVariableOwner(permissions) ||
						this.IsVariableOwner) &&
					(!CloudVariableHelper.TargetDefinitionOwnerOnly(permissions) ||
						!(this.Identity.ownerId != this._definition.DefinitionOwnerId)) &&
					(!CloudVariableHelper.TargetContactsOnly(permissions) ||
						this.Cloud.Friends.IsFriend(this.Identity.ownerId)))
			);
		} else {
			for (const permission in permissions) {
				if (this.CanAccessInPrivate(permission)) return true;
			}
			return false;
		}
	}
	public ReadValue<T>(): T | null {
		if (this._variable == null) return null;
		const obj: Out<T> = new Out();
		return CloudVariableHelper.ParseValue<T>(
			this._variable.Value,
			this._definition.VariableType,
			obj
		)
			? (obj.Out as T)
			: null;
	}
	public SetValue<T>(value: T): boolean {
		if (typeof value === "string") {
			if (
				this._definition == null ||
				!CloudVariableHelper.IsValidValue(this._definition.VariableType, value)
			)
				return false;
			if (this._variable.Value == value) return true;
			this._variable.Value = value;
			this._readCancel?.Cancel();
			this._readCancel = null;
			this.State = CloudVariableState.ChangedLocally;
			this._manager.RegisterChanged(this);
			this.RunChangedEvent();
			return true;
		} else {
			return this.SetValue(CloudVariableHelper.EncodeValue<T>(value));
		}
	}
	private RunChangedEvent(): void {
		try {
			const valueChanged = this._valueChanged as (
				a: CloudVariableProxy
			) => unknown;
			if (valueChanged == null) return;
			valueChanged(this);
		} catch (ex) {
			console.error("Exception running ValueChanged:\n" + ex);
		}
	}
}
