import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import withMobileDialog from '@material-ui/core/withMobileDialog';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 700,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    dialogContent: {
        overflow: 'hidden'
    }
});

class Actions extends Component {
    state = {
        open: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, fullScreen } = this.props;

        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Добавить триггер
                </Button>
                <Dialog
                    fullScreen={fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                {/* <DialogTitle id="alert-dialog-title">{"Выберите триггер"}</DialogTitle> */}
                <DialogContent className={classes.dialogContent}>
                    {/* <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText> */}

                    <List className={classes.root} subheader={<li />}>
                        {[0, 1, 2, 3, 4].map(sectionId => (
                            <li key={`section-${sectionId}`} className={classes.listSection}>
                                

                                <ul className={classes.ul}>
                                    <ListSubheader>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar`}
                                                src={`/images/devices/DJT11LM.jpg`}
                                            />
                                        </ListItemAvatar>
                                    
                                        {`Aqara Vibration Sensor`}
                                    </ListSubheader>
                                    {[0, 1, 2].map(item => (
                                    <ListItem key={`item-${sectionId}-${item}`} button>
                                        <ListItemText primary={`Item ${item}`} />
                                    </ListItem>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </List>

                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
                </Dialog>
            </div>
        );
    }
}

// export default Actions;
export default (withStyles(styles)(Actions));