const { Enumerable } = require("./Enumerable")
/**Enumerable for Variable State
 *
 * @readonly
 * @enum {Enumerable<string>} CloudVariableState
 * @property {"Uninitialized"} Uninitialized
 * @property {"ReadFromTheCloud"} ReadFromTheCloud
 * @property {"ChangedLocally"} ChangedLocally
 * @property {"WrittenToCloud"} WrittenToCloud
 * @property {"Invalid"} Invalid
 * @property {"Unregistered"} Unregistered
 */
const CloudVariableState = new Enumerable({
  Uninitialized:"Uninitialized",
    ReadFromTheCloud:"ReadFromTheCloud",
    ChangedLocally:"ChangedLocally",
    WrittenToCloud:"WrittenToCloud",
    Invalid:"Invalid",
    Unregistered:"Unregistered",
})
module.exports = {CloudVariableState}