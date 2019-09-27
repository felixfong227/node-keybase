const got = require('got');
const StatusCheck = require('../../Utils/StatusCheck');

/**
 * @typedef PersonEmailInterface
 * 
 * @property {Object} them[].emails
 * @property {Object[]} them[].emails.emails
 * @property {String} them[].emails.emails.email
 * @property {Number|Boolean} them[].emails.emails.is_primary
 * @property {Number|Boolean} them[].emails.emails.is_verified
 * @property {Date} them[].emails.emails.when_verified
 * @property {Number|Boolean} them[].emails.emails.visibility
 * @property {?Date} them[].emails.emails.last_verify_email_date
 */

/**
 * @typedef {Object[]} them
 * 
 * @property {String} them[].id - The unique UID of this Keybase user
 * 
 * @property {Object} them[].basics - Basic info about this user
 * @property {String} them[].basics.username - The username of this user
 * @property {Number} them[].basics.cttime
 * @property {Number} them[].basics.mtime
 * @property {Number} them[].basics.id_version
 * @property {Number} them[].basics.track_version
 * @property {Number} them[].basics.last_id_change
 * @property {String} them[].basics.username_cased
 * @property {Number} them[].basics.status
 * @property {String} them[].basics.salt
 * @property {Number} them[].basics.eldest_seqno
 * @property {Number} them[].basics.passphrase_generation
 * @property {Boolean} them[].basics.random_pw
 * 
 * @property {Object} them[].invitation_stats
 * @property {Number} them[].invitation_stats.available
 * @property {Number} them[].invitation_stats.used
 * @property {Number} them[].invitation_stats.power
 * @property {Number} them[].invitation_stats.open
 * 
 * @property {Object} them[].profile
 * @property {Number} them[].profile.mtime
 * @property {String} them[].profile.full_name The person full name
 * @property {?String} them[].profile.location Their location code
 * @property {?String} them[].profile.bio
 * 
 * @property {Object} them[].emails
 * @property {Object[]} them[].emails.emails
 * @property {String} them[].emails.emails.email
 * @property {Number|Boolean} them[].emails.emails.is_primary
 * @property {Number|Boolean} them[].emails.emails.is_verified
 * @property {Date} them[].emails.emails.when_verified
 * @property {Number|Boolean} them[].emails.emails.visibility
 * @property {?Date} them[].emails.emails.last_verify_email_date
 * 
 * @property {Object} them[].emails.primary
 * @property {String} them[].emails.primary.email
 * @property {Number|Boolean} them[].emails.primary.is_primary
 * @property {Number|Boolean} them[].emails.primary.is_verified
 * @property {Date} them[].emails.primary.when_verified
 * @property {Number|Boolean} them[].emails.primary.visibility
 * @property {?Date} them[].emails.primary.last_verify_email_date
 * 
 * @property {Object} them[].billing_and_quotas
 * @property {Object} them[].billing_and_quotas.plan
 * @property {String} them[].billing_and_quotas.plan.plan_id
 * @property {String} them[].billing_and_quotas.plan.plan_name
 * @property {Number} them[].billing_and_quotas.plan.price_pennies
 * @property {Number} them[].billing_and_quotas.plan.gigabytes
 * @property {Number} them[].billing_and_quotas.plan.num_groups
 * @property {Number} them[].billing_and_quotas.plan.folders_with_writes
 * @property {Number} them[].billing_and_quotas.plan.billing_status
 * @property {?Boolean|Number} them[].billing_and_quotas.plan.test_mode
 * 
 * @property {Object} them[].billing_and_quotas.usage
 * @property {Number} them[].billing_and_quotas.gigabytes
 * @property {Number} them[].billing_and_quotas.num_groups
 * @property {Number} them[].billing_and_quotas.folders_with_writes
 * 
 * @property {Object} them[].proofs_summary
 * @property {Object} them[].proofs_summary.by_presentation_group
 * @property {Object} them[].proofs_summary.by_sig_id
 * @property {Object[]} them[].proofs_summary.all
 * @property {Boolean} them[].proofs_summary.has_web
 * 
 * @property {Object} them[].pictures - All the pictures related to this user
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
 * 
 * @property {Object} them[].private_keys
 * @property {Object} them[].cryptocurrency_addresses
 * 
 * @property {Object} them[].sigs
 * @property {Object} them[].sigs.last
 * @property {String} them[].sigs.last.sig_id
 * @property {Number} them[].sigs.last.seqno
 * @property {String} them[].sigs.last.payload_hash
 * 
 * @property {Object[]} them[].devices
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