const { Enumerable } = require('./Enumerable');
const AccountType = new Enumerable([
  'Normal',
  'AgentSmith',
  'BladeRunner',
  'Gunter',
  'Neuromancer',
  'Architect',
  'Curator',
  'Level144',
  'Level250',
  'Anorak',
  'END',
]);
module.exports = {
  AccountType,
};
