import { color } from "@bombitmanbomb/basex";
export class SugarCube {
	BatchId: string;
	SequenceNumber: number;
	GeneratedOn: Date;
	Consumed: boolean;
	ConsumedOn: Date;
	OriginalOwnerId: string;
	CurrentOwnerId: string;
	RedChannel: number;
	GreenChannel: number;
	BlueChannel: number;
	constructor($b: SugarCubeJSON) {
		this.BatchId = $b.batchId;
		this.SequenceNumber = $b.sequenceNumber;
		this.GeneratedOn = $b.generatedOn;
		this.Consumed = $b.consumed;
		this.ConsumedOn = $b.consumedOn;
		this.OriginalOwnerId = $b.originalOwnerId;
		this.CurrentOwnerId = $b.currentOwnerId;
		this.RedChannel = $b.redChannel;
		this.GreenChannel = $b.greenChannel;
		this.BlueChannel = $b.blueChannel;
	}
	public get Color(): color {
		return new color(this.RedChannel, this.GreenChannel, this.BlueChannel);
	}
	public set Color(value: { r: number; g: number; b: number }) {
		this.RedChannel = value.r;
		this.GreenChannel = value.g;
		this.BlueChannel = value.b;
	}
}
export interface SugarCubeJSON {
	batchId: string;
	sequenceNumber: number;
	generatedOn: Date;
	consumed: boolean;
	consumedOn: Date;
	originalOwnerId: string;
	currentOwnerId: string;
	redChannel: number;
	greenChannel: number;
	blueChannel: number;
}
