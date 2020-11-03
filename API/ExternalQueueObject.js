class ExternalQueueObject {
	/**
     *Creates an instance of ExternalQueueObject.
     @template T
     * @param {{
     * id: string,
     * popReceipt: string,
     * object: T
     * }} $b
     * @memberof ExternalQueueObject
     */
	constructor($b) {
		if (!$b) $b = {};
		this.Id = $b.id;
		this.PopReceipt = $b.popReceipt;
		this.Object = $b.object;
	}
}
module.exports = {
	ExternalQueueObject,
};
