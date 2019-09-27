module.exports = userArgument => {
    
    const defaultOptions = {
        version: '1.0',
        autoCSRF: true,
        token: null,
    };
    
    let options = Object.assign(defaultOptions, userArgument);
    
    const ENDPOINT = 'https://keybase.io';
    
    const internal = {
        _internal: {
            endpoints: {
                base: ENDPOINT,
                versionFormatted: `${ENDPOINT}/_/api/${options.version}`
            }
        },
    };
    
    options = Object.assign(options, internal);

    const User = require('./Methods/User/index');
    
    return Object.assign(
        {},
        User(options),
    );
    
}