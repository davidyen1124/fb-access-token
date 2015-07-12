# fb-access-token
Retrieve facebook access token by Graph API Explorer API.


## Install:
```
npm install fb-access-token
```

## Usage:
```javascript
var fbToken = require('fb-access-token');

// login and get token
var ft = new fbToken('<USERNAME>', '<PASSWORD>', '<APP_ID>', function(err, token) {
    if (err) {
        console.error('Found error!', err);
        return;
    }
    
    console.log('Access token:', token);
});

// get token every second without login again
setInterval(function() {
    ft.getToken(function(err, token) {
        if (err) {
            console.error('Found error!', err);
            return;
        }
        
        console.log('Access token:', token);
    });
}, 1000);
```

#### Feel free to open issues and PRs
