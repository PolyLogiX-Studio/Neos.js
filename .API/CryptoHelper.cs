// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CryptoHelper
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace CloudX.Shared
{
  public static class CryptoHelper
  {
    public static readonly RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
    public static readonly SHA256Managed sha256 = new SHA256Managed();

    public static byte[] GenerateCryptoBlob(int length)
    {
      byte[] data = new byte[length];
      CryptoHelper.rng.GetBytes(data);
      return data;
    }

    public static string GenerateCryptoToken()
    {
      return BitConverter.ToString(CryptoHelper.GenerateCryptoBlob(16)).Replace("-", "").ToLower();
    }

    public static string GenerateSalt()
    {
      return Convert.ToBase64String(CryptoHelper.GenerateCryptoBlob(32));
    }

    public static string HashPassword(string password, string salt)
    {
      byte[] bytes = Encoding.UTF8.GetBytes(password);
      byte[] numArray = Convert.FromBase64String(salt);
      byte[] buffer = new byte[bytes.Length + numArray.Length];
      for (int index = 0; index < bytes.Length; ++index)
        buffer[index] = bytes[index];
      for (int index = 0; index < numArray.Length; ++index)
        buffer[index + bytes.Length] = numArray[index];
      return Convert.ToBase64String(CryptoHelper.sha256.ComputeHash(buffer));
    }

    public static string PasswordRuleDescription
    {
      get
      {
        return "Minimum 8 characters, 1 capital letter and 1 digit.";
      }
    }

    public static bool IsValidPassword(string password)
    {
      return password != null && password.Length >= 8 && password.Count<char>((Func<char, bool>) (c => char.IsDigit(c))) != 0 && (password.Count<char>((Func<char, bool>) (c => char.IsLetter(c))) != 0 && password.Count<char>((Func<char, bool>) (c => char.IsLower(c))) != 0) && password.Count<char>((Func<char, bool>) (c => char.IsUpper(c))) != 0;
    }

    public static string PasswordRequirements
    {
      get
      {
        return "Must have at least 8 symbols, 1 digit and 1 uppercase letter";
      }
    }
  }
}
