import MQTT from 'async-mqtt';

import { ACTION_MQTT } from './constants';

export function setMqttClient(mqttClient) {
    return {
        type: ACTION_MQTT.setMqttClient,
        mqttClient
    };
}

export function setMessage(message) {
    return {
        type: ACTION_MQTT.setMessage,
        message
    };
}

export function connect(mqttServer) {
    return (dispatch) => {
        var mqttClient = MQTT.connect(mqttServer);

        mqttClient.on('message', (topic, message) => {
            dispatch(setMessage({ payload: JSON.parse(message.toString()), topic }));
        });

        dispatch(setMqttClient(mqttClient));
    };
}

export function subscribe(topic) {
    return (dispatch, getState) => {
        

        getState().mqtt.mqttClient.subscribe(topic)
            .then(() => {
                // console.log(getState());
                // dispatch(setMessages(messages));
               
            });
    };
}