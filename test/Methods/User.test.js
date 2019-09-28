const KB = require('../../src/index');
const USERNAME = 'felixfong227';

test('Should return one single person username', async done => {
    const person = await KB().User().GetUser().ByName(USERNAME);
    expect(person.basics.username).toBe(USERNAME);
    done();
});

test('Should return one single person username', async done => {
    const them = await KB().User().GetUser().ByNames(
        [
            USERNAME,
            'owo'
        ]
    );
    expect(them[0].basics.username).toBe(USERNAME);
    expect(them[1].basics.username).toBe('owo');
    done();
});

test('Should return a person public GPG key', async done => {
    const personPGPKey = await KB().User().GetPGPKey(USERNAME);
    const firstBlock = personPGPKey[0];
    expect(firstBlock).toMatch(
        /^-----BEGIN PGP PUBLIC KEY BLOCK-----/
    );
    done();
});

test('Should create a valid login session between this machine and Keybase server', async done => {
    await KB().Login({
        username: 'felixfong227',
        secretKeyPath: './private.asc'
    });
    return done();
});