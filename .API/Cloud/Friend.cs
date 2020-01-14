// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Friend
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class Friend
  {
    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string FriendUserId { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "friendUsername")]
    [JsonPropertyName("friendUsername")]
    public string FriendUsername { get; set; }

    [JsonProperty(PropertyName = "friendStatus")]
    [JsonPropertyName("friendStatus")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public FriendStatus FriendStatus { get; set; }

    [JsonProperty(PropertyName = "isAccepted")]
    [JsonPropertyName("isAccepted")]
    public bool IsAccepted { get; set; }

    [JsonProperty(PropertyName = "userStatus")]
    [JsonPropertyName("userStatus")]
    public UserStatus UserStatus { get; set; }

    [JsonProperty(PropertyName = "latestMessageTime")]
    [JsonPropertyName("latestMessageTime")]
    public DateTime LatestMessageTime { get; set; }

    [JsonProperty(PropertyName = "profile")]
    [JsonPropertyName("profile")]
    public UserProfile Profile { get; set; }
  }
}
