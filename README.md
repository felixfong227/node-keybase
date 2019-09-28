# Keybase.io NodeJS SDK

## 👷🏽‍♀️This project is still under active development 👷🏽

---

```javascript
const KB = require('node-keybase');
(async () => {
    const me = await KB().User().GetUser().ByName('felixfong227');
    console.log(`Hello my name is ${me.profile.full_name}`);
    // #=> Hello my name is Felix Fong
})().catch(err => console.error(err));
```

My plan is to based on [The Official Keybase API Docs](https://keybase.io/docs/api/1.0/call/signup) and wrap those calls into one single easily adaptable library