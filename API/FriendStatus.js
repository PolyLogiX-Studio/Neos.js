const { Enumerable } = require('./Enumerable');
const FriendStatus = new Enumerable([
  'None',
  'SearchResult',
  'Requested',
  'Ignored',
  'Blocked',
  'Accepted',
]);
module.exports = {
  FriendStatus,
};
