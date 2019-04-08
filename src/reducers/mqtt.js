import { ACTION_MQTT } from '../actions/constants';

const initialState = {
    mqttClient: null,
    message: {}
};

export function mqtt(state = initialState, action) {
    switch (action.type) {
        case ACTION_MQTT.setMqttClient:
            return Object.assign({}, state, {
                mqttClient: action.mqttClient
            });

        case ACTION_MQTT.setMessage:
            return Object.assign({}, state, {
                message: action.message
            });

        default:
            return state;
    }
}