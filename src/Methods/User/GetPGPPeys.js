const got = require('got');
const StatusCheck = require('../../Utils/StatusCheck');

module.exports = (names, options) => GetPGPKey(names, options);

/**
 * @typedef {String[]} pubkeyInterface The user's public PGP key
 */

/**
 * Get detail informations about one single or mutiple users
 * @param {string|Array} names A single name or an array of names
 * @returns {Promise<pubkeyInterface>}
 */
function GetPGPKey (names, options) {
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
        
        const listOfRequestJobs = userNames.map(username => {
            return got(
                `${options._internal.endpoints.base}/${username}/pgp_keys.asc`,
                {
                    throwHttpErrors: false,
                    json: false,
                }
            );
        });
        
        if(listOfRequestJobs.length >= 1) {
            const responses = await Promise.all(listOfRequestJobs);
            // Status check
            try {
                await StatusCheck(responses, true);
                return resolve(
                    responses.map(res => res.body)
                );
            } catch (err) {
                return reject(err);
            }
        }
        
    });
}