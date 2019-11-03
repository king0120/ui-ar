import React from 'react';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles, Button, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { FuseAnimate } from '@fuse';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import connect from 'react-redux/es/connect/connect';
import clsx from 'clsx';
import moment from 'moment';

const styles = theme => ({
    root: {
        backgroundColor: lightBlue['400'],
        color: '#FFFFFF',
        backgroundSize: 'cover',
        backgroundPosition: '0 50%',
        backgroundRepeat: 'no-repeat',
        '&:before': {
            content: "''",
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            background: 'rgba(0, 0, 0, 0.45)'
        }
    }
});

const viewNamesObj = {
    day: {
        title: 'Day',
        icon: 'view_day'
    },
    agenda: {
        title: 'Agenda',
        icon: 'view_agenda'
    }
};

class CalendarHeader extends Toolbar {

    viewButtons() {
        let viewNames = this.props.views;
        const view = this.props.view;

        if (viewNames.length > 1) {
            return Object.keys(viewNamesObj).map(name => (
                <Tooltip title={viewNamesObj[name].title} key={name}>
                    <div>
                        <FuseAnimate animation="transition.expandIn" delay={500}>
                            <IconButton
                                aria-label={name}
                                onClick={() => this.props.onView(name)}
                                disabled={view === name}
                            >
                                <Icon>{viewNamesObj[name].icon}</Icon>
                            </IconButton>
                        </FuseAnimate>
                    </div>
                </Tooltip>
            )
            )
        }
    }

    render() {
        const { classes, mainThemeDark, label, date } = this.props;

        return (
            <ThemeProvider theme={mainThemeDark}>

                <div className={clsx(classes.root, "flex h-100 min-h-100 relative")}>

                    <div className="flex flex-1 flex-col p-12 justify-between z-10 container">

                        <div className="flex flex-col items-center justify-between sm:flex-row">
                            <div className="flex items-center">
                                {this.viewButtons()}
                            </div>
                        </div>

                        <FuseAnimate delay={500}>
                            <div className="flex items-center justify-center">
                                <Typography variant="h6">{label}</Typography>
                                <div className="self-end">
                                    <Button
                                        onClick={() => this.props.setDefaultStep()}
                                    >
                                        Reset Zoom
                                </Button>
                                </div>
                            </div>
                        </FuseAnimate>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

function mapStateToProps({ fuse }) {
    return {
        mainThemeDark: fuse.settings.mainThemeDark
    }
}

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CalendarHeader));

