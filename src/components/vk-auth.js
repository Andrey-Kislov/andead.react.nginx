import React, { Component } from 'react';

import '../styles/vk-auth.css';

export default class VKAuth extends Component {
    authorize() {
        location.href = 
            'https://oauth.vk.com/authorize?' + 
                'response_type=code&' + 
                'client_id=6809010&' + 
                'scope=offline&' + 
                'redirect_uri=http://localhost:5051/api/oauth/vk';
                // 'redirect_uri=' + location.origin + '/oauth/provider/vk';
    }

    render() {
        if (this.props.authUser) {
            return <>Hello {this.props.authUser.first_name}</>
        }

        return <div className="button-auth" onClick={() => this.authorize()}>Sign in VK</div>
    }
}