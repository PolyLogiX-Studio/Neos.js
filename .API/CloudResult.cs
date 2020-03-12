// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudResult
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using System.Net;

namespace CloudX.Shared
{
  public class CloudResult
  {
    public HttpStatusCode State { get; private set; }

    public string Content { get; protected set; }

    public CloudResult(HttpStatusCode state, string content)
    {
      this.State = state;
      this.Content = content;
      if (!this.IsError)
        return;
      if (content == null)
        return;
      try
      {
        this.Content = JsonConvert.DeserializeObject<CloudMessage>(content)?.Message;
      }
      catch
      {
        this.Content = content;
      }
    }

    public bool IsOK
    {
      get
      {
        if (this.State != HttpStatusCode.OK)
          return this.State == HttpStatusCode.NoContent;
        return true;
      }
    }

    public bool IsError
    {
      get
      {
        return !this.IsOK;
      }
    }

    public override string ToString()
    {
      return string.Format("CloudResult - State: {0}, Content: {1}", (object) this.State, (object) this.Content);
    }
  }
}
