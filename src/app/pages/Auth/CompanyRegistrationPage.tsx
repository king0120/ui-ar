import React, {useContext} from 'react';
import {Button, Card, CardContent, FormControl, MenuItem, Typography} from '@material-ui/core';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {useAuthStyles, Animate, AuthPageSplash} from './SharedAuth'
import AddressInput from 'app/components/shared/AddressInput';
import {Formik, Form, Field} from 'formik'
import {CheckboxWithLabel, TextField} from 'formik-material-ui'
import * as Yup from 'yup'
import arAxios from 'utils/axiosHelper';
import {GlobalContext} from 'context/globalContext';
import {FormikTextField} from '../../components/shared/FormikTextField';
import {useSnackbar} from "notistack";
import TermsAndConditions from "./TermsAndConditions";

const ranges = [
    {
        value: 'nonprofit',
        label: 'Non-Profit Theatre',
    },
    {
        value: 'forProfit',
        label: 'For-Profit Theatre',
    },
    {
        value: 'filmAndTelevision',
        label: 'TV & Film',
    },
    {
        value: 'talentAgency',
        label: 'Talent Agency',
    },
];

const initialValues = {
    companyName: '',
    companyType: 'nonprofit',
    companyCity: '',
    companyState: '',
    companyEin: '',
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
    companyName: Yup.string().required('Required'),
    companyType: Yup.string().oneOf(['nonprofit', 'forProfit', 'filmAndTelevision', 'talentAgency']).required('Required'),
    companyCity: Yup.string().required('Required'),
    companyState: Yup.string().required('Required'),
    companyEin: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Please Enter A Valid Email'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters').max(30, 'Password must be under 30 characters'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: Yup.boolean().oneOf([true], 'Please Review Terms and Conditions')
});

function CompanyRegistrationPage(props: any) {
    const classes = useAuthStyles();
    const {setUserId, setDisplayName} = useContext(GlobalContext)
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false)
    const handleClose = () => {
        setOpen(false);
    };
    async function handleSubmit(values: any) {
        try {
            const {
                email, password, firstName, lastName, city, state, companyName,
                companyType, companyCity, companyState, companyEin
            } = values;
            const {data} = await arAxios.post('/auth/register-company', {
                user: {email, password, firstName, lastName, city, state},
                company: {
                    name: companyName,
                    type: companyType,
                    city: companyCity,
                    state: companyState,
                    ein: companyEin
                }
            })
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                await setUserId(data.userId);
                await setDisplayName(data.displayName);
                props.history.push('/profile');
                window.location.reload();
            }
        } catch (err) {
            enqueueSnackbar("Email Already Registerd", {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
        }
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0")}>
            <TermsAndConditions open={open} onClose={handleClose}/>
            <AuthPageSplash/>

            <Animate animation={{translateX: [0, '100%']}}>

                <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                    <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 ">

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
                                    <h1>Company Info</h1>
                                    <FormikTextField
                                        type="text"
                                        name="companyName"
                                        label="Company Name"
                                    />
                                    <Field
                                        component={TextField}
                                        type="text"
                                        name="select"
                                        label="Company Type"
                                        select
                                        variant="outlined"
                                        className={'mb-16'}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    >
                                        {ranges.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                    <AddressInput
                                        placeholder={``}
                                        handleChange={(city: string, state: string) => {
                                            props.setFieldValue('city', city)
                                            props.setFieldValue('state', state)
                                            props.setFieldValue('companyCity', city)
                                            props.setFieldValue('companyState', state)
                                        }}
                                    />
                                    <FormikTextField
                                        type="text"
                                        name="companyEin"
                                        label="EIN Number"
                                    />
                                    <h1>User Info</h1>
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
                                            Label={{label: (
                                                    <span>I read and accept <a onClick={() => setOpen(true)}>terms and conditions</a></span>)
                                            }}
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

export default CompanyRegistrationPage;
