import React, { useContext } from 'react';
import { Button, Card, CardContent, FormControl, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { useAuthStyles, Animate, AuthPageSplash } from './SharedAuth'
import AddressInput from 'app/components/shared/AddressInput';
import { Formik, Form, Field } from 'formik'
import { CheckboxWithLabel } from 'formik-material-ui'
import * as Yup from 'yup'
import arAxios from 'utils/axiosHelper';
import { GlobalContext } from 'context/globalContext';
import { FormikTextField } from '../../components/shared/FormikTextField';

const initialValues = {
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Please Enter A Valid Email'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters').max(30, 'Password must be under 30 characters'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: Yup.boolean().oneOf([true], 'Please Review Terms and Conditions')
})

function RegistrationPage(props: any) {
    const classes = useAuthStyles();
    const { setUserId, setDisplayName } = useContext(GlobalContext)

    async function handleSubmit(values: any) {
        try {
            const { email, password, firstName, lastName, city, state } = values;
            const { data } = await arAxios.post('/auth/register', { email, password, firstName, lastName, city, state })
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                await setUserId(data.userId);
                await setDisplayName(data.displayName);
                props.history.push('/profile');
                window.location.reload();
            }
        } catch (err) {
        }
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>

            <AuthPageSplash />

            <Animate animation={{ translateX: [0, '100%'] }}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                        <Typography variant="h6" className="md:w-full mb-32">CREATE AN ACCOUNT</Typography>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {props => (
                                <Form
                                    name="registerForm"
                                    className="flex flex-col justify-center w-full"
                                >
                                    <FormikTextField
                                        type="text"
                                        name="firstName"
                                        label="First Name"
                                    />
                                    <FormikTextField
                                        type="text"
                                        name="lastName"
                                        label="Last Name"
                                    />
                                    <AddressInput
                                        value={''}
                                        handleChange={(city: string, state: string) => {
                                            props.setFieldValue('city', city)
                                            props.setFieldValue('state', state)
                                        }}
                                    />
                                    <FormikTextField
                                        type="email"
                                        name="email"
                                        label="Email"
                                    />
                                    <FormikTextField
                                        type="password"
                                        name="password"
                                        label="Password"
                                    />
                                    <FormikTextField
                                        label="Password (Confirm)"
                                        type="password"
                                        name="passwordConfirm"

                                    />
                                    <FormControl className="items-center">
                                        <Field
                                            Label={{ label: 'I read and accept terms and conditions' }}
                                            name="acceptTermsConditions"
                                            id="termsAndConditions"
                                            component={CheckboxWithLabel}
                                        />
                                    </FormControl>

                                    <Button
                                        id="createAccount"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16"
                                        aria-label="Register"
                                        disabled={!props.isValid}
                                        type="submit"
                                    >
                                        CREATE AN ACCOUNT
                            </Button>

                                </Form>
                            )}
                        </Formik>
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

export default RegistrationPage;
