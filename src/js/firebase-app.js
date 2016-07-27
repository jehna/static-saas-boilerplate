var secretFirebaseKeys = require('./firebase-keys-secret.js');
var fireabse = require('firebase/app');

var app = firebase.initializeApp(secretFirebaseKeys);
module.exports = app;
