const got = require('got');
const StatusCheck = require('../../Utils/StatusCheck');

/**
 * @typedef {Object[]} them
 * @property {String} them[].id - The unique UID of this Keybase user
 * @property {Object} them[].basics - Basic info about this user
 * @property {String} them[].basics.username - The username of this user
 * @property {Number} them[].basics.cttime
 * @property {Number} them[].basics.mtime
 * @property {Number} them[].basics.id_version
 * @property {Number} them[].basics.track_version
 * @property {Number} them[].basics.last_id_change
 * @property {Object} them[].pictures - All the pictures related to this user
 * 
 * @property {Object} them[].pictures.primary
 * @property {String} them[].pictures.primary.url - The profile picture's URL
 * @property {?Number} them[].pictures.primary.width - The width of the profile picture
 * @property {?Number} them[].pictures.primary.height - The height of the profile picture
 * 
 * @property {Object} them[].public_keys - Public key this user have
 * @property {Object} them[].public_keys.primary
 * @property {String} them[].public_keys.primary.key_fingerprint
 * @property {string} them[].public_keys.primary.kid
 * @property {Number} them[].public_keys.primary.key_type
 * @property {String} them[].public_keys.primary.bundle
 * @property {Number} them[].public_keys.primary.mtime
 * @property {Number} them[].public_keys.primary.ctime
 * @property {String} them[].public_keys.primary.ukbid
 */

module.exports = (names, options) => GetUser(names, options);

/**
 * Get detail informations about one single or mutiple users
 * @param {string|Array} names A single name or an array of names
 * @returns {Promise<them>}
 */
function GetUser (names, options) {
    return new Promise(async (resolve, reject) => {
        let userNames = [];
        if (typeof names === 'string') {
            userNames = [names];
        } else if (Array.isArray(names)) {
            userNames = names;
        } else {
            return reject('Expecting argument "names" to be either a string or a list of name(array)');
        }

        if (userNames.length <= 0) return reject('Emtpy target user(s) is not allowed');

        const respond = await got(`${options._internal.endpoints.versionFormatted}/user/lookup.json?usernames=${userNames.join(',')}`, {
            throwHttpErrors: false,
            json: true
        });

        try {
            await StatusCheck(respond);
            return resolve(respond.body.them);
        } catch (err) {
            return reject(err);
        }

    });
}