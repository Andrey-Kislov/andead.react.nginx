import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';

import styles from '../styles/cards.css';

export default class Device extends Component {
    shouldComponentUpdate(nextProps) {
        return (Object.keys(nextProps.payload).length === 0 ? false : true);
    }

    render() {
        const { payload, info } = this.props;

        return (
            <Card className={styles.card}>
                <Card.Body>
                    <Card.Title>{info.name}</Card.Title>
                    <Card.Img className={styles.cardImg} variant="top" src={encodeURI(info.image)} />
                    <Card.Text>
                        {info.description}
                    </Card.Text>
                    <Card.Text>
                        
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        Последнее обновление {payload.last_seen ? moment(payload.last_seen).format('DD.MM.YYYY - HH:mm') : 'н/д'}
                    </small>
                </Card.Footer>
            </Card>
        );
    }
}