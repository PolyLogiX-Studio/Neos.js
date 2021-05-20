import type { List } from "@bombitmanbomb/utils";
export class CloudVariableDefinition {
	DefinitionOwnerId: string;
	Subpath: string;
	VariableType: string;
	DefaultValue: string;
	ReadPermissions: List<string>;
	WritePermissions: List<string>;
	ListPermissions: List<string>;
	constructor($b: CloudVariableDefinitionJSON) {
		this.DefinitionOwnerId = $b.definitionOwnerId;
		this.Subpath = $b.subpath;
		this.VariableType = $b.variableType;
		this.DefaultValue = $b.defaultValue;
		this.ReadPermissions = $b.readPermissions;
		this.WritePermissions = $b.writePermissions;
		this.ListPermissions = $b.listPermissions;
	}
	toJSON(): CloudVariableDefinitionJSON {
		return {
			definitionOwnerId: this.DefinitionOwnerId,
			subpath: this.Subpath,
			variableType: this.VariableType,
			defaultValue: this.DefaultValue,
			readPermissions: this.ReadPermissions,
			writePermissions: this.WritePermissions,
			listPermissions: this.ListPermissions,
		};
	}
}
interface CloudVariableDefinitionJSON {
	definitionOwnerId: string;
	subpath: string;
	variableType: string;
	defaultValue: string;
	readPermissions: List<string>;
	writePermissions: List<string>;
	listPermissions: List<string>;
}
