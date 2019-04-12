import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeviceHub from '@material-ui/icons/DeviceHub';
import History from '@material-ui/icons/History';
import Build from '@material-ui/icons/Build';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMenuIndex: this.props.selectedMenuIndex
        };
    }
    
    changeMenuItem(menuIndex) {
        this.setState({ selectedMenuIndex: menuIndex });
    }

    render() {
        return (
            <>
                <Link to="/">
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 0}
                        onClick={() => this.changeMenuItem(0)}
                    >
                        <ListItemIcon>
                            <DeviceHub />
                        </ListItemIcon>
                        <ListItemText primary="Устройства" />
                    </ListItem>
                </Link>
                <Link to="/actions">
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 1}
                        onClick={() => this.changeMenuItem(1)}
                    >
                        <ListItemIcon>
                            <Build />
                        </ListItemIcon>
                        <ListItemText primary="Правила" />
                    </ListItem>
                </Link>
                <Link to="/log">
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 2}
                        onClick={() => this.changeMenuItem(2)}
                    >
                        <ListItemIcon>
                            <History />
                        </ListItemIcon>
                        <ListItemText primary="Лог" />
                    </ListItem>
                </Link>
            </>
        );
    }
}

export default withStyles(styles)(MainMenu);