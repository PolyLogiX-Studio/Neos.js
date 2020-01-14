﻿// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SessionUser
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

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
