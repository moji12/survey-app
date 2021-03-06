import { isEmpty } from 'lodash';

/**
 * The App Error class
 */
class AppError extends Error {
	/**
	 * @param {String} message The error message
	 * @param {Number} code The task-status code of the error
	 * @param {Object} messages The optional error messages
	 */
	constructor(message, code, messages = null) {
		super(message);
		this._code = code;
		if (messages) {
			this._messages = messages;
		}
	}
	
	/**
	 * @return {Number}
	 */
	get code() {
		return this._code;
	}
	
	/**
	 * @return {String}
	 */
	get message() {
		return this._message;
	}
	
	/**
	 * @return {Array}
	 */
	get messages() {
		return this._messages;
	}
	
	/**
	 * This will format joi error to api accepted error
	 *  @param {Object} validate
	 *  @return {Object} errors
	 */
	static async formatInputError(validate) {
		const data = {};
		if (validate.error) {
			validate.error.details.forEach(err => {
				if (data[err.context.key]) {
					data[err.context.key].push({
						message: err.message,
						type: err.type
					});
				} else {
					data[err.context.key] = [{
						message: err.message,
						type: err.type
					}];
				}
			});
		}
		return {
			errors: (validate.error) ? await data : null,
			passed: isEmpty(validate.error),
			value: validate.value
		};
	}
	
	/**
	 * @return {Object} The instance of AppError
	 */
	format() {
		const obj = { code: this._code || 500, message: this.message };
		if (this._messages) {
			obj.messages = this._messages.errors || this._messages;
		}
		if (this._type > 0) {
			obj.type = this._type;
		}
		return obj;
	}
}

export default AppError;
