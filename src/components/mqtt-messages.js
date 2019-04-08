import React, { Component } from 'react';
import { Card, CardDeck, Alert } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';

import { CONSTANTS } from '../services/constants';
import { connect as connectToMqtt, subscribe } from '../actions/mqtt';
import styles from '../styles/cards.css';

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

        this.props.subscribe(CONSTANTS.MQTT_TOPIC);
    }

    render() {
        console.log(this.props.message);
        
        if (!this.props.mqttClient) {
            return null;
        }

        var sensor = this.props.message.payload || {};
        
        return (
            <>
                <Alert className={styles.alert + (this.props.mqttClient.connected ? ` ${styles.alertHide}` : '')} variant="secondary">
                    Подключение к брокеру очередей...
                </Alert>

                <CardDeck className={styles.cardDeck}>
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Title>Aqara Vibration Sensor</Card.Title>
                            <Card.Img className={styles.cardImg} variant="top" src="/images/devices/DJT11LM.jpg" />
                            <Card.Text>
                                Датчик обнаружения вибрации Aqara для умного дома Xiaomi.
                            </Card.Text>
                            <Card.Text>
                                Угол X: {this.getValue(sensor.angle_x)}<br/>
                                Угол Y: {this.getValue(sensor.angle_y)}<br/>
                                Угол Z: {this.getValue(sensor.angle_z)}<br/>
                                Абсолютный угол X: {this.getValue(sensor.angle_x_absolute)}<br/>
                                Абсолютный угол Y: {this.getValue(sensor.angle_y_absolute)}<br/>
                                Связь: {this.getValue(sensor.linkquality)}<br/>
                                Батарея: {this.getValue(sensor.battery)}<br/>
                                Напряжение: {this.getValue(sensor.voltage)}<br/>
                                Действие: {this.getAction(sensor.action)}<br/>
                                Наклон: {sensor.angle ? sensor.angle : 'нет'}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">
                                Последнее обновление {sensor.last_seen ? moment(sensor.last_seen).format('DD.MM.YYYY - HH:mm') : 'н/д'}
                            </small>
                        </Card.Footer>
                    </Card>
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