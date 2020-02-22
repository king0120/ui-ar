import React, { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuthStyles, Animate, AuthPageSplash } from './SharedAuth'
import arAxios from 'utils/axiosHelper';
import {useSnackbar} from 'notistack';

function PasswordResetPage(props: any) {
    const classes = useAuthStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [error, setError] = useState(false)
    const { form, handleChange, resetForm } = useForm({
        email: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    function isFormValid() {
        if (props.match.params.token) {
            return form.email.length > 0 && form.newPassword.length > 0 && form.newPassword === form.confirmNewPassword;
        } else {
            return form.email.length > 0;
        }

    }

    const handleSubmit = async (ev: any) => {
        ev.preventDefault();
        setError(false)
        resetForm();
        try {
            if (!props.match.params.token) {
                await arAxios.post('/auth/passwordReset', { email: form.email });
                props.history.push('/')
                enqueueSnackbar('Password Reset Email Sent. Please check your e-mail.', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            } else {
                const passwordResetToken = props.match.params.token;
                const expiresToken = props.location.search.split('=')[1];
                await arAxios.post(`/auth/passwordReset/${passwordResetToken}?resetPasswordExpires=${expiresToken}`, { password: form.newPassword });
                props.history.push('/login');
            }
        } catch (e) {
            setError(true)
        }
    };

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <AuthPageSplash />

            <Animate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">RESET YOUR PASSWORD</Typography>

                        <form
                            name="recoverForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >

                            <TextField
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
                            {
                                props.match.params.token && (
                                    <>
                                        <TextField
                                            className="mb-16"
                                            label="New Password"
                                            autoFocus
                                            type="password"
                                            name="newPassword"
                                            value={form.newPassword}
                                            onChange={handleChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                        <TextField
                                            className="mb-16"
                                            label="Confirm New Password"
                                            autoFocus
                                            type="password"
                                            name="confirmNewPassword"
                                            value={form.confirmNewPassword}
                                            onChange={handleChange}
                                            variant="outlined"
                                            required
                                            fullWidth
                                        />
                                    </>
                                )
                            }
                            {
                                error && (
                                    <h1>uh oh</h1>
                                    // <Message negative>
                                    //     <Message.Header>Bad Request</Message.Header>
                                    //     <p>Please Try Again</p>
                                    // </Message>
                                )
                            }

                            <Button
                                variant="contained"
                                color="primary"
                                className="w-224 mx-auto mt-16"
                                aria-label="Reset"
                                disabled={!isFormValid()}
                                type="submit"
                            >
                                {props.match.params.token ? "Set New Password" : "RESET PASSWORD" }
                            </Button>

                        </form>


                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <Link className="font-medium" to="/login">Go back to login</Link>
                        </div>

                    </CardContent>
                </Card>
            </Animate>
        </div>
    );
}

export default PasswordResetPage;
