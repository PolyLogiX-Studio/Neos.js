// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.License
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
