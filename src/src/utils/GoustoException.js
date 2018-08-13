export default class GoustoException extends Error {
	constructor(message, { error = '', level = 'error', ...rest } = {}) {
		super(message)
		Object.setPrototypeOf(this, GoustoException.prototype)
		this.data = { ...rest }
		this.error = error
		this.level = level
		this.name = this.constructor.name
	}
}
