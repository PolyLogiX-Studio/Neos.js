const { StringBuilder } = require('./StringBuilder');
const { Char } = require('./Char');
class SearchQueryParser {
  static Parse(search = '', optionalTags, requiredTags, excludedTags) {
    search = search.trim();
    if (search == '') return;
    var flag = false;
    var stringBuilder = new StringBuilder();
    for (let index = 0; index < search.length; index++) {
      let num = index == search.length ? 1 : 0;
      let c = num != 0 ? ' ' : search[index];
      if (num != 0 || (Char.IsWhiteSpace(c) && !flag) || (c == '"') & flag) {
        if (stringBuilder.Length > 0) {
          if (stringBuilder.String[0] == '+') {
            stringBuilder.Remove(0, 1);
            if (stringBuilder.Length > 0)
              requiredTags.Add(stringBuilder.ToString());
          } else if (stringBuilder.String[0] == '-') {
            stringBuilder.Remove(0, 1);
            if (stringBuilder.Length > 0)
              excludedTags.Add(stringBuilder.ToString());
          } else optionalTags.Add(stringBuilder.ToString());
        }
        stringBuilder.Clear();
        flag = false;
      } else if (c == '"') flag = true;
      else stringBuilder.Append(c);
    }
  }
}
module.exports = {
  SearchQueryParser,
};
