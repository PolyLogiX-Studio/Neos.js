// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.NeosSession
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class NeosSession
  {
    [JsonProperty(PropertyName = "reverseTimestamp")]
    [JsonPropertyName("reverseTimestamp")]
    public string ReverseTimestamp { get; set; }

    [JsonProperty(PropertyName = "sessionId")]
    [JsonPropertyName("sessionId")]
    public string SessionId { get; set; }

    [JsonProperty(PropertyName = "neosVersion")]
    [JsonPropertyName("neosVersion")]
    public string NeosVersion { get; set; }

    [JsonProperty(PropertyName = "userId")]
    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "machineId")]
    [JsonPropertyName("machineId")]
    public string MachineId { get; set; }

    [JsonProperty(PropertyName = "countryCode")]
    [JsonPropertyName("countryCode")]
    public string CountryCode { get; set; }

    [JsonProperty(PropertyName = "systemLocale")]
    [JsonPropertyName("systemLocale")]
    public string SystemLocale { get; set; }

    [JsonProperty(PropertyName = "clientIp")]
    [JsonPropertyName("clientIp")]
    public string ClientIp { get; set; }

    [JsonProperty(PropertyName = "sessionStart")]
    [JsonPropertyName("sessionStart")]
    public DateTime SessionStart { get; set; }

    [JsonProperty(PropertyName = "sessionEnd")]
    [JsonPropertyName("sessionEnd")]
    public DateTime SessionEnd { get; set; }

    [JsonProperty(PropertyName = "visitedWorlds")]
    [JsonPropertyName("visitedWorlds")]
    public int VisitedWorlds { get; set; }

    [JsonProperty(PropertyName = "createdWorlds")]
    [JsonPropertyName("createdWorlds")]
    public int CreatedWorlds { get; set; }

    [JsonProperty(PropertyName = "operatingSystem")]
    [JsonPropertyName("operatingSystem")]
    public string OperatingSystem { get; set; }

    [JsonProperty(PropertyName = "headDevice")]
    [JsonPropertyName("headDevice")]
    public string HeadDevice { get; set; }

    [JsonProperty(PropertyName = "headDeviceModel")]
    [JsonPropertyName("headDeviceModel")]
    public string HeadDeviceModel { get; set; }

    [JsonProperty(PropertyName = "cpu")]
    [JsonPropertyName("cpu")]
    public string CPU { get; set; }

    [JsonProperty(PropertyName = "gpu")]
    [JsonPropertyName("gpu")]
    public string GPU { get; set; }

    [JsonProperty(PropertyName = "memoryBytes")]
    [JsonPropertyName("memoryBytes")]
    public long MemoryBytes { get; set; }

    [JsonProperty(PropertyName = "peripherals")]
    [JsonPropertyName("peripherals")]
    public string Peripherals { get; set; }
  }
}
