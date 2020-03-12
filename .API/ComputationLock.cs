// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.ComputationLock
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public struct ComputationLock
  {
    [JsonProperty(PropertyName = "token")]
    public string Token { get; private set; }

    [JsonProperty(PropertyName = "timestamp")]
    public DateTime ExpireTimestamp { get; private set; }

    public bool IsLocked
    {
      get
      {
        if (string.IsNullOrWhiteSpace(this.Token))
          return false;
        return DateTime.UtcNow > this.ExpireTimestamp;
      }
    }

    public bool TryLock(TimeSpan duration)
    {
      if (this.IsLocked)
        return false;
      this.Token = Guid.NewGuid().ToString();
      this.ExpireTimestamp = DateTime.UtcNow + duration;
      return true;
    }

    public bool TryExtend(string token, TimeSpan duration)
    {
      if (token != this.Token)
        return false;
      this.ExpireTimestamp = DateTime.UtcNow + duration;
      return true;
    }

    public bool TryRelease(string token)
    {
      if (this.Token != token)
        return false;
      this.Token = (string) null;
      this.ExpireTimestamp = new DateTime();
      return true;
    }
  }
}
