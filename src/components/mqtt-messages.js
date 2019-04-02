import React, { Component } from 'react';
import { Card, CardDeck, Alert } from 'react-bootstrap';
import moment from 'moment';
import { subscribe } from '@andrey.kislov/mqtt-react';

import { CONSTANTS } from '../services/constants';
import styles from '../styles/cards.css';

class MqttMessages extends Component {
    static defaultProps = {
        data: []
    }

    getAction(action) {
        switch (action) {
            case 'tilt':
                return 'наклон';
            case 'vibration':
                return 'вибрация';
        }

        return 'нет';
    }

    render() {
        console.log(this.props.data);
        
        return (
            <>
                <Alert className={styles.alert + (this.props.mqtt.connected ? ` ${styles.alertHide}` : '')} variant="secondary">
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
                                Угол X: 10<br/>
                                Угол Y: 12<br/>
                                Действие: {this.getAction()}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Последнее обновление {moment().format('HH:mm')}</small>
                        </Card.Footer>
                    </Card>
                </CardDeck>

                {/* {
                    this.props.data.map(message => <div key={message.Timestamp}>{JSON.stringify(message)}</div>)
                } */}
            </>
        );
    }
}

export default subscribe({
    topic: CONSTANTS.MQTT_TOPIC
})(MqttMessages);