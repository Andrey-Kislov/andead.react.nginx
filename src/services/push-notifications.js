import firebase from 'firebase/app';
import 'firebase/messaging';

import { CONSTANTS } from './constants';
import { postData } from './common';

export function initializeFirebase() {
    firebase.initializeApp({
        messagingSenderId: CONSTANTS.MESSAGING_SENDER_ID
    });
}

function isSubscribed(currentToken) {
    return window.localStorage.getItem('firebaseMessagingToken') === currentToken;
}

function subscribe(currentToken) {
    window.localStorage.setItem('firebaseMessagingToken', currentToken ? currentToken : '');
}

function sendToken(token) {
    return postData('/notifications/add', { Token: token });
}

export async function checkNotificationsPermission() {
    if (isSubscribed()) {
        return;
    }

    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log(`Token: ${token}`);

        sendToken(token)
            .then(() => subscribe(token))
            .catch(() => subscribe(false));
        
        return token;
    } catch (error) {
        console.error('Ошибка получения токена', error);
        subscribe(false);
    }
}
