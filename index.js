var request = require('request')
request = request.defaults({
  jar: true
})

var access_token = function (username, password, appId) {
  this.username = username
  this.password = password
  this.appId = appId
}

access_token.prototype.login = function (callback) {
  // login to facebook
  request.post({
    url: 'https://www.facebook.com/login.php',
    headers: {
      cookie: '_js_datr=o-yfVdmCImbo0AiTO9ir7YVl; _js_reg_fb_ref=https%3A%2F%2Fwww.facebook.com%2F; _js_reg_fb_gate=https%3A%2F%2Fwww.facebook.com%2F; dpr=1.100000023841858',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36'
    },
    form: {
      lsd: 'AVpVYcLw',
      email: this.username,
      pass: this.password,
      persistent: '1',
      default_persistent: '0',
      timezone: '-480',
      lgndim: 'eyJ3IjoxOTIwLCJoIjoxMDgwLCJhdyI6MTkyMCwiYWgiOjEwNTcsImMiOjI0fQ==',
      lgnrnd: '090243_3H_E',
      lgnjs: '1436544166',
      locale: 'zh_TW',
      qsstamp: 'W1tbMTMsMjcsNDUsNTgsNjksNzAsNzcsNzgsODEsODksMTAxLDEwNSwxMjEsMTI0LDEyOSwxMzAsMTQ5LDE2OSwyNjAsMjg3LDI5MywyOTgsMzE0LDMyNywzNTEsMzUyLDM2NywzNzcsMzc4LDM5Niw0NjMsNDY0LDQ4MCw1MjcsNTUxLDU2NCw2MDgsNjIwLDYyOSw2NjQsNzYwLDc3Ml1dLCJBWmt4bUNiWDkyZ3lFQkpWNGcwRmxtdE10Zm43cGhoS3M0T1cyVUExR1N1Mm1GdUFaZ2hpUHAwalV1aHNaTVRFS3ZOeWg1UkVBTERoazRtZXZhSUg3SG9oQXlIZ2dmSnc5dG5IY3hqOG00VUhGclBHQTdaRk5GYlZMOGh4bVZhRjZXVGkwVVZoM1FTOWhJQkVKeGJlbmppMDhLWWRET2NfaUl0blRxbzdJSDhiQ1pfeXI5ZEhUYzJsOFdlOWxNeUlBcE0yaUd4Z0I0X1A5YndTTldyOUVoU0pySmFzX0F3Tkx6TkZ2UWV3M183Vm9Mb3h6NThBU0wyUE9vUVRTVHpuMGNxS2pTbng0dFZ4dUxsLUxMWXJEamNjIl0='
    }
  }, function (err, res, body) {
    if (err) {
      return callback(err)
    }

    callback(null)
  })
}

access_token.prototype.getToken = function (callback) {
  // use graph api explorer to get access token
  request.get({
    url: 'https://developers.facebook.com/tools/explorer/' + this.appId + '/permissions?version=v2.1&__a=1&__dyn=5U463-i3S2e4oK4pomXWo5O12wAxu&__req=2&__rev=1470714'
  }, function (err, res, body) {
    if (err) {
      return callback(err)
    }

    if (res.statusCode !== 200) {
      return callback(new Error('Status code is ' + res.statusCode + ', ' + body))
    }

    try {
      body = JSON.parse(body.replace('for (;;);', ''))
    } catch (e) {
      return callback(new Error('JSON parse error:' + e))
    }

    // get token in complicated structure
    var token
    try {
      token = body.jsmods.instances[2][2][2]
    } catch (e) {
      return callback(new Error('No access token'))
    }

    // return access token
    callback(null, token)
  })
}

access_token.prototype.loginGetToken = function (callback) {
  var that = this
  that.login(function (err) {
    if (err) {
      return callback(err)
    }

    that.getToken(function (err, token) {
      if (err) {
        return callback(err)
      }

      callback(null, token)
    })
  })
}

module.exports = access_token
