import React from 'react';
import { Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuthStyles, Animate, AuthPageSplash } from './SharedAuth'
import AddressInput from 'app/components/shared/AddressInput';
import { connect } from 'react-redux';
import {register} from 'redux/actions/authActions'

function RegistrationPage(props: any) {
    const classes = useAuthStyles();

    const { form, handleChange, resetForm, setInForm } = useForm({
        firstName: '',
        lastName: '',
        city: '',
        state: '',
        email: '',
        password: '',
        passwordConfirm: '',
        acceptTermsConditions: false
    });

    function isFormValid() {
        return (
            form.firstName.length > 0 &&
            form.lastName.length > 0 &&
            form.email.length > 0 &&
            form.password.length > 0 &&
            form.password.length > 3 &&
            form.city.length > 0 &&
            form.state.length > 0 &&
            form.password === form.passwordConfirm &&
            form.acceptTermsConditions
        );
    }

    async function handleSubmit(ev: any) {
        ev.preventDefault();
        try {
            console.log("SUBMIT")
            const { email, password, firstName, lastName, city, state } = form;
            await props.register({ email, password, firstName, lastName, city, state, phoneNumber: '1111111111', gender: 'male' });
            resetForm();
            props.history.push('/profile');
        } catch (err) {
        }
    }
    console.log(form)
    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <AuthPageSplash />

            <Animate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">CREATE AN ACCOUNT</Typography>

                        <form
                            name="registerForm"
                            noValidate
                            className="flex flex-col justify-center w-full"
                            onSubmit={handleSubmit}
                        >

                            <TextField
                                className="mb-16"
                                label="First Name"
                                autoFocus
                                type="firstName"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />

                            <TextField
                                className="mb-16"
                                label="Last Name"
                                autoFocus
                                type="lastName"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                            <AddressInput
                                value={form.address}
                                handleChange={(city: string, state: string) => {
                                    setInForm('city', city)
                                    setInForm('state', state)
                                }}
                            />
                            <TextField
                                className="mb-16"
                                label="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <TextField
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

                            <TextField
                                className="mb-16"
                                label="Password (Confirm)"
                                type="password"
                                name="passwordConfirm"
                                value={form.passwordConfirm}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                            />

                            <FormControl className="items-center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="acceptTermsConditions"
                                            checked={form.acceptTermsConditions}
                                            onChange={handleChange} />
                                    }
                                    label="I read and accept terms and conditions"
                                />
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                className="w-full mx-auto mt-16"
                                aria-label="Register"
                                disabled={!isFormValid()}
                                type="submit"
                            >
                                CREATE AN ACCOUNT
                            </Button>

                        </form>

                        <div className="flex flex-col items-center justify-center pt-32 pb-24">
                            <span className="font-medium">Already have an account?</span>
                            <Link className="font-medium" to="/login">Login</Link>
                        </div>

                    </CardContent>
                </Card>
            </Animate>
        </div>
    );
}

export default connect(null, {register})(RegistrationPage);
