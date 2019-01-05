import ReactDOM from 'react-dom';
import React, { Component } from 'react';

class Index extends Component {
    render() {
        return (
            <h4>This is test React Component</h4>
        );
    }
}

ReactDOM.render(
    <Index />,
    document.getElementById('index')
);
