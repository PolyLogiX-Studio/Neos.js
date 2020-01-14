// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.Message
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
  public class Message
  {
    public static string GenerateId()
    {
      return "MSG-" + Guid.NewGuid().ToString();
    }

    [JsonProperty(PropertyName = "id")]
    [JsonPropertyName("id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "ownerId")]
    [JsonPropertyName("ownerId")]
    public string OwnerId { get; set; }

    [JsonProperty(PropertyName = "recipientId")]
    [JsonPropertyName("recipientId")]
    public string RecipientId { get; set; }

    [JsonProperty(PropertyName = "senderId")]
    [JsonPropertyName("senderId")]
    public string SenderId { get; set; }

    [JsonProperty(PropertyName = "messageType")]
    [JsonPropertyName("messageType")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public MessageType MessageType { get; set; }

    [JsonProperty(PropertyName = "content")]
    [JsonPropertyName("content")]
    public string Content { get; set; }

    public T ExtractContent<T>()
    {
      return JsonConvert.DeserializeObject<T>(this.Content);
    }

    public void SetContent<T>(T obj)
    {
      this.Content = JsonConvert.SerializeObject((object) obj);
    }

    [JsonProperty(PropertyName = "sendTime")]
    [JsonPropertyName("sendTime")]
    public DateTime SendTime { get; set; }

    [JsonProperty(PropertyName = "lastUpdateTime")]
    [JsonPropertyName("lastUpdateTime")]
    public DateTime LastUpdateTime { get; set; }

    [JsonProperty(PropertyName = "readTime")]
    [JsonPropertyName("readTime")]
    public DateTime? ReadTime { get; set; }

    [JsonIgnore]
    public bool IsSent
    {
      get
      {
        return this.SenderId == this.OwnerId;
      }
    }

    [JsonIgnore]
    public bool IsReceived
    {
      get
      {
        return this.RecipientId == this.OwnerId;
      }
    }

    [JsonIgnore]
    public bool IsRead
    {
      get
      {
        return this.ReadTime.HasValue;
      }
    }
  }
}
