import React, { Component } from 'react';
import { CardDeck, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CONSTANTS } from '../services/constants';
import { connect as connectToMqtt, subscribe } from '../actions/mqtt';
import styles from '../styles/cards.css';
import VibrationSensor from './vibration-sensor';
import MotionSensor from './motion-sensor';
import SwitchButton from './switch-button';

class _MqttMessages extends Component {
    static defaultProps = {
        data: []
    }

    getAction(action) {
        switch (action) {
            case 'tilt':
                return 'наклон';
            case 'vibration':
                return 'вибрация';
            case 'drop':
                return 'падение';
        }

        return 'нет';
    }

    getValue(value) {
        return (value || value === 0 ? value : 'н/д');
    }

    componentDidMount() {
        this.props.connectToMqtt(CONSTANTS.MQTT_SERVER_URL);

        this.props.subscribe(CONSTANTS.MQTT_TOPIC_VIBRATION_SENSOR);
        this.props.subscribe(CONSTANTS.MQTT_TOPIC_BODY_SENSOR);
        this.props.subscribe(CONSTANTS.MQTT_TOPIC_SWITCH);
    }

    render() {
        console.log(this.props.message);
        
        if (!this.props.mqttClient) {
            return null;
        }

        var sensor = this.props.message || {};
        
        return (
            <>
                <Alert className={styles.alert + (this.props.mqttClient.connected ? ` ${styles.alertHide}` : '')} variant="secondary">
                    Подключение к брокеру очередей...
                </Alert>

                <CardDeck className={styles.cardDeck}>
                    <VibrationSensor sensor={sensor.topic === CONSTANTS.MQTT_TOPIC_VIBRATION_SENSOR ? sensor.payload : {}} />
                    <MotionSensor sensor={sensor.topic === CONSTANTS.MQTT_TOPIC_BODY_SENSOR ? sensor.payload : {}} />
                    <SwitchButton sensor={sensor.topic === CONSTANTS.MQTT_TOPIC_SWITCH ? sensor.payload : {}} />
                </CardDeck>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.mqtt.message,
        mqttClient: state.mqtt.mqttClient
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        connectToMqtt: (mqttServer) => dispatch(connectToMqtt(mqttServer)),
        subscribe: (topic) => dispatch(subscribe(topic))
    };
};

const MqttMessages = connect(mapStateToProps, mapDispatchToProps)(_MqttMessages);
export default MqttMessages;