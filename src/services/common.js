import axios from 'axios';

import { store } from '../components/index';

export function getData(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${store.getState().authorize.accessToken}`
            },
            params: params
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            console.error('Ошибка загрузки данных', error);
            reject();
        });
    });
}

export function postData(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url,
            JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => resolve(response))
        .catch(error => {
            console.error('Не удалось создать элемент', error);
            reject();
        });
    });
}
