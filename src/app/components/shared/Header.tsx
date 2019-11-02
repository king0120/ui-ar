import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { GlobalContext } from "../../../context/globalContext";
import makeStyles from '@material-ui/styles/makeStyles';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';

const useStyles = makeStyles((theme: any) => ({
    separator: {
        width: 1,
        height: 64,
        backgroundColor: theme.palette.divider
    }
}));

const Header = (props: any) => {
    const { userType } = useContext(GlobalContext)
    const toolbarTheme = useSelector<any, any>(({ fuse }) => fuse.settings.toolbarTheme);

    const classes = useStyles(props);
    if (props.location.pathname === "/" || props.location.pathname === "/login" || props.location.pathname === "/register" || props.location.pathname === "/passwordReset") {
        return null
    }

    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
                <Toolbar className="p-0">
                    <div className="flex flex-1">

                    </div>

                    <div className="flex">
                        {
                            userType.includes('theatre') && (
                                <>
                                    <Button onClick={() => props.history.push('/search/actor')}>Actor Search</Button>
                                    <div className={classes.separator} />
                                </>
                            )
                        }
                        {
                            userType.includes('actor') && (
                                <>
                                    <Button onClick={() => props.history.push('/search/audition')}>Audition Search</Button>
                                    <div className={classes.separator} />
                                </>
                            )
                        }
                        <UserMenu />
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

const HooksWrapper = (props: any) => {
    const { userId, displayName } = useContext(GlobalContext);
    return <Header {...props} userId={userId} displayName={displayName} />
}

export default withRouter(HooksWrapper);