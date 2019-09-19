import React, {useContext, useEffect, useState} from 'react';
import NavBar from './app/components/shared/Header';
import Router from './Router';
import {BrowserRouter, withRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import {GlobalContext} from './context/globalContext';

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

declare const Chargebee: any;
const App = (props: any) => {
    const {data, loading} = useQuery(TOKEN_CHECK);
    const {setUserId, setDisplayName} = useContext(GlobalContext);
    const [isHome, setIsHome] = useState(true);

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
                <NavBar/>
                <div style={{marginTop: isHome ? 0 : 80}}>
                    <Router/>
                </div>
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
