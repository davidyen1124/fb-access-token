#!/usr/bin/env node

var AccessToken = require('./')
var args = process.argv.splice(2)

if (args.length !== 3) {
  console.log('Usage: fbtoken <username> <password> <appid>')
  process.exit(1)
}

var accessToken = new AccessToken(args[0], args[1], args[2])
accessToken.loginGetToken(function (err, token) {
  if (err) throw err

  console.log(token)
})
