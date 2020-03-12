// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.NeosAccount
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;

namespace CloudX.Shared
{
  public static class NeosAccount
  {
    public static int MinCents(AccountType type)
    {
      int num = 100;
      switch (type)
      {
        case AccountType.Normal:
          return 0;
        case AccountType.AgentSmith:
          return num;
        case AccountType.BladeRunner:
          return num * 6;
        case AccountType.Gunter:
          return num * 12;
        case AccountType.Neuromancer:
          return num * 24;
        case AccountType.Architect:
          return num * 32;
        case AccountType.Curator:
          return num * 72;
        case AccountType.Level144:
          return num * 144;
        case AccountType.Level250:
          return num * 250;
        case AccountType.Anorak:
          return num * 500;
        default:
          throw new Exception("Invalid AccountType: " + type.ToString());
      }
    }

    public static string AccountName(AccountType type)
    {
      switch (type)
      {
        case AccountType.Normal:
          return "Standard Account";
        case AccountType.AgentSmith:
          return "Agent Smith";
        case AccountType.BladeRunner:
          return "Blade Runner";
        case AccountType.Gunter:
          return "Gunter";
        case AccountType.Neuromancer:
          return "Neuromancer";
        case AccountType.Architect:
          return "Architect";
        case AccountType.Curator:
          return "Curator";
        case AccountType.Level144:
          return "Level 144";
        case AccountType.Level250:
          return "Level 250";
        case AccountType.Anorak:
          return "Anorak";
        default:
          return "Unknown Account Type";
      }
    }

    public static long StorageBytes(AccountType type)
    {
      long num = 1073741824;
      switch (type)
      {
        case AccountType.Normal:
          return num;
        case AccountType.AgentSmith:
          return num * 5L;
        case AccountType.BladeRunner:
          return num * 25L;
        case AccountType.Gunter:
          return num * 50L;
        case AccountType.Neuromancer:
          return num * 100L;
        case AccountType.Architect:
          return num * 150L;
        case AccountType.Curator:
          return num * 300L;
        case AccountType.Level144:
          return num * 600L;
        case AccountType.Level250:
          return num * 1200L;
        case AccountType.Anorak:
          return num * 2400L;
        default:
          throw new Exception("Invalid AccountType: " + type.ToString());
      }
    }

    public static bool HasPatreonWorldAccess(AccountType type)
    {
      switch (type)
      {
        case AccountType.Normal:
        case AccountType.AgentSmith:
          return false;
        case AccountType.BladeRunner:
        case AccountType.Gunter:
        case AccountType.Neuromancer:
        case AccountType.Architect:
        case AccountType.Curator:
        case AccountType.Level144:
        case AccountType.Level250:
        case AccountType.Anorak:
          return true;
        default:
          throw new Exception("Invalid AccountType: " + type.ToString());
      }
    }
  }
}
