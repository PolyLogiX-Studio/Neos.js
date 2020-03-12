// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.TransactionManager
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using BaseX;
using System;
using System.Threading.Tasks;

namespace CloudX.Shared
{
  public class TransactionManager
  {
    public CloudXInterface Cloud { get; private set; }

    public Decimal? NCRConversionRatio { get; private set; }

    public TransactionManager(CloudXInterface cloud)
    {
      this.Cloud = cloud;
      Task.Run((Func<Task>) (async () => await this.LoadConversionData()));
    }

    private async Task LoadConversionData()
    {
      CloudResult<Decimal> cloudResult = await this.Cloud.ReadGlobalVariable<Decimal>(TransactionUtil.NCR_CONVERSION_VARIABLE);
      if (cloudResult.IsOK)
        this.NCRConversionRatio = new Decimal?(cloudResult.Entity);
      else
        UniLog.Warning("Error getting conversion ratio. " + cloudResult.State.ToString() + "\n\n" + cloudResult.Content, false);
    }

    public Decimal? TryConvert(string sourceToken, Decimal sourceAmount, string targetToken)
    {
      if (sourceToken == "USD")
      {
        if (targetToken == null || !(targetToken == "NCR"))
          return new Decimal?();
        Decimal num = sourceAmount;
        Decimal? ncrConversionRatio = this.NCRConversionRatio;
        if (!ncrConversionRatio.HasValue)
          return new Decimal?();
        return new Decimal?(num / ncrConversionRatio.GetValueOrDefault());
      }
      if (!(targetToken == "USD"))
        return new Decimal?();
      if (sourceToken != null)
      {
        if (!(sourceToken == "NCR"))
        {
          if (sourceToken == "KFC")
            return new Decimal?(new Decimal());
        }
        else
        {
          Decimal num = sourceAmount;
          Decimal? ncrConversionRatio = this.NCRConversionRatio;
          if (!ncrConversionRatio.HasValue)
            return new Decimal?();
          return new Decimal?(num * ncrConversionRatio.GetValueOrDefault());
        }
      }
      return new Decimal?();
    }

    public bool IsValidToken(string token)
    {
      return token != null && (token == "NCR" || token == "KFC");
    }

    public Decimal? ToUSD(string token, Decimal amount)
    {
      if (token != null)
      {
        if (!(token == "NCR"))
        {
          if (token == "KFC")
            return new Decimal?(new Decimal());
        }
        else
        {
          if (!this.NCRConversionRatio.HasValue)
            return new Decimal?();
          return new Decimal?(this.NCRConversionRatio.Value * amount);
        }
      }
      throw new Exception("Invalid token: " + token);
    }

    public static string FormatCurrency(Decimal? amount)
    {
      if (!amount.HasValue)
        return "N/A";
      return amount.Value.ToString("#,0.00####################");
    }
  }
}
