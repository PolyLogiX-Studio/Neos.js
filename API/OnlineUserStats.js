class OnlineUserStats {
	constructor($b) {
		this.CaptureTimestamp = $b.captureTimestamp;
		this.RegisteredUserCount = $b.registeredUserCount;
		this.VRUserCount = $b.vrUserCount;
		this.ScreenUserCount = $b.screenUserCount;
		this.MobileUserCount = $b.mobileUserCount;
		this.HeadlessUserCount = $b.headlessUserCount;
		this.PublicSessionCount = $b.publicSessionCount;
		this.ActivePublicSessionCount = $b.activePublicSessionCount;
		this.PublicWorldUserCount = $b.publicWorldUserCount;
	}
}
module.exports = { OnlineUserStats };
