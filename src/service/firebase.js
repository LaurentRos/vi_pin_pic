import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBDGtdELpBK81B6E8bmmgJEuIsQm7f6oXA",
    authDomain: "pinpic-pwa.firebaseapp.com",
    databaseURL: "https://pinpic-pwa.firebaseio.com",
    projectId: "pinpic-pwa",
    storageBucket: "pinpic-pwa.appspot.com",
    messagingSenderId: "785567832598"
};
firebase.initializeApp(config);

export const database = firebase.database();
