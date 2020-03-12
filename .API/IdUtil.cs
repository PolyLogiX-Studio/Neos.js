// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.IdUtil
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using System;
using System.Text;

namespace CloudX.Shared
{
  public static class IdUtil
  {
    public const int MAX_NAME_LENGTH = 20;

    public static OwnerType GetOwnerType(string id)
    {
      if (id == null)
        return OwnerType.INVALID;
      if (id.StartsWith("M-"))
        return OwnerType.Machine;
      if (id.StartsWith("U-"))
        return OwnerType.User;
      return id.StartsWith("G-") ? OwnerType.Group : OwnerType.INVALID;
    }

    public static string GenerateId(OwnerType ownerType, string name = null, int randomAppend = 0)
    {
      name = name != null ? name.RemoveDiacritics().RemoveNonASCII() : (string) null;
      StringBuilder stringBuilder = new StringBuilder();
      if (name != null)
      {
        foreach (char c in name)
        {
          if (char.IsLetterOrDigit(c))
            stringBuilder.Append(c);
          if (char.IsWhiteSpace(c) || c == '_')
            stringBuilder.Append("-");
          if (stringBuilder.Length == 20)
            break;
        }
      }
      if (stringBuilder.Length == 0 || randomAppend > 0)
      {
        if (stringBuilder.Length > 0)
          stringBuilder.Append("-");
        string str = Guid.NewGuid().ToString();
        if (randomAppend > 0)
          str = str.Substring(0, randomAppend);
        stringBuilder.Append(str);
      }
      switch (ownerType)
      {
        case OwnerType.Machine:
          stringBuilder.Insert(0, "M-");
          break;
        case OwnerType.User:
          stringBuilder.Insert(0, "U-");
          break;
        case OwnerType.Group:
          stringBuilder.Insert(0, "G-");
          break;
        default:
          throw new Exception("Invalid owner type");
      }
      return stringBuilder.ToString();
    }
  }
}
