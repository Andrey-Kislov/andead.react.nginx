import React, { Component } from 'react';
import { CardDeck, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

import { CONSTANTS } from '../services/constants';
import { connect as connectToMqtt, subscribe } from '../actions/mqtt';
import { getData } from '../services/common';
import styles from '../styles/cards.css';
import VibrationSensor from './vibration-sensor';
import MotionSensor from './motion-sensor';
import SwitchButton from './switch-button';
import Device from './device';

class _MqttMessages extends Component {
    static defaultProps = {
        data: []
    }

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            hasError: false,
            devices: []
        };
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
        getData('/mqtt/devices')
            .then(data => {
                if (data.devices.length > 0) {
                    this.props.connectToMqtt(CONSTANTS.MQTT_SERVER_URL);

                    this.setState({ devices: data.devices });

                    data.devices.forEach(device => {
                        this.props.subscribe(device.topic);
                    });
                }
            })
            .catch(() => this.setState({ hasError: true }))
            .finally(() => this.setState({ loading: false }));
    }

    render() {
        console.log(this.props.message);

        if (this.state.loading) {
            return (
                <Alert className={styles.alert} variant="secondary">
                    Получение устройств...
                </Alert>
            );
        }

        if (this.state.hasError) {
            return (
                <Alert className={styles.alert} variant="warning">
                    Ошибка получения устройств
                </Alert>
            );
        }

        if (this.state.devices.length === 0) {
            return (
                <Alert className={styles.alert} variant="secondary">
                    Устройств нет
                </Alert>
            );
        }
        
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
                {
                    this.state.devices.map(device => {
                        return (
                            <Device key={device.id} info={device} payload={sensor.topic === device.topic ? sensor.payload : {}} />
                        )
                    })
                }
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