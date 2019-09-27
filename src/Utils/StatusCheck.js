module.exports = (respond, byPassKeybaseCheck=false) => {
    return new Promise(async (resolve, reject) => {
          try {
              if(Array.isArray(respond)) {
                  respond.forEach(res => MainTest(res, byPassKeybaseCheck))
              } else {
                  MainTest(respond, byPassKeybaseCheck);
              }
            return resolve();
          } catch (err){
              return reject(err);
          }
    });
}

async function MainTest(res, byPassKeybaseCheck) {
    try {
        HTTPCheck(res);
        if(byPassKeybaseCheck === false) KeybaseCheck(res);
    } catch (err) {
        throw new Error(err);
    }
}
        
function HTTPCheck(respond) {
    const allowedStatusCode = [
        200,
        201
    ];
    if(typeof respond.statusCode !== 'number') respond.statusCode = respond.statusCode * 1;
    if(!allowedStatusCode.includes(respond.statusCode)) {
        throw new Error(`HTTP Error, request was NOT successful, got HTTP status code ${respond.statusCode}`);
    }
}

function KeybaseCheck(respond) {
    const payload = respond.body;
    if(!payload) throw new Error('Argument "payload" is empty');
    if(typeof payload !== 'object') throw new Error(`Expecting argument "payload" to be typeof an object but got "${typeof payload}"`);
    if(!payload.status || typeof payload.status !== 'object') throw new Error('Invalid formatted Keybase object: payload do not contain status object');
    if(payload.status.code !== 0) throw new Error('Keybase status code is not equal to 0');
} 