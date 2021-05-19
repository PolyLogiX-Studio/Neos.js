export class CloudResult<T> {
	public State!: number;
	public Content!: T;
	public Entity!: T;
	constructor(result: T, state: number, content: string) {
		this.CloudResult(result, state, content);
	}
	CloudResult(result: T, state: number, content: string): void {
		this.Entity = result;
		this.State = state;
		if (!this.IsError) return;
		if (content == null) return;
		try {
			this.Content = JSON.parse(content)?.Message;
		} catch (error) {
			this.Content = (content as unknown) as T;
		}
	}
	public get IsOK(): boolean {
		return this.State == 200 || this.State == 204;
	}
	public get IsError(): boolean {
		return !this.IsOK;
	}
	public AsResult<E>(): CloudResult<E> {
		return new CloudResult<E>(
			(this.Entity as unknown) as E,
			this.State,
			(this.Content as unknown) as string
		);
	}
	public ToString(): string {
		let str!: string;
		if (this.Entity != null) {
			try {
				str = JSON.stringify(this.Entity);
			} catch (error) {
				str = "EXCEPTION SERIALIZING: " + error?.toString();
			}
		}
		const T = this.Entity as any;
		return `CloudResult<${T?.constructor?.name ?? "Unknown"}> - State: ${
			this.State
		}, Content: ${this.Content}, Entity: ${str}`;
	}
}
