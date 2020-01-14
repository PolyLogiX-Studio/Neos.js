﻿// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.HubPatrons
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class HubPatrons
  {
    public const int MAX_NAMES = 400;
    public const int MAX_PICTURES = 50;
    public const string VARIABLE_NAME = "hub.patrons";

    [JsonProperty(PropertyName = "patron-names")]
    [JsonPropertyName("patron-names")]
    public List<string> PatronNames { get; set; } = new List<string>();

    [JsonProperty(PropertyName = "patron-pictures")]
    [JsonPropertyName("patron-pictures")]
    public List<PicturePatreon> PatronPictures { get; set; } = new List<PicturePatreon>();

    public void EnsureMaxLimitsRandomized()
    {
      while (this.PatronNames.Count > 400)
        this.PatronNames.TakeRandom<string>();
      while (this.PatronPictures.Count > 50)
        this.PatronPictures.TakeRandom<PicturePatreon>();
    }
  }
}
