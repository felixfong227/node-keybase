const path = require('path');

module.exports = options => ({
    
    /**
     * @param {Object} loginOptions
     * @param {String} loginOptions.username
     * @param {String} loginOptions.secretKeyPath
     */
    Login: loginOptions => {
        return new Promise((resolve, reject) => {
            let { username, secretKeyPath } = loginOptions;
        
            if(!username) return reject('Argument "username" can not be empty');
            if(!secretKeyPath) return reject('Argument "secretKeyPath" can not be empty');
            
            if(!path.isAbsolute(secretKeyPath)) secretKeyPath = path.resolve(secretKeyPath);
            
            return resolve(1);
            
        });
    }
    
});