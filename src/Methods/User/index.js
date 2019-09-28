module.exports = options => ({
    
    User: () => ({
        GetUser: () => require('./GetUser')(options),
        GetPGPKey: names => require('./GetPGPKeys')(names, options),
    })
    
});