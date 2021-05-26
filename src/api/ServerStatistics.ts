export class ServerStatistics {
	public LastUpdate: Date;
	public ResponseTimeMilliseconds: number;
	constructor($b: ServerStatisticsJSON) {
		this.LastUpdate = $b.lastUpdate;
		this.ResponseTimeMilliseconds = $b.responseTimeMilliseconds;
	}
	toJSON(): ServerStatisticsJSON {
		return {
			lastUpdate: this.LastUpdate,
			responseTimeMilliseconds: this.ResponseTimeMilliseconds,
		};
	}
}
export interface ServerStatisticsJSON {
	lastUpdate: Date;
	responseTimeMilliseconds: number;
}
