import React, {Component} from 'react';
import NavBar from './components/shared/Header';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {tokenCheck} from './actions/authActions';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const token = localStorage.getItem('access_token');

const client = new ApolloClient({
    headers: {
        'Authorization': token ? `Bearer ${token}` : "",
    }
});


class App extends Component<any> {
    componentDidMount(): void {
        this.props.tokenCheck();
    }

    render() {
        if (!this.props.loaded) {
            return <h1>Loading</h1>;
        }
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <NavBar/>
                    <Router/>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loaded: state.user.initToken
    };
};
export default connect(mapStateToProps, {tokenCheck})(App);
