// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CreditTransaction
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class CreditTransaction
  {
    [JsonProperty(PropertyName = "token")]
    [JsonPropertyName("token")]
    public string Token { get; set; }

    [JsonProperty(PropertyName = "fromUserId")]
    [JsonPropertyName("fromUserId")]
    public string FromUserId { get; set; }

    [JsonProperty(PropertyName = "toUserId")]
    [JsonPropertyName("toUserId")]
    public string ToUserId { get; set; }

    [JsonProperty(PropertyName = "amount")]
    [JsonPropertyName("amount")]
    public Decimal Amount { get; set; }

    [JsonProperty(PropertyName = "comment")]
    [JsonPropertyName("comment")]
    public string Comment { get; set; }

    [JsonProperty(PropertyName = "transactionType")]
    [JsonPropertyName("transactionType")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public TransactionType TransactionType { get; set; }

    [JsonProperty(PropertyName = "anonymous")]
    [JsonPropertyName("anonymous")]
    public bool Anonymous { get; set; }
  }
}
