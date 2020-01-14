// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.CloudResult`1
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 6223B97A-06A5-46CB-9E10-78604961D6EE
// Assembly location: J:\D\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using System.Net;

namespace CloudX.Shared
{
  public class CloudResult<T> : CloudResult
  {
    public T Entity { get; private set; }

    public CloudResult(T result, HttpStatusCode state, string content = null)
      : base(state, content)
    {
      this.Entity = result;
    }

    public CloudResult<E> AsResult<E>() where E : class
    {
      return new CloudResult<E>((object) this.Entity as E, this.State, this.Content);
    }

    public override string ToString()
    {
      return string.Format("CloudResult<{0}> - State: {1}, Content: {2}", (object) typeof (T), (object) this.State, (object) this.Content);
    }
  }
}
