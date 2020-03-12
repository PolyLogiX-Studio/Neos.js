// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Submission
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [Serializable]
  public class Submission
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string GroupId { get; set; }

    [JsonProperty(PropertyName = "targetRecordId")]
    [JsonPropertyName("targetRecordId")]
    public RecordId TargetRecordId { get; set; } = new RecordId();

    [JsonProperty(PropertyName = "submissionTime")]
    [JsonPropertyName("submissionTime")]
    public DateTime SubmissionTime { get; set; }

    [JsonProperty(PropertyName = "submittedById")]
    [JsonPropertyName("submittedById")]
    public string SubmittedById { get; set; }

    [JsonProperty(PropertyName = "submittedByName")]
    [JsonPropertyName("submittedByName")]
    public string SubmittedByName { get; set; }

    [JsonProperty(PropertyName = "featured")]
    [JsonPropertyName("featured")]
    public bool Featured { get; set; }

    [JsonProperty(PropertyName = "featuredByUserId")]
    [JsonPropertyName("featuredByUserId")]
    public string FeaturedByUserId { get; set; }

    [JsonProperty(PropertyName = "featuredTimestamp")]
    [JsonPropertyName("featuredTimestamp")]
    public DateTime? FeaturedTimestamp { get; set; }
  }
}
