import React from 'react';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles, Button, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import connect from 'react-redux/es/connect/connect';
import clsx from 'clsx';
import { Animate } from 'app/pages/Auth/SharedAuth';

const styles = () => ({
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

const viewNamesObj: { [a: string]: { title: string, icon: string } } = {
    day: {
        title: 'Day',
        icon: 'view_day'
    },
    agenda: {
        title: 'Agenda',
        icon: 'view_agenda'
    }
};

class CalendarHeader extends Toolbar<any> {

    viewButtons() {
        let viewNames = this.props.views;
        const view = this.props.view;


        if (viewNames.length > 1) {
            return Object.keys(viewNamesObj).map((name: string) => {
                const viewName: any = viewNamesObj[name]
                return (
                    <Tooltip title={viewName.title} key={name}>
                        <div>
                            <Animate animation="transition.expandIn" delay={500}>
                                <IconButton
                                    aria-label={name}
                                    onClick={() => this.props.onView(name)}
                                    disabled={view === name}
                                >
                                    <Icon>{viewName.icon}</Icon>
                                </IconButton>
                            </Animate>
                        </div>
                    </Tooltip>
                )
            })
        }
    }

    render() {
        const { classes, mainThemeDark, label } = this.props;

        return (
            <ThemeProvider theme={mainThemeDark}>

                <div className={clsx(classes.root, "flex h-100 min-h-100 relative")}>

                    <div className="flex flex-1 flex-col p-12 justify-between z-10 container">

                        <div className="flex flex-col items-center justify-between sm:flex-row">
                            <div className="flex items-center">
                                {this.viewButtons()}
                            </div>
                        </div>

                        <Animate delay={500}>
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
                        </Animate>
                    </div>
                </div>
            </ThemeProvider>
        )
    };
}

function mapStateToProps({ fuse }: any) {
    return {
        mainThemeDark: fuse.settings.mainThemeDark
    }
}

export default connect(mapStateToProps)(withStyles(styles as any, { withTheme: true })(CalendarHeader as any));

