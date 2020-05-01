
class NeosSession {
  constructor($b) {
    if (!$b) $b = {};
    this.ReverseTimestamp = $b.reverseTimestamp || new String();
    this.SessionId = $b.sessionId || new String();
    this.NeosVersion = $b.neosVersion || new String();
    this.UserId = $b.userId || new String();
    this.MachineId = $b.machineId || new String();
    this.CountryCode = $b.countryCode || new String();
    this.SystemLocale = $b.systemLocale || new String();
    this.ClientIp = $b.clientIp || new String();
    this.SessionStart = $b.sessionStart || new Date();
    this.SessionEnd = $b.sessionEnd || new Date();
    this.VisitedWorlds = $b.visitedWorlds || new Number();
    this.CreatedWorlds = $b.createdWorlds || new Number();
    this.OperatingSystem = $b.operatingSystem || new String();
    this.HeadDevice = $b.headDevice || new String();
    this.HeadDeviceModel = $b.headDeviceModel || new String();
    this.CPU = $b.cpu || new String();
    this.GPU = $b.gpu || new String();
    this.MemoryBytes = $b.memoryBytes || new Number();
    this.Peripherals = $b.peripherals || new String();
  }
}
module.exports = {NeosSession}