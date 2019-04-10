import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeviceHub from '@material-ui/icons/DeviceHub';
import History from '@material-ui/icons/History';
import Build from '@material-ui/icons/Build';

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
            selectedMenuIndex: 0
        };
    }

    changeMenuItem(menuIndex) {
        this.setState({ selectedMenuIndex: menuIndex });
    }

    render() {
        const { classes } = this.props;

        return (
            
                <>
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 0}
                        onClick={event => this.changeMenuItem(0)}
                    >
                        <ListItemIcon>
                            <DeviceHub />
                        </ListItemIcon>
                        <ListItemText primary="Устройства" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 1}
                        onClick={event => this.changeMenuItem(1)}
                    >
                        <ListItemIcon>
                            <Build />
                        </ListItemIcon>
                        <ListItemText primary="Правила" />
                    </ListItem>
                    <ListItem
                        button
                        selected={this.state.selectedMenuIndex === 2}
                        onClick={event => this.changeMenuItem(2)}
                    >
                        <ListItemIcon>
                            <History />
                        </ListItemIcon>
                        <ListItemText primary="Лог" />
                    </ListItem>
                {/* </List> */}
            {/* </div> */}
            </>
        );
    }
}

export default withStyles(styles)(MainMenu);