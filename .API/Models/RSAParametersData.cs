// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.RSAParametersData
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  public class RSAParametersData
  {
    [JsonProperty(PropertyName = "Exponent")]
    [JsonPropertyName("Exponent")]
    public byte[] Exponent { get; set; }

    [JsonProperty(PropertyName = "Modulus")]
    [JsonPropertyName("Modulus")]
    public byte[] Modulus { get; set; }

    [JsonProperty(PropertyName = "P")]
    [JsonPropertyName("P")]
    public byte[] P { get; set; }

    [JsonProperty(PropertyName = "Q")]
    [JsonPropertyName("Q")]
    public byte[] Q { get; set; }

    [JsonProperty(PropertyName = "DP")]
    [JsonPropertyName("DP")]
    public byte[] DP { get; set; }

    [JsonProperty(PropertyName = "DQ")]
    [JsonPropertyName("DQ")]
    public byte[] DQ { get; set; }

    [JsonProperty(PropertyName = "InverseQ")]
    [JsonPropertyName("InverseQ")]
    public byte[] InverseQ { get; set; }

    [JsonProperty(PropertyName = "D")]
    [JsonPropertyName("D")]
    public byte[] D { get; set; }

    public static implicit operator RSAParametersData(RSAParameters rsa)
    {
      RSAParametersData rsaParametersData = new RSAParametersData()
      {
        Exponent = rsa.Exponent,
        Modulus = rsa.Modulus,
        P = rsa.P,
        Q = rsa.Q,
        DP = rsa.DP,
        DQ = rsa.DQ,
        InverseQ = rsa.InverseQ
      };
      rsaParametersData.D = rsaParametersData.D;
      return rsaParametersData;
    }

    public static implicit operator RSAParameters(RSAParametersData data)
    {
      return new RSAParameters()
      {
        Exponent = data.Exponent,
        Modulus = data.Modulus,
        P = data.P,
        Q = data.Q,
        DP = data.DP,
        DQ = data.DQ,
        InverseQ = data.InverseQ,
        D = data.D
      };
    }
  }
}
