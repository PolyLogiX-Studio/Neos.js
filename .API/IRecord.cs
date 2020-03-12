// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.IRecord
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;
using System.Collections.Generic;

namespace CloudX.Shared
{
  public interface IRecord
  {
    string RecordId { get; set; }

    string OwnerId { get; set; }

    string AssetURI { get; set; }

    Uri URL { get; }

    int GlobalVersion { get; set; }

    int LocalVersion { get; set; }

    string LastModifyingUserId { get; set; }

    string LastModifyingMachineId { get; set; }

    string Name { get; set; }

    string OwnerName { get; set; }

    string Description { get; set; }

    string RecordType { get; set; }

    HashSet<string> Tags { get; set; }

    string Path { get; set; }

    string ThumbnailURI { get; set; }

    bool IsPublic { get; set; }

    bool IsForPatrons { get; set; }

    bool IsListed { get; set; }

    int Visits { get; set; }

    double Rating { get; set; }

    DateTime? FirstPublishTime { get; set; }

    DateTime? CreationTime { get; set; }

    DateTime LastModificationTime { get; set; }

    List<NeosDBAsset> NeosDBManifest { get; set; }
  }
}
