// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudVariableDefinition
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class CloudVariableDefinition
  {
    [JsonProperty("definitionOwnerId")]
    [JsonPropertyName("definitionOwnerId")]
    public string DefinitionOwnerId { get; set; }

    [JsonProperty("subpath")]
    [JsonPropertyName("subpath")]
    public string Subpath { get; set; }

    [JsonProperty(PropertyName = "typeHint")]
    [JsonPropertyName("typeHint")]
    public string TypeHint { get; set; }

    [JsonProperty(PropertyName = "defaultValue")]
    [JsonPropertyName("defaultValue")]
    public string DefaultValue { get; set; }

    [JsonProperty(PropertyName = "variableOwnerCanRead")]
    [JsonPropertyName("variableOwnerCanRead")]
    public bool VariableOwnerCanRead { get; set; }

    [JsonProperty(PropertyName = "variableOwnerCanWrite")]
    [JsonPropertyName("variableOwnerCanWrite")]
    public bool VariableOwnerCanWrite { get; set; }

    [JsonProperty(PropertyName = "anyoneCanRead")]
    [JsonPropertyName("anyoneCanRead")]
    public bool AnyoneCanRead { get; set; }

    [JsonProperty(PropertyName = "anyoneCanWrite")]
    [JsonPropertyName("anyoneCanWrite")]
    public bool AnyoneCanWrite { get; set; }

    public bool CanRead(string variableOwnerId, string readerId)
    {
      return this.AnyoneCanRead || this.VariableOwnerCanRead && variableOwnerId == readerId || readerId == this.DefinitionOwnerId;
    }

    public bool CanWrite(string variableOwnerId, string writerId)
    {
      return this.AnyoneCanWrite || this.VariableOwnerCanWrite && variableOwnerId == writerId || writerId == this.DefinitionOwnerId;
    }
  }
}
