module.exports = options => ({
    
    User: () => ({
        GetUser: names => require('./GetUser')(names, options),
        GetPGPKey: names => require('./GetPGPPeys')(names, options),
    })
    
});