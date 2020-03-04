import React, { useContext, useEffect } from 'react';
import { Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { useForm } from 'vendor/@fuse/hooks';
import { useMutation } from "@apollo/react-hooks";
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { GlobalContext } from 'context/globalContext';
import { useAuthStyles, Animate, AuthPageSplash } from './SharedAuth'
import { useSnackbar } from 'notistack'
import { ApolloError } from 'apollo-boost';

const LOGIN = require('../../../graphql/mutations/LOGIN.gql')

function Login2Page(props: any) {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useAuthStyles();
    const { setUserId, setDisplayName } = useContext(GlobalContext)
    const [login, { data }] = useMutation(LOGIN, {
        onCompleted: () => {
            resetForm();
        },
        onError: (error: ApolloError) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
        }
    })
    const { form, handleChange, resetForm } = useForm({
        email: '',
        password: '',
        remember: true
    });

    function isFormValid() {
        return (
            form.email.length > 0 &&
            form.password.length > 0
        );
    }

    useEffect(() => {
        const user = data && data.login
        if (user) {
            localStorage.setItem('accessToken', user.accessToken);
            setUserId(user.userId);
            setDisplayName(user.displayName);
            props.history.push('/profile');
            window.location.reload();
        }
    }, [data, setUserId, setDisplayName, props.history]);

    function handleSubmit(ev: any) {
        ev.preventDefault();
        const { email, password } = form;
        login({ variables: { email, password } })
    }

    // @ts-ignore
    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <AuthPageSplash />
            <Animate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">LOGIN TO YOUR ACCOUNT</Typography>

                        <form
                            name="loginForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                id="login-email"
                                className="mb-16"
                                label="Email"
                                autoFocus
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextField
                                id="login-password"
                                className="mb-16"
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <div className="flex items-center justify-between">

                                <FormControl>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="remember"
                                                checked={form.remember}
                                                onChange={handleChange} />
                                        }
                                        label="Remember Me"
                                    />
                                </FormControl>

                                <Link className="font-medium" to={'/passwordReset'}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="LOG IN"
                                disabled={!isFormValid()}
                            >
                                LOGIN
                            </Button>

                        </form>

                        <div className="my-24 flex items-center justify-center">
                            <Divider className="w-32" />
                            <span className="mx-8 font-bold">OR</span>
                            <Divider className="w-32" />
                        </div>

                        {/* <Button variant="contained" color="secondary" size="small"
                                className="normal-case w-192 mb-8">
                            Log in with Google
                        </Button>

                        <Button variant="contained" color="primary" size="small"
                                className="normal-case w-192">
                            Log in with Facebook
                        </Button> */}

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Don't have an account?</span>
                            <Link className="font-medium" to="/register">Actor? Create an account</Link>
                            <Link className="font-medium" to="/register-company">Company? Request Access</Link>
                        </div>

                    </CardContent>
                </Card>
            </Animate>
        </div>
    );
}

export default Login2Page;
