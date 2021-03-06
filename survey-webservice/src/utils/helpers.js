import crypto from 'crypto';
import sgMail from '@sendgrid/mail/index';
import config from 'config';
import mongoose from 'mongoose';

/**
 * @param {Number} size Hour count
 * @return {Date} The date
 */
export const addHourToDate = (size) => {
	const date = new Date();
	let hours = date.getHours() + 1;
	date.setHours(hours);
	return date;
};

/**
 * @param {Number} size Code length
 * @param {Boolean} alpha Check if it's alpha numeral
 * @return {String} The code
 */
export const generateOTCode = (size = 6, alpha = false) => {
	let characters = alpha ? '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz' : '0123456789';
	characters = characters.split('');
	let selections = '';
	for (let i = 0; i < size; i++) {
		let index = Math.floor(Math.random() * characters.length);
		selections += characters[index];
		characters.splice(index, 1);
	}
	return selections;
};
/**
 * Convert callback to promise;
 *  @param {String} string
 * @return {String} params date
 */
export const encrypt = (string) => {
	if (string === null || typeof string === 'undefined') {
		return string;
	}
	let key = config.get('auth.encryption_key');
	let cipher = crypto.createCipher('aes-256-cbc', key);
	return cipher.update(string, 'utf8', 'hex') + cipher.final('hex');
};

/**
 * Convert callback to promise;
 *  @param {String} encrypted
 * @return {String} params date
 */
export const decrypt = (encrypted) => {
	if (encrypted === null || typeof encrypted === 'undefined') {
		return encrypted;
	}
	let key = config.get('auth.encryption_key');
	let decipher = crypto.createDecipher('aes-256-cbc', key);
	try {
		const cip = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
		return cip;
	} catch (e) {
		return encrypted;
	}
};

/**
 * Convert callback to promise;
 *  @param {Object} options
 * @return {Object} email object
 */
export const sendEmail = (options) => {
	try {
		if (config.get('app.environment') === 'test') {
			return;
		}
		if (!options.recipients || !options.templateId) {
			throw new Error('Email options validation error');
		}
		sgMail.setApiKey(`${config.get('email.sendgrid.apiKey')}`);
		sgMail.setSubstitutionWrappers('{{', '}}');
		const message = {
			to: options.recipients,
			from: options.from || config.get('email.sendgrid.from'),
			subject: options.subject || config.get('app.appName'),
			templateId: options.templateId,
		};
		if (options.substitutions) {
			message.dynamic_template_data = Object.assign({}, options.substitutions, { appName: config.get('app.appName') });
			return sgMail.send(message);
		}
	} catch (e) {
		console.log('email error : ', e);
	}
};
/**
 * convert to uppercase 1st letter
 * @param {String} value
 * @return {Boolean} The code
 */
export const IsObjectId = (value) => {
	return value && value.length > 12 && String(mongoose.Types.ObjectId(value)) === String(value) && mongoose.Types.ObjectId.isValid(value);
};
