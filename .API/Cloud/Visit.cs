// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Visit
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class Visit
  {
    [JsonProperty(PropertyName = "url")]
    [JsonPropertyName("url")]
    public string URL { get; set; }

    [JsonProperty(PropertyName = "userId")]
    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "neosSessionID")]
    [JsonPropertyName("neosSessionID")]
    public string NeosSessionID { get; set; }

    [JsonProperty(PropertyName = "recordVersion")]
    [JsonPropertyName("recordVersion")]
    public int RecordVersion { get; set; }

    [JsonProperty(PropertyName = "duration")]
    [JsonPropertyName("duration")]
    public long Duration { get; set; }

    [JsonProperty(PropertyName = "start")]
    [JsonPropertyName("start")]
    public DateTime Start { get; set; }

    [JsonProperty(PropertyName = "end")]
    [JsonPropertyName("end")]
    public DateTime End { get; set; }

    [JsonProperty(PropertyName = "referal")]
    [JsonPropertyName("referal")]
    public string Referal { get; set; }

    [JsonIgnore]
    public bool IsValid
    {
      get
      {
        return this.Start.Year >= 2016 && !(this.Start >= this.End) && ((this.End - this.Start).TotalSeconds >= (double) this.Duration && !string.IsNullOrWhiteSpace(this.URL));
      }
    }
  }
}
