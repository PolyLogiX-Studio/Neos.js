﻿// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserSession
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class UserSession
  {
    [JsonProperty(PropertyName = "userId")]
    [JsonPropertyName("userId")]
    public string UserId { get; set; }

    [JsonProperty(PropertyName = "token")]
    [JsonPropertyName("token")]
    public string SessionToken { get; set; }

    [JsonProperty(PropertyName = "created")]
    [JsonPropertyName("created")]
    public DateTime SessionCreated { get; set; }

    [JsonProperty(PropertyName = "expire")]
    [JsonPropertyName("expire")]
    public DateTime SessionExpire { get; set; }

    [NullOnExternal]
    [JsonProperty(PropertyName = "secretMachineId")]
    [JsonPropertyName("secretMachineId")]
    public string SecretMachineId { get; set; }

    [JsonProperty(PropertyName = "rememberMe")]
    [JsonPropertyName("rememberMe")]
    public bool RememberMe { get; set; }

    [JsonIgnore]
    public bool IsExpired
    {
      get
      {
        return DateTime.UtcNow > this.SessionExpire.ToUniversalTime();
      }
    }
  }
}
