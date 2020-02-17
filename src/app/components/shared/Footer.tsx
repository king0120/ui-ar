import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {GlobalContext} from "../../../context/globalContext";
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@material-ui/styles';
import {
    AppBar, createStyles, makeStyles, Theme,
    Toolbar,
    Typography
} from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            top: 'auto',
            bottom: 0,
            position: "initial"
        }
    }),
);

const Footer = (props: any) => {
    const classes = useStyles();
    const toolbarTheme = useSelector<any, any>(({fuse}) => fuse.settings.toolbarTheme);
    return (
        <ThemeProvider theme={toolbarTheme}>
            <AppBar position={"relative"} className={classes.appBar} >
                <Toolbar className="p-0">
                    <div className="flex justify-between w-full pl-5 pr-5">
                        <Typography variant={"body2"}>Audition Revolution.v2 Beta</Typography>
                        <Typography variant={"body2"}>Contact Support: support@auditionrevolution.com</Typography>
                    </div>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
};

const HooksWrapper = (props: any) => {
    const {userId, displayName} = useContext(GlobalContext);
    return <Footer {...props} userId={userId} displayName={displayName}/>
};

export default withRouter(HooksWrapper);