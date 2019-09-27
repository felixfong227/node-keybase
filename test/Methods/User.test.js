const KB = require('../../src/index');
const USERNAME = 'felixfong227';

test('Should return a person username', async done => {
    const them = await KB().User().GetUser(USERNAME)
    expect(them[0].basics.username).toBe(USERNAME);
    done();
});

test('Should return a person public GPG key', async done => {
    const personPGPKey = await KB().User().GetPGPKey(USERNAME);
    const firstBlock = personPGPKey[0];
    if(firstBlock.startsWith('-----BEGIN PGP PUBLIC KEY BLOCK-----')) return done();
    throw new Error('Response did not contain public key');
});