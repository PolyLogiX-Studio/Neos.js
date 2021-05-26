import { OwnerType } from "./OwnerType";
import type { SearchSortParameter } from "./SearchSortParameter";
import type { SearchSortDirection } from "./SearchSortDirection";
import { List } from "@bombitmanbomb/utils";
import { hashCode } from "./HashCode";
export class SearchParameters {
	private _isNormalized = false;
	public Count: number;
	public Offset: number;
	public Private: boolean;
	public ByOwner: string;
	public OwnerType: OwnerType;
	public SubmittedTo: string;
	public OnlyFeatured: boolean;
	public RecordType: string;
	public RequiredTags: List<string>;
	public OptionalTags: List<string>;
	public ExcludedTags: List<string>;
	public MinDate?: Date;
	public MaxDate?: Date;
	public SortBy: SearchSortParameter;
	public SortDirection: SearchSortDirection;
	public ExtraSignatures!: List<string>;
	constructor($b: SearchParametersJSON) {
		this.Count = $b.count ?? 100;
		this.Offset = $b.offset;
		this.Private = $b.private;
		this.ByOwner = $b.byOwner;
		this.OwnerType = $b.ownerType;
		this.SubmittedTo = $b.submittedTo;
		this.OnlyFeatured = $b.onlyFeatured;
		this.RecordType = $b.recordType;
		this.RequiredTags =
			$b.requiredTags instanceof List
				? $b.requiredTags
				: List.ToList($b.requiredTags);
		this.OptionalTags =
			$b.optionalTags instanceof List
				? $b.optionalTags
				: List.ToList($b.optionalTags);
		this.ExcludedTags =
			$b.excludedTags instanceof List
				? $b.excludedTags
				: List.ToList($b.excludedTags);
		this.MinDate = $b.minDate;
		this.MaxDate = $b.maxDate;
		this.SortBy = $b.sortBy;
		this.SortDirection = $b.sortDirection;
	}
	public get IsValid(): boolean {
		return this.Offset >= 0 && this.Count > 0;
	}
	public Normalize(): void {
		if (this._isNormalized) return;
		this.OptionalTags = this.NormalizeTags(this.OptionalTags);
		this.RequiredTags = this.NormalizeTags(this.RequiredTags);
		this.ExcludedTags = this.NormalizeTags(this.ExcludedTags);
		if (this.ExtraSignatures != null) {
			this.ExtraSignatures.sort();
			if (this.ExtraSignatures.Count == 0)
				this.ExtraSignatures = (null as unknown) as List<string>;
		}
		this._isNormalized = true;
	}
	private NormalizeTags(tags: List<string>): List<string> {
		if (tags != null) {
			tags.sort();
			if (tags.Count == 0) return (null as unknown) as List<string>;
		}
		return tags;
	}
	public Equals(
		other: SearchParameters,
		excludeOffsetAndCount = false
	): boolean {
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
		let nullable1 = this.MinDate as Date;
		let nullable2 = other.MinDate as Date;
		if (
			((nullable1 != null) == (nullable2 != null)
				? nullable1 != null
					? nullable1?.getTime() != nullable2?.getTime()
						? 1
						: 0
					: 0
				: 1) != 0
		)
			return false;
		nullable2 = this.MaxDate as Date;
		nullable1 = other.MaxDate as Date;
		if (
			((nullable2 != null) == (nullable1 != null)
				? nullable2 != null
					? nullable2?.getTime() != nullable1?.getTime()
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
	public static ListsEqual(a: List<string>, b: List<string>): boolean {
		const num1 = a != null ? a.Count : 0;
		const num2 = b != null ? b.Count : 0;
		if (num1 != num2) return false;
		for (let index = 0; index < num1; index++) {
			if (a[index] != b[index]) return false;
		}
		return true;
	}
	public static Equals(a: SearchParameters, b: SearchParameters): boolean {
		if (a == null && b == null) return true;
		return a != null && b != null && a.Equals(b);
	}
	public GetHashCode(): number {
		this.Normalize();
		let num =
			(((((((((((-1854586267 * -1521134295 + this.Count) * -1521134295 +
				this.Offset) *
				-1521134295 +
				+this.Private) *
				-1521134295 +
				hashCode(this.ByOwner)) *
				-1521134295 +
				hashCode(this.OwnerType)) *
				-1521134295 +
				hashCode(this.SubmittedTo)) *
				-1521134295 +
				+this.OnlyFeatured) *
				-1521134295 +
				hashCode(this.RecordType)) *
				-1521134295 +
				+(this.MinDate as Date)) *
				-1521134295 +
				+(this.MaxDate as Date)) *
				-1521134295 +
				hashCode(this.SortBy)) *
				-1521134295 +
			hashCode(this.SortDirection);
		if (this.OptionalTags != null) {
			for (const optionalTag in this.OptionalTags)
				num = num * -1521134295 + hashCode(optionalTag);
		}
		if (this.RequiredTags != null) {
			for (const requiredTag in this.RequiredTags)
				num = num * -1521134295 + hashCode(requiredTag);
		}
		if (this.ExcludedTags != null) {
			for (const excludedTag in this.ExcludedTags)
				num = num * -1521134295 + hashCode(excludedTag);
		}
		if (this.ExtraSignatures != null) {
			for (const extraSignature in this.ExtraSignatures)
				num = num * -1521134295 + hashCode(extraSignature);
		}
		return num;
	}
}
export interface SearchParametersJSON {
	count: number;
	offset: number;
	private: boolean;
	byOwner: string;
	ownerType: OwnerType;
	submittedTo: string;
	onlyFeatured: boolean;
	recordType: string;
	requiredTags: string[];
	optionalTags: string[];
	excludedTags: string[];
	minDate?: Date;
	maxDate?: Date;
	sortBy: SearchSortParameter;
	sortDirection: SearchSortDirection;
}
