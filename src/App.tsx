import React, {Component} from 'react';
import NavBar from './components/Header';
import Router from './Router';
import {BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {tokenCheck} from './actions/auth/authThunkActions';

class App extends Component<any> {
    componentDidMount(): void {
        this.props.tokenCheck();
    }

    render() {
        if (!this.props.loaded) {
            return <h1>Loading</h1>;
        }
        return (
            <BrowserRouter>
                <NavBar/>
                <Router/>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        loaded: state.user.initToken
    };
};
export default connect(mapStateToProps, {tokenCheck})(App);
