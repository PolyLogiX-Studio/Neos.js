const {
  OwnerType
} = require("./OwnerType")
class SearchParameters {
  constructor($b) {
    if (!$b) $b = {};
    /** @type Boolean */
    this.Private = $b.private;
    /** @type string */
    this.ByOwner = $b.byOwner;
    /** @type OwnerType */
    this.OwnerType = $b.ownerType ?? OwnerType.User;
    /** @type string */
    this.SubmittedTo = $b.submittedTo;
    /** @type boolean */
    this.OnlyFeatured = $b.onlyFeatured;
    /** @type string */
    this.RecordType = $b.recordType;
    /** @type List<string> */
    this.RequiredTags = $b.requiredTags;
    /** @type Date */
    this.MinDate = $b.minDate;
    /** @type Date */
    this.MaxDate = $b.maxDate;
    /** @type SearchSortParameter */
    this.SortBy = $b.sortBy;
    /** @type SearchSortDirection */
    this.SortDirection = $b.sortDirection;
    /** @type List<string> */
    this.ExtraSignatures = new List();
    Object.defineProperties(this, {
      _isNormalized: {
        value: new Boolean()
      }
    });
  }
  Normalize() {
    if (this._isNormalized) return;
    if (this.RequiredTags != null) {
      this.RequiredTags.Sort();
      if (this.RequiredTags.Count == 0) this.RequiredTags = null;
    }
    if (this.ExtraSignatures != null) {
      this.ExtraSignatures.Sort();
      if (this.ExtraSignatures.Count == 0) this.ExtraSignatures = null;
    }
    Object.defineProperties(this, {
      _isNormalized: {
        value: true
      }
    });
  }
  /**
   *
   *
   * @param {SearchParameters} other
   * @memberof SearchParameters
   */
  Equals(other) {
    if (
      this.Private != other.Private ||
      this.ByOwner != other.ByOwner ||
      this.OwnerType != other.OwnerType ||
      this.SubmittedTo != other.SubmittedTo ||
      this.RecordType != other.RecordType
    )
      return false;
    let nullable1 = this.MinDate;
    let nullable2 = other.MinDate;
    if (
      (((nullable1 != null) == nullable2) != null ?
        nullable1 != null ?
        nullable1 != nullable2 ?
        1 :
        0 :
        0 :
        1) != 0
    )
      return false;
    nullable1 = this.MaxDate;
    nullable2 = other.MaxDate;
    if (
      (((nullable1 != null) == nullable2) != null ?
        nullable1 != null ?
        nullable1 != nullable2 ?
        1 :
        0 :
        0 :
        1) != 0 ||
      this.SortBy != other.SortBy ||
      this.OnlyFeatured != other.OnlyFeatured ||
      this.SortDirection != other.SortDirection
    )
      return false;
    this.Normalize();
    other.Normalize();
    return (
      SearchParameters.ListEqual(this.RequiredTags, other.RequiredTags) &&
      SearchParameters.ListEqual(this.ExtraSignatures, other.ExtraSignatures)
    );
  }
  /**
   *
   *
   * @static
   * @param {List<string>} a
   * @param {List<String>} b
   * @memberof SearchParameters
   */
  static ListEqual(a, b) {
    //Explicit Non-Virtual Call
    let num1 = a != null ? a.Count : 0;
    let num2 = b != null ? b.Count : 0;
    if (num1 != num2) return false;
    for (let index = 0; index < num1; index++) {
      if (a[index] != b[index]) return false;
    }
    return true;
  }
}
module.exports = {
  SearchParameters
}