import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { CONSTANTS } from '../services/constants';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
        // backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundColor: '#4a76a8',

        '&:hover': {
            backgroundColor: '#44658b'
        }
    }
});

class SignIn extends Component {
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
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <img src="/images/icons/fraise-icon-128.png" />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        VK Logon
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => this.authorize()}
                    >
                        Войти через ВКонтакте
                    </Button>
                </Paper>
            </main>
        );
    }
}

export default withStyles(styles)(SignIn);