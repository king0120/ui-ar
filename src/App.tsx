import React, { useContext, useEffect } from 'react';
import Router from './Router';
import NavBar from './app/components/shared/Header';
import Footer from './app/components/shared/Footer';
import { BrowserRouter, withRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { GlobalContext } from './context/globalContext';
import { create } from 'jss';
import jssExtend from 'jss-extend';
import { jssPreset, StylesProvider, makeStyles } from '@material-ui/styles';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import clsx from 'clsx';
import FuseScrollbars from 'vendor/@fuse/components/FuseScrollbars/FuseScrollbars';
import FuseTheme from 'vendor/@fuse/components/FuseTheme/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Button, LinearProgress, Typography } from '@material-ui/core';

const token = localStorage.getItem('accessToken');
const TOKEN_CHECK = require('./graphql/queries/TOKEN_CHECK.gql');

const ScrollBars: any = FuseScrollbars;
const client = new ApolloClient({
  headers: {
    Authorization: token ? `Bearer ${token}` : ''
  },
  uri:
    process.env.NODE_ENV === 'production'
      ? 'https://aud-rev-test.herokuapp.com/graphql'
      : undefined,
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
  insertionPoint: document.getElementById('jss-insertion-point') as any
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
      margin: '0 auto'
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

const App = (props: any) => {
  const { data, loading } = useQuery(TOKEN_CHECK);
  const {
    setUserId,
    setDisplayName,
    setUserType,
    setTheatreVerified,
    setVerified
  } = useContext(GlobalContext);
  const classes = useStyles(props);

  useEffect(() => {
    if (data && data.tokenCheck) {
      setUserId(data.tokenCheck.id);
      setUserType(data.tokenCheck.userType);
      setDisplayName(data.tokenCheck.displayName);
      setVerified(data.tokenCheck.verified);
      setTheatreVerified(data.tokenCheck.theatreVerified);
    } else if (!loading && !data) {
      setUserId('none');
    }
  }, [data, setUserId, loading, setUserType, setDisplayName]);
  if (loading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Typography className="text-20 mb-16" color="textSecondary">
          Loading...
        </Typography>
        <LinearProgress className="w-xs" color="secondary" />
      </div>
    );
  } else {
    return (
      <>
        <StylesProvider jss={jss} generateClassName={generateClassName}>
          <FuseTheme>
            <SnackbarProvider
              ref={notistackRef}
              maxSnack={5}
              action={(key: string) => (
                <Button onClick={onClickDismiss(key)}>Close</Button>
              )}
            >
              <div id="fuse-layout" className={clsx(classes.root)}>
                <div className="flex flex-1 flex-col overflow-hidden relative">
                  <ScrollBars
                    className={classes.content}
                    scrollToTopOnRouteChange
                  >
                    <NavBar />
                    <div className="flex-grow-1 flex flex-auto flex-col relative">
                      <Router />
                    </div>
                    <Footer />
                  </ScrollBars>
                </div>
              </div>
            </SnackbarProvider>
          </FuseTheme>
        </StylesProvider>
      </>
    );
  }
};
const notistackRef = React.createRef();
const onClickDismiss = (key: string) => () => {
  // @ts-ignore
  notistackRef.current.closeSnackbar(key);
};
const WithRouter = withRouter(App);
const WithApollo = () => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <WithRouter />
      </BrowserRouter>
    </ApolloProvider>
  </MuiPickersUtilsProvider>
);

export default WithApollo;
