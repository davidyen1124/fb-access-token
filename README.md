# fb-access-token
Retrieve facebook access token by Graph API Explorer API.


## Install:
```
npm install fb-access-token
```

## Usage:
```javascript
var access_token = require('fb-access-token');
access_token('<USERNAME>', '<PASSWORD>', '<APP_ID>', function(err, token) {
    if (err) {
        console.error('Found error!', err);
        return;
    }
    
    console.log('Access token:', token);
});
```

#### Feel free to open issues and PRs
