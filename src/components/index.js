import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import VKAuth from './vk-auth';

class Index extends Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        this.cookiesName = 'access_token';

        this.state = {
            authUser: null
        };
    }

    async checkAuthUser() {
        const accessToken = this.cookies.get(this.cookiesName);

        if (accessToken) {
            try {
                const response = await axios.get('http://localhost:5051/api/oauth/login', { headers: { 'Authorization': 'Bearer ' + accessToken } });
                console.log(response);

                this.setState({ authUser: response.data });
            } catch (error) {
                console.error(error);
            }
        }
    }

    componentWillMount() {
        this.checkAuthUser();
    }

    render() {
        return (
            <>
                <h4>This is test React Component</h4>

                <VKAuth authUser={this.state.authUser} />
            </>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('index')
);