import React, { Component } from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import moment from 'moment';
import { subscribe } from '@andrey.kislov/mqtt-react';

import { CONSTANTS } from '../services/constants';
import styles from '../styles/cards.css';

class MqttMessages extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        console.log(this.props.data);
        
        return (
            <>
                <CardDeck className={styles.cardDeck}>
                    <Card className={styles.card}>
                        <Card.Body>
                            <Card.Title>Aqara Vibration Sensor</Card.Title>
                            <Card.Img className={styles.cardImg} variant="top" src="images/devices/DJT11LM.jpg" />
                            <Card.Text>
                                Датчик обнаружения вибрации Aqara для умного дома Xiaomi.
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