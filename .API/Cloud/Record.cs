// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Record
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  [Serializable]
  public class Record : IRecord
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string RecordId { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "assetUri")]
    [JsonPropertyName("assetUri")]
    public string AssetURI { get; set; }

    [JsonIgnore]
    public Uri URL
    {
      get
      {
        return RecordHelper.GetUrl((IRecord) this);
      }
      set
      {
        RecordHelper.SetUrl((IRecord) this, value);
      }
    }

    [JsonProperty(PropertyName = "globalVersion")]
    [JsonPropertyName("globalVersion")]
    public int GlobalVersion { get; set; }

    [JsonProperty(PropertyName = "localVersion")]
    [JsonPropertyName("localVersion")]
    public int LocalVersion { get; set; }

    [JsonProperty(PropertyName = "lastModifyingUserId")]
    [JsonPropertyName("lastModifyingUserId")]
    public string LastModifyingUserId { get; set; }

    [JsonProperty(PropertyName = "lastModifyingMachineId")]
    [JsonPropertyName("lastModifyingMachineId")]
    public string LastModifyingMachineId { get; set; }

    [JsonProperty(PropertyName = "name")]
    [JsonPropertyName("name")]
    public string Name { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "description")]
    [JsonPropertyName("description")]
    public string Description { get; set; }

    [JsonProperty(PropertyName = "recordType")]
    [JsonPropertyName("recordType")]
    public string RecordType { get; set; }

    [JsonProperty(PropertyName = "ownerName")]
    [JsonPropertyName("ownerName")]
    public string OwnerName { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "tags")]
    [JsonPropertyName("tags")]
    public HashSet<string> Tags { get; set; }

    [JsonProperty(PropertyName = "path")]
    [JsonPropertyName("path")]
    public string Path { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "thumbnailUri")]
    [JsonPropertyName("thumbnailUri")]
    public string ThumbnailURI { get; set; }

    [JsonProperty(PropertyName = "lastModificationTime")]
    [JsonPropertyName("lastModificationTime")]
    public DateTime LastModificationTime { get; set; }

    [JsonProperty(PropertyName = "creationTime")]
    [JsonPropertyName("creationTime")]
    public DateTime? CreationTime { get; set; }

    [JsonProperty(PropertyName = "firstPublishTime")]
    [JsonPropertyName("firstPublishTime")]
    public DateTime? FirstPublishTime { get; set; }

    [JsonProperty(PropertyName = "isPublic")]
    [JsonPropertyName("isPublic")]
    public bool IsPublic { get; set; }

    [JsonProperty(PropertyName = "isForPatrons")]
    [JsonPropertyName("isForPatrons")]
    public bool IsForPatrons { get; set; }

    [JsonProperty(PropertyName = "isListed")]
    [JsonPropertyName("isListed")]
    public bool IsListed { get; set; }

    [JsonProperty(PropertyName = "visits")]
    [JsonPropertyName("visits")]
    public int Visits { get; set; }

    [JsonProperty(PropertyName = "rating")]
    [JsonPropertyName("rating")]
    public double Rating { get; set; }

    [JsonProperty(PropertyName = "submissions")]
    [JsonPropertyName("submissions")]
    public List<Submission> Submissions { get; set; }

    [JsonIgnore]
    public List<string> Manifest { get; set; }

    [JsonProperty(NullValueHandling = NullValueHandling.Ignore, PropertyName = "neosDBmanifest")]
    [JsonPropertyName("neosDBmanifest")]
    public List<NeosDBAsset> NeosDBManifest { get; set; }

    public static bool IsValidId(string recordId)
    {
      return recordId.StartsWith("R-");
    }

    [JsonIgnore]
    public bool IsValidOwnerId
    {
      get
      {
        return IdUtil.GetOwnerType(this.OwnerId) != OwnerType.INVALID;
      }
    }

    [JsonIgnore]
    public bool IsValidRecordId
    {
      get
      {
        return RecordUtil.IsValidRecordID(this.RecordId);
      }
    }

    public void ResetVersioning()
    {
      this.LocalVersion = 0;
      this.GlobalVersion = 0;
      this.LastModifyingMachineId = (string) null;
      this.LastModifyingUserId = (string) null;
    }
  }
}
