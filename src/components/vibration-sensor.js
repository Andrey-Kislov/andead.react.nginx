import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import styles from '../styles/cards.css';

export default class VibrationSensor extends Component {
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

    shouldComponentUpdate(nextProps) {
        return (Object.keys(nextProps.sensor).length === 0 ? false : true);
    }

    render() {
        const { sensor } = this.props;

        return (
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
        );
    }
}