import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Input } from 'semantic-ui-react';

import {connect} from 'react-redux';
import {register} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import {LoginCard} from '../../styles/shared';
import {CardPageContainer} from '../../styles/shared';
import AddressInput from '../../components/shared/AddressInput';

const RegistrationPage: FC<any> = (props) => {
    const [firstName, changeFirstName] = useState('');
    const [lastName, changeLastName] = useState('');
    const [city, changeCity] = useState('');
    const [state, changeState] = useState('');
    const [website, changeWebsite] = useState('');
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [passwordConfirmation, changePasswordConfirmation] = useState('');
    const [phoneNumber, changePhoneNumber] = useState('');
    const [_error, changeError] = useState('');

    useEffect(() => {
        changeError(props.error);
    }, [props.error]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            changeError('Passwords Do Not Match');
        } else {
            // TODO: Add change gender
            try {
                await props.register({email, password, firstName, lastName, city, state, phoneNumber, gender: 'male'});
                props.history.push('/organization');
            } catch (err) {
            }
        }
    }

    return (
        <CardPageContainer>
            <LoginCard>
                <h1>Create A New Account</h1>
                <Form error onSubmit={handleSubmit}>
                    <AddressInput />
                    <Form.Field>
                        <label htmlFor='firstName'>First Name</label>
                        <Input name={'firstName'} value={firstName} onChange={(e, {value}) => changeFirstName(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='lastName'>Last Name</label>
                        <Input name={'lastName'} value={lastName} onChange={(e, {value}) => changeLastName(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='city'>City</label>
                        <Input name={'city'} value={city} onChange={(e, {value}) => changeCity(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='state'>State</label>
                        <Input name={'state'} value={state} onChange={(e, {value}) => changeState(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <Input name={'phoneNumber'} value={phoneNumber} onChange={(e, {value}) => changePhoneNumber(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='website'>WebSite</label>
                        <Input name={'website'} value={website} onChange={(e, {value}) => changeWebsite(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='email'>E-Mail</label>
                        <Input name={'email'} value={email} onChange={(e, {value}) => changeEmail(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='password'>Password</label>
                        <Input name={'password'} type={'password'} value={password} onChange={(e, {value}) => changePassword(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='passwordConfirmation'>Confirm Password</label>
                        <Input name={'passwordConfirmation'} type={'password'} value={passwordConfirmation}
                               onChange={(e, {value}) => changePasswordConfirmation(value)}/>
                    </Form.Field>
                    {/* TODO: ADD HANDLE ERROR */}
                    {/*{error*/}
                    {/*    ? (<Message*/}
                    {/*        error*/}
                    {/*        header='Registration Error'*/}
                    {/*        content={error}*/}
                    {/*    />) : null*/}
                    {/*}*/}

                    <Button type='submit'>Register</Button>
                </Form>
            </LoginCard>
        </CardPageContainer>
    );
};

export default connect(null, {register})(withRouter(RegistrationPage));
