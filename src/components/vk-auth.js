import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from '../styles/vk-auth.css';

class VKAuth extends Component {
    authorize() {
        var redirectUri = location.origin + '/social/provider/vk';

        location.href = 
            'https://oauth.vk.com/authorize?' + 
                'response_type=code&' + 
                'client_id=6809010&' + 
                'scope=offline&' + 
                'redirect_uri=' + redirectUri + '&' + 
                'state=' + redirectUri;
    }

    render() {
        if (this.props.loading) {
            return <>Загрузка...</>
        }

        // if (this.props.hasError) {
        //     return <>Ошибка загрузки компонента!</>
        // }

        if (this.props.authUser) {
            return <>Hello {this.props.authUser.first_name}</>
        }

        return <div className={styles.buttonAuth} onClick={() => this.authorize()}>Войти через ВКонтакте</div>
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