import {
	CloudXInterface,
	OnlineStatus,
	SessionInfo,
} from "@bombitmanbomb/cloudx";
import type { SessionInfoJSON } from "@bombitmanbomb/cloudx/lib/SessionInfo";
import { EventEmitter } from "stream";
import { v4 } from "uuid";
export class Neos {
	Cloud: CloudXInterface;
	private _settings: INeosSettings;
	private _updateInterval: NodeJS.Timer | null;
	public eventBus: EventEmitter;
	constructor(options: INeosOptions = ({} as unknown) as INeosOptions) {
		this.eventBus = new EventEmitter();
		const option: INeosOptions = {
			statusUpdateInterval: 60000,
			onlineStatus: OnlineStatus.Online,
			...options,
		};
		//! Nullify Sensative Info internally !//
		this._settings = {
			options: {
				...option,
				password: null,
				credential: (null as unknown) as string,
				sessionToken: null,
			},
		};
		this.Cloud = new CloudXInterface(null, "Neos.js", "2.0.0");
		this.Cloud.Login(
			option.credential,
			option.password as string,
			option.sessionToken as null,
			v4(),
			false,
			null
		).then(async (result) => {
			if (result.IsError) {
				if (!this.eventBus.emit("error", result.Entity))
					throw new Error((result.Entity as unknown) as string); //! Throw if not handled
			}
			//? Setup ?//

			//? Ready ?//
			this.eventBus.emit("ready");
		});
	}
	public async SendTextMessage(
		userid: string,
		message: string
	): Promise<boolean> {
		return this.Cloud.Messages.GetUserMessages(userid).SendTextMessage(message);
	}

	public async SendInvite(
		userid: string,
		session: string | SessionInfo | SessionInfoJSON
	): Promise<boolean> {
		const Session =
			session instanceof SessionInfo
				? session
				: typeof session === "string"
					? ((await this.GetSession(session)) as SessionInfo)
					: new SessionInfo(session);
		if (Session == null || !Session.IsValid) return false;
		return this.Cloud.Messages.GetUserMessages(userid).SendInviteMessage(
			Session
		);
	}

	public MarkAllRead(userid: string): void {
		this.Cloud.Messages.GetUserMessages(userid).MarkAllRead();
	}

	public GetUnreadCount(dirty = false): number {
		if (!dirty) {
			this.Cloud.Messages.MarkUnreadCountDirty(); // Update Count
			this.Cloud.Messages.Update();
		}
		return this.Cloud.Messages.TotalUnreadCount;
	}

	public async GetSession(sessionId: string): Promise<SessionInfo | null> {
		const result = await this.Cloud.GetSession(sessionId);
		if (result.IsOK) return result.Entity;
		return null;
	}

	public Update(): void {
		this.Cloud.Update();
	}

	public SetVisibility(status: OnlineStatus): boolean {
		this._settings.options.onlineStatus = status;
		return true;
	}

	public on(
		event: string | symbol,
		listener: (...args: any[]) => any
	): EventEmitter {
		return this.eventBus.on(event, listener);
	}
	public off(
		event: string | symbol,
		listener: (...args: any[]) => any
	): EventEmitter {
		return this.eventBus.on(event, listener);
	}
	public once(
		event: string | symbol,
		listener: (...args: any[]) => any
	): EventEmitter {
		return this.eventBus.once(event, listener);
	}
	public addListener(
		event: string | symbol,
		listener: (...args: any[]) => any
	): EventEmitter {
		return this.eventBus.addListener(event, listener);
	}
}

export interface INeosOptions {
	credential: string;
	password?: string | null;
	sessionToken?: string | null;
	statusUpdateInterval?: number;
	onlineStatus?: OnlineStatus;
}
interface INeosSettings {
	options: INeosOptions;
}
