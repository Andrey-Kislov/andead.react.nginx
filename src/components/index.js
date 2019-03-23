import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import configureStore from '../store/configureStore';
import { checkAuthUser } from '../actions/authorize';
import VKAuth from './vk-auth';
import Home from './home';
import About from './about';
import * as serviceWorker from '../services/serviceWorker';
import { initializeFirebase, checkNotificationsPermission } from '../services/push-notifications';

import '../styles/globals.css';

class _Index extends Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        this.cookiesName = 'access_token';

        this.state = {
            userToken: null
        };
    }

    componentDidMount() {
        this.props.checkAuthUser(this.cookies.get(this.cookiesName));

        initializeFirebase();
        checkNotificationsPermission().then((userToken) => this.setState({ userToken: userToken }));
    }

    render() {
        return (
            <>
                <VKAuth />

                <Router>
                    <>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>

                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                            <Route component={Home} />
                        </Switch>
                    </>
                </Router>

                <p style={{ wordBreak: 'break-all' }}>
                    {this.state.userToken}
                </p>
            </>
        );
    }
}

export const store = configureStore();

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthUser: (accessToken) => dispatch(checkAuthUser(accessToken))
    };
};

const Index = connect(null, mapDispatchToProps)(_Index);
export default Index;

ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('index')
);

serviceWorker.register();