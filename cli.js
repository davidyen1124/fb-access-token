#!/usr/bin/env node

var FbToken = require('./')
var args = process.argv.splice(2)

if (args.length !== 2 && args.length !== 3) {
  console.log('Usage: fbtoken <username> <password> <appid>')
  process.exit(1)
}

var fbToken = new FbToken(args[0], args[1], args[2] || '145634995501895')
fbToken.loginGetToken(function (err, token) {
  if (err) throw err

  console.log(token)
})
