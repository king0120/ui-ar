import React, { useContext, useEffect, useState } from 'react';
import NavBar from './app/components/shared/Header';
import Router from './Router';
import { BrowserRouter, withRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { GlobalContext } from './context/globalContext';
import { create } from 'jss';
import jssExtend from 'jss-extend';
import { jssPreset, StylesProvider, makeStyles } from '@material-ui/styles';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import theme from 'defaultTheme';
import { createMuiTheme } from '@material-ui/core';
import clsx from 'clsx';
import FuseDialog from '@fuse/components/FuseDialog/FuseDialog';
import FuseScrollbars from '@fuse/components/FuseScrollbars/FuseScrollbars';
import FuseTheme from '@fuse/components/FuseTheme/FuseTheme';
import { FuseLoading } from '@fuse';

const token = localStorage.getItem('accessToken');
const TOKEN_CHECK = require('./graphql/queries/TOKEN_CHECK.gql');

const ScrollBars: any = FuseScrollbars;
const client = new ApolloClient({
    headers: {
        'Authorization': token ? `Bearer ${token}` : '',
    },
    uri: process.env.NODE_ENV === 'production' ? 'https://aud-rev-test.herokuapp.com/graphql' : undefined,
    clientState: {
        defaults: {},
        resolvers: {},
        typeDefs: ``
    }
});

// @ts-ignore
const jss = create({
    ...jssPreset(),
    plugins: [...jssPreset().plugins, jssExtend()],
    insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        '&.boxed': {
            maxWidth: 1280,
            margin: '0 auto',
        },
        '&.container': {
            '& .container': {
                maxWidth: 1120,
                width: '100%',
                margin: '0 auto'
            },
            '& .navigation': {}
        }
    },
    content: {
        display: 'flex',
        overflow: 'auto',
        flex: '1 1 auto',
        flexDirection: 'column',
        width: '100%',
        '-webkit-overflow-scrolling': 'touch',
        zIndex: 4
    },
    toolbarWrapper: {
        display: 'flex',
        position: 'relative',
        zIndex: 5
    },
    toolbar: {
        display: 'flex',
        flex: '1 0 auto'
    },
    footerWrapper: {
        position: 'relative',
        zIndex: 5
    },
    footer: {
        display: 'flex',
        flex: '1 0 auto'
    }
}));

declare const Chargebee: any;
const App = (props: any) => {
    const { data, loading } = useQuery(TOKEN_CHECK);
    const { setUserId, setDisplayName } = useContext(GlobalContext);
    const [isHome, setIsHome] = useState(true);

    const classes = useStyles(props);
    useEffect(() => {
        setIsHome(props.location.pathname === '/');
    }, [props.location.pathname]);

    useEffect(() => {
        if (data && data.tokenCheck) {
            setUserId(data.tokenCheck.id);
            setDisplayName(data.tokenCheck.displayName);
        } else if (!loading && !data) {
            setUserId('none');
        }
    }, [data, setUserId, loading, setDisplayName]);
    if (loading) {
        return <FuseLoading/>;
    } else {
        return (
            <>
                <StylesProvider jss={jss} generateClassName={generateClassName}>
                    <FuseTheme>
                        <div id="fuse-layout" className={clsx(classes.root)}>
                            <div className="flex flex-1 flex-col overflow-hidden relative">
                                <ScrollBars className={classes.content} scrollToTopOnRouteChange>
                                    <FuseDialog />
                                    <NavBar />
                                    <div className="flex flex-auto flex-col relative h-full">
                                        <Router />
                                    </div>
                                </ScrollBars>
                            </div>
                        </div>
                    </FuseTheme>
                </StylesProvider>
            </>);
    }
};

const WithRouter = withRouter(App);
const WithApollo = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <WithRouter />
        </BrowserRouter>
    </ApolloProvider>
);

export default WithApollo;
