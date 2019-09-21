import React, {useContext, useEffect, useState} from 'react';
import NavBar from './app/components/shared/Header';
import Router from './Router';
import {BrowserRouter, withRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {GlobalContext} from './context/globalContext';
import {create} from 'jss';
import jssExtend from 'jss-extend';
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/styles';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import theme from 'defaultTheme';
import {createMuiTheme} from '@material-ui/core';

const token = localStorage.getItem('accessToken');
const TOKEN_CHECK = require('./graphql/queries/TOKEN_CHECK.gql');

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

declare const Chargebee: any;
const App = (props: any) => {
    const {data, loading} = useQuery(TOKEN_CHECK);
    const {setUserId, setDisplayName} = useContext(GlobalContext);
    const [isHome, setIsHome] = useState(true);

    const muiTheme = createMuiTheme(theme)

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
        return <h1>Loading</h1>;
    } else {
        return (
            <>
                <StylesProvider jss={jss} generateClassName={generateClassName}>
                    <ThemeProvider theme={muiTheme}>
                    <NavBar/>
                    <div style={{marginTop: isHome ? 0 : 80}}>
                        <Router/>
                    </div>
                    </ThemeProvider>
                </StylesProvider>
            </>);
    }
};

const WithRouter = withRouter(App);
const WithApollo = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <WithRouter/>
        </BrowserRouter>
    </ApolloProvider>
);

export default WithApollo;
