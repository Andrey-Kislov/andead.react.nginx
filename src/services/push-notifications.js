import firebase from 'firebase/app';
import 'firebase/messaging';

import { CONSTANTS } from './constants';

export function initializeFirebase() {
    firebase.initializeApp({
        messagingSenderId: CONSTANTS.MESSAGING_SENDER_ID
    });
}

export async function checkNotificationsPermission() {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log(`Token: ${token}`);
        
        return token;
    } catch (error) {
        console.error('Ошибка получения токена', error);
    }
}
