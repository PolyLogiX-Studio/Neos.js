// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RecordId
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  [Serializable]
  public class RecordId : IEquatable<RecordId>
  {
    [JsonProperty(PropertyName = "recordId")]
    [JsonPropertyName("recordId")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    public override bool Equals(object obj)
    {
      RecordId other = obj as RecordId;
      if (other != null)
        return this.Equals(other);
      return false;
    }

    public override int GetHashCode()
    {
      return this.Id.GetHashCode() ^ this.OwnerId.GetHashCode();
    }

    public bool Equals(RecordId other)
    {
      if (this.Id == other.Id)
        return this.OwnerId == other.OwnerId;
      return false;
    }

    public RecordId(string ownerId, string recordId)
    {
      this.OwnerId = ownerId;
      this.Id = recordId;
    }

    public RecordId()
    {
    }
  }
}
