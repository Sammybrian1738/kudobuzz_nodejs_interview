const { allowed_platform_name } = require("../models/subscription");
const { v4: uuidv4 } = require("uuid");
var events = require("events");

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function generateRandomBusinessID() {
  return uuidv4();
}

function generateRandomEmail() {
  var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  var string = "";
  for (var i = 0; i < 15; i++) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string + "@gmail.com";
}

function generateRandomPaymentPlatformName() {
  return allowed_platform_name[
    Math.floor(Math.random() * allowed_platform_name.length)
  ];
}

function generateRandomPaymentPlatformExternalID() {
  return uuidv4();
}



module.exports = {
  generateRandomString,
  generateRandomBusinessID,
  generateRandomEmail,
  generateRandomPaymentPlatformName,
  generateRandomPaymentPlatformExternalID,
  eventEmitter: new events.EventEmitter(),
};
