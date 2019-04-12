import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import SignIn from './sign-in';
import Dashboard from './dashboard';

class VKAuth extends Component {
    render() {
        if (this.props.loading) {
            return <>Загрузка...</>
        }

        // if (this.props.hasError) {
        //     return <>Ошибка загрузки компонента!</>
        // }

        // if (this.props.authUser) {
            return (
                <Router>
                    <Dashboard />
                </Router>
            );
        // }

        return <SignIn />;
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