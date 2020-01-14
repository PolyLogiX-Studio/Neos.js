// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.TransactionMessage
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class TransactionMessage
  {
    [JsonProperty("token")]
    [JsonPropertyName("token")]
    public string Token { get; set; }

    [JsonProperty("recipientId")]
    [JsonPropertyName("recipientId")]
    public string RecipientId { get; set; }

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
  }
}
