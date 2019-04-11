import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CONSTANTS } from '../services/constants';
import styles from '../styles/vk-auth.css';
import Dashboard from './dashboard';

class VKAuth extends Component {
    authorize() {
        const redirectUri = `${location.origin}/social/provider/vk`;

        location.href = 
            'https://oauth.vk.com/authorize?' + 
                'response_type=code&' + 
                `client_id=${CONSTANTS.VK_CLIENT_ID}&` + 
                'scope=offline&' + 
                `redirect_uri=${redirectUri}&` + 
                `state=${redirectUri}`;
    }

    render() {
        if (this.props.loading) {
            return <>Загрузка...</>
        }

        // if (this.props.hasError) {
        //     return <>Ошибка загрузки компонента!</>
        // }

        // if (this.props.authUser) {
            return <Dashboard />;
        // }

        return (
            <div
                className={styles.buttonAuth}
                onClick={() => this.authorize()}
            >
                Войти через ВКонтакте
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authorize.authUser,
        loading: state.authorize.loading,
        hasError: state.authorize.hasError
    };
};

export default connect(mapStateToProps)(VKAuth);