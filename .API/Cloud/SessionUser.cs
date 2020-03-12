// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SessionUser
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class SessionUser : IEquatable<SessionUser>
  {
    [JsonProperty(PropertyName = "username")]
    [JsonPropertyName("username")]
    public string Username { get; set; }

    [JsonProperty(PropertyName = "userID")]
    [JsonPropertyName("userID")]
    public string UserID { get; set; }

    [JsonProperty(PropertyName = "isPresent")]
    [JsonPropertyName("isPresent")]
    public bool IsPresent { get; set; }

    public bool Equals(SessionUser other)
    {
      if (this.Username == other.Username && this.UserID == other.UserID)
        return this.IsPresent == other.IsPresent;
      return false;
    }
  }
}
