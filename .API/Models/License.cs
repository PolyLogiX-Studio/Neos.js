// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.License
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class License
  {
    [JsonProperty(PropertyName = "licenseGroup")]
    [JsonPropertyName("licenseGroup")]
    public string LicenseGroup { get; set; }

    [JsonProperty(PropertyName = "licenseKey")]
    [JsonPropertyName("licenseKey")]
    public string LicenseKey { get; set; }

    [JsonProperty("pairedMachineUUID")]
    [JsonPropertyName("pairedMachineUUID")]
    public string PairedMachineUUID { get; set; }
  }
}
