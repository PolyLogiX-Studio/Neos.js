const { OwnerType } = require("./OwnerType");
const { List } = require("./List");
const { Type } = require("./Type");
class SearchParameters {
	constructor($b) {
		if (!$b) $b = {};
		/** @type Number */
		this.Count = $b.count || 100;
		/** @type Number */
		this.Offset = $b.offset;
		/** @type Boolean */
		this.Private = $b.private;
		/** @type string */
		this.ByOwner = $b.byOwner;
		/** @type OwnerType */
		this.OwnerType = $b.ownerType || OwnerType.User;
		/** @type string */
		this.SubmittedTo = $b.submittedTo;
		/** @type boolean */
		this.OnlyFeatured = $b.onlyFeatured;
		/** @type string */
		this.RecordType = $b.recordType;
		/** @type List<string> */
		this.RequiredTags = List.ToList($b.requiredTags);
		/** @type List<string> */
		this.OptionalTags = List.ToList($b.optionalTags);
		/** @type List<string> */
		this.ExcludedTags = List.ToList($b.excludedTags);
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
				value: new Boolean(),
			},
		});
	}
	get IsValid() {
		return this.Offset >= 0 && this.Count > 0;
	}
	Normalize() {
		if (this._isNormalized) return;
		this.OptionalTags = this.NormalizeTags(this.OptionalTags);
		this.RequiredTags = this.NormalizeTags(this.RequiredTags);
		this.ExcludedTags = this.NormalizeTags(this.ExcludedTags);
		if (this.ExtraSignatures != null) {
			this.ExtraSignatures.Sort();
			if (this.ExtraSignatures.Count == 0) this.ExtraSignatures = new List();
		}
		this._isNormalized = true;
	}
	Equals(other, excludeOffsetAndCount = false) {
		if (Type.Get(other) != "SearchParameters")
			other = new SearchParameters(other);

		if (
			(!excludeOffsetAndCount &&
        (this.Count != other.Count || this.Offset != other.Offset)) ||
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
			(((nullable1 != null) == nullable2) != null
				? nullable1 != null
					? nullable1 != nullable2
						? 1
						: 0
					: 0
				: 1) != 0
		)
			return false;
		nullable2 = this.MaxDate;
		nullable1 = other.MaxDate;
		if (
			(((nullable2 != null) == nullable1) != null
				? nullable2 != null
					? nullable2 != nullable1
						? 1
						: 0
					: 0
				: 1) != 0 ||
      this.SortBy != other.SortBy ||
      this.OnlyFeatured != other.OnlyFeatured ||
      this.SortDirection != other.SortDirection
		)
			return false;
		this.Normalize();
		other.Normalize();
		return (
			SearchParameters.ListsEqual(this.OptionalTags, other.OptionalTags) &&
      SearchParameters.ListsEqual(this.RequiredTags, other.RequiredTags) &&
      SearchParameters.ListsEqual(this.ExcludedTags, other.ExcludedTags) &&
      SearchParameters.ListsEqual(this.ExtraSignatures, other.ExtraSignatures)
		);
	}
	static ListsEqual(a, b) {
		let num1 = a != null ? a.Count : 0;
		let num2 = b != null ? b.Count : 0;
		if (num1 != num2) return false;
		for (let index = 0; index < num1; index++) {
			if (a[index] != b[index]) return false;
		}
		return true;
	}
	GetHashCode() {
		///TODO later
		return false;
	}
}
module.exports = {
	SearchParameters,
};
