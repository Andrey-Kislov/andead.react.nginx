import React, { Component } from 'react';
import { subscribe } from '@andrey.kislov/mqtt-react';
import { CONSTANTS } from '../services/constants';

class MqttMessages extends Component {
    static defaultProps = {
        data: []
    }

    render() {
        console.log(this.props.data);
        
        return (
            <div>
                {
                    this.props.data.map(message => <div key={message.Timestamp}>{JSON.stringify(message)}</div>)
                }
            </div>
        );
    }
}

export default subscribe({
    topic: CONSTANTS.MQTT_TOPIC
})(MqttMessages);