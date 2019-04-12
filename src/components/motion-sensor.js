import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import styles from '../styles/cards.css';

export default class MotionSensor extends Component {
    getAction(action) {
        switch (action) {
            case true:
                return 'да';
            case false:
                return 'нет';
        }

        return 'н/д';
    }

    shouldComponentUpdate(nextProps) {
        return (Object.keys(nextProps.sensor).length === 0 ? false : true);
    }

    render() {
        const { sensor } = this.props;

        return (
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Title>Aqara Occupancy Sensor / Body Sensor</Card.Title>
                    <Card.Img className={styles.cardImg} variant="top" src="/images/devices/RTCGQ11LM.jpg" />
                    <Card.Text>
                        Датчик движения Aqara для умного дома Xiaomi.
                    </Card.Text>
                    <Card.Text>
                        Обнаружено движение: {this.getAction(sensor.occupancy)}<br/>
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