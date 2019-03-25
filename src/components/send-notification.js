import React, { Component } from 'react';
import { postData, getData } from '../services/common';

export default class SendNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tokens: []
        };
    }

    sendNotification(token) {
        postData('/notifications/send', { Token: token });
    }

    componentDidMount() {
        getData('/notifications/tokens')
            .then(result => this.setState({ tokens: result.tokens }));
    }

    render() {
        return (
            <div>
                {
                    this.state.tokens.map((token, index) => {
                        return (
                            <div key={index}>
                                Устройство №{index + 1} 
                                <input
                                    type="button"
                                    onClick={() => this.sendNotification(token.Token)}
                                    value="Отправить"
                                />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}