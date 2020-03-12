// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.UserTags
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;

namespace CloudX.Shared
{
  public static class UserTags
  {
    public static string NeosTeam
    {
      get
      {
        return "neos team";
      }
    }

    public static string NeosAdmin
    {
      get
      {
        return "neos admin";
      }
    }

    public static string NeosModerator
    {
      get
      {
        return "neos moderator";
      }
    }

    public static string NeosEast
    {
      get
      {
        return "neos east";
      }
    }

    public static string NeosCommunityManager
    {
      get
      {
        return "neos community manager";
      }
    }

    public static string DiagnoseRecordSync
    {
      get
      {
        return "diagnose record sync";
      }
    }

    public static string HearingImpaired
    {
      get
      {
        return "hearing impaired";
      }
    }

    public static string Potato
    {
      get
      {
        return "potato";
      }
    }

    public static string Coffee
    {
      get
      {
        return "coffee";
      }
    }

    public static string Java
    {
      get
      {
        return "java";
      }
    }

    public static string CustomBadge(Uri neosDb, bool pointFiltering)
    {
      string str = "custom badge:" + CloudXInterface.NeosDBSignature(neosDb);
      if (pointFiltering)
        str += ".point";
      return str;
    }

    public static Uri GetCustomBadge(string badge, out bool pointFiltering)
    {
      if (!badge.StartsWith("custom badge:"))
      {
        pointFiltering = false;
        return (Uri) null;
      }
      badge = badge.Substring("custom badge:".Length).Trim();
      pointFiltering = badge.Contains(".point");
      return new Uri("neosdb:///" + badge.Trim());
    }

    public static string NCC_Participant
    {
      get
      {
        return "ncc participant";
      }
    }

    public static string NCC_Diamond
    {
      get
      {
        return "ncc diamond";
      }
    }

    public static string NCC_Gold
    {
      get
      {
        return "ncc gold";
      }
    }

    public static string NCC_Silver
    {
      get
      {
        return "ncc silver";
      }
    }
  }
}
