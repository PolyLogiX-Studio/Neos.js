// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.AssetUtil
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;
using System.IO;
using System.Security.Cryptography;

namespace CloudX.Shared
{
  public static class AssetUtil
  {
    public static int COMPUTE_VERSION
    {
      get
      {
        return 4;
      }
    }

    public static string GenerateHashSignature(string file)
    {
      using (FileStream fileStream = File.OpenRead(file))
        return AssetUtil.GenerateHashSignature((Stream) fileStream);
    }

    public static string GenerateHashSignature(Stream fileStream)
    {
      using (SHA256 shA256 = SHA256.Create())
        return BitConverter.ToString(shA256.ComputeHash(fileStream)).Replace("-", "").ToLower();
    }

    public static Uri GenerateURL(string signature, string extension)
    {
      if (!string.IsNullOrEmpty(extension) && extension[0] != '.')
        extension = "." + extension;
      return new Uri("neosdb:///" + signature + extension);
    }

    public static string ExtractSignature(Uri uri)
    {
      string extension;
      return AssetUtil.ExtractSignature(uri, out extension);
    }

    public static string ExtractSignature(Uri uri, out string extension)
    {
      if (uri.Scheme != "neosdb")
        throw new ArgumentException("Not a NeosDB URI");
      string segment = uri.Segments[1];
      extension = Path.GetExtension(segment);
      return Path.GetFileNameWithoutExtension(segment);
    }

    public static string ComposeIdentifier(string signature, string variant)
    {
      if (string.IsNullOrWhiteSpace(variant))
        return signature;
      return signature + "&" + variant;
    }

    public static void SplitIdentifier(string identifier, out string signature, out string variant)
    {
      int length = identifier.IndexOf('&');
      if (length >= 0)
      {
        variant = identifier.Substring(length + 1);
        signature = identifier.Substring(0, length);
      }
      else
      {
        variant = (string) null;
        signature = identifier;
      }
      signature = signature.ToLower();
    }
  }
}
