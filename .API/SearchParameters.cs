// Decompiled with JetBrains decompiler
// Type: CloudX.Shared.SearchParameters
// Assembly: CloudX.Shared, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 2635624C-5F24-4EFB-ACD1-7E9C1349B2F5
// Assembly location: F:\SteamLibrary\steamapps\common\NeosVR\HeadlessClient\CloudX.Shared.dll

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CloudX.Shared
{
  [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
  public class SearchParameters : IEquatable<SearchParameters>
  {
    private bool _isNormalized;

    [JsonProperty(PropertyName = "private")]
    [JsonPropertyName("private")]
    public bool Private { get; set; }

    [JsonProperty(PropertyName = "byOwner")]
    [JsonPropertyName("byOwner")]
    public string ByOwner { get; set; }

    [JsonProperty(PropertyName = "ownerType")]
    [JsonPropertyName("ownerType")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public OwnerType OwnerType { get; set; } = OwnerType.User;

    [JsonProperty(PropertyName = "submittedTo")]
    [JsonPropertyName("submittedTo")]
    public string SubmittedTo { get; set; }

    [JsonProperty(PropertyName = "onlyFeatured")]
    [JsonPropertyName("onlyFeatured")]
    public bool OnlyFeatured { get; set; }

    [JsonProperty(PropertyName = "recordType")]
    [JsonPropertyName("recordType")]
    public string RecordType { get; set; }

    [JsonProperty(PropertyName = "requiredTags")]
    [JsonPropertyName("requiredTags")]
    public List<string> RequiredTags { get; set; }

    [JsonProperty(PropertyName = "minDate")]
    [JsonPropertyName("minDate")]
    public DateTime? MinDate { get; set; }

    [JsonProperty(PropertyName = "maxDate")]
    [JsonPropertyName("maxDate")]
    public DateTime? MaxDate { get; set; }

    [JsonProperty(PropertyName = "sortBy")]
    [JsonPropertyName("sortBy")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public SearchSortParameter SortBy { get; set; }

    [JsonProperty(PropertyName = "sortDirection")]
    [JsonPropertyName("sortDirection")]
    [Newtonsoft.Json.JsonConverter(typeof (StringEnumConverter))]
    [System.Text.Json.Serialization.JsonConverter(typeof (JsonStringEnumConverter))]
    public SearchSortDirection SortDirection { get; set; }

    [JsonIgnore]
    [JsonIgnore]
    public List<string> ExtraSignatures { get; set; }

    public void Normalize()
    {
      if (this._isNormalized)
        return;
      if (this.RequiredTags != null)
      {
        this.RequiredTags.Sort();
        if (this.RequiredTags.Count == 0)
          this.RequiredTags = (List<string>) null;
      }
      if (this.ExtraSignatures != null)
      {
        this.ExtraSignatures.Sort();
        if (this.ExtraSignatures.Count == 0)
          this.ExtraSignatures = (List<string>) null;
      }
      this._isNormalized = true;
    }

    public bool Equals(SearchParameters other)
    {
      if (this.Private != other.Private || this.ByOwner != other.ByOwner || (this.OwnerType != other.OwnerType || this.SubmittedTo != other.SubmittedTo) || this.RecordType != other.RecordType)
        return false;
      DateTime? nullable1 = this.MinDate;
      DateTime? nullable2 = other.MinDate;
      if ((nullable1.HasValue == nullable2.HasValue ? (nullable1.HasValue ? (nullable1.GetValueOrDefault() != nullable2.GetValueOrDefault() ? 1 : 0) : 0) : 1) != 0)
        return false;
      nullable2 = this.MaxDate;
      nullable1 = other.MaxDate;
      if ((nullable2.HasValue == nullable1.HasValue ? (nullable2.HasValue ? (nullable2.GetValueOrDefault() != nullable1.GetValueOrDefault() ? 1 : 0) : 0) : 1) != 0 || this.SortBy != other.SortBy || (this.OnlyFeatured != other.OnlyFeatured || this.SortDirection != other.SortDirection))
        return false;
      this.Normalize();
      other.Normalize();
      return SearchParameters.ListsEqual(this.RequiredTags, other.RequiredTags) && SearchParameters.ListsEqual(this.ExtraSignatures, other.ExtraSignatures);
    }

    private static bool ListsEqual(List<string> a, List<string> b)
    {
      // ISSUE: explicit non-virtual call
      int num1 = a != null ? __nonvirtual (a.Count) : 0;
      // ISSUE: explicit non-virtual call
      int num2 = b != null ? __nonvirtual (b.Count) : 0;
      if (num1 != num2)
        return false;
      for (int index = 0; index < num1; ++index)
      {
        if (a[index] != b[index])
          return false;
      }
      return true;
    }

    public static bool operator ==(SearchParameters a, SearchParameters b)
    {
      if ((object) a == null && (object) b == null)
        return true;
      if ((object) a == null || (object) b == null)
        return false;
      return a.Equals(b);
    }

    public static bool operator !=(SearchParameters a, SearchParameters b)
    {
      return !(a == b);
    }

    public override int GetHashCode()
    {
      this.Normalize();
      int num = (((((((((-1854586267 * -1521134295 + EqualityComparer<bool>.Default.GetHashCode(this.Private)) * -1521134295 + EqualityComparer<string>.Default.GetHashCode(this.ByOwner)) * -1521134295 + EqualityComparer<OwnerType>.Default.GetHashCode(this.OwnerType)) * -1521134295 + EqualityComparer<string>.Default.GetHashCode(this.SubmittedTo)) * -1521134295 + EqualityComparer<bool>.Default.GetHashCode(this.OnlyFeatured)) * -1521134295 + EqualityComparer<string>.Default.GetHashCode(this.RecordType)) * -1521134295 + EqualityComparer<DateTime?>.Default.GetHashCode(this.MinDate)) * -1521134295 + EqualityComparer<DateTime?>.Default.GetHashCode(this.MaxDate)) * -1521134295 + this.SortBy.GetHashCode()) * -1521134295 + this.SortDirection.GetHashCode();
      if (this.RequiredTags != null)
      {
        foreach (string requiredTag in this.RequiredTags)
          num = num * -1521134295 + EqualityComparer<string>.Default.GetHashCode(requiredTag);
      }
      if (this.ExtraSignatures != null)
      {
        foreach (string extraSignature in this.ExtraSignatures)
          num = num * -1521134295 + EqualityComparer<string>.Default.GetHashCode(extraSignature);
      }
      return num;
    }

    public override bool Equals(object obj)
    {
      return this == obj as SearchParameters;
    }
  }
}
