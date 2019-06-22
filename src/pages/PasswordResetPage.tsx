import React, {useState} from 'react';
import {CardPageContainer, LoginCard} from '../styles/shared';
import {Button, Form, Input} from 'semantic-ui-react';
import arAxios from '../axiosHelper';

const PasswordResetPage = (props: any) => {
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [passwordConfirmation, changePasswordConfirmation] = useState('');
    const handleSubmit = async () => {
        if (!props.match.params.token) {
            await arAxios.post('/auth/passwordReset', {email});
        } else {
            const passwordResetToken = props.match.params.token;
            const expiresToken = props.location.search.split('=')[1];
            await arAxios.post(`/auth/passwordReset/${passwordResetToken}?resetPasswordExpires=${expiresToken}`, {password});
            props.history.push('/');
        }
    };
    return (
        <CardPageContainer>
            <LoginCard>
                <h1>Password Reset</h1>
                <Form error onSubmit={handleSubmit}>
                    <Form.Field>
                        <label htmlFor='email'>E-Mail</label>
                        <Input name={'email'} value={email} onChange={(e, {value}) => changeEmail(value)}/>
                    </Form.Field>
                    {
                        props.match.params.token && (
                            <>
                                <Form.Field>
                                    <label htmlFor='password'>New Password</label>
                                    <Input name={'password'} value={password} onChange={(e, {value}) => changePassword(value)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='passwordConfirmation'>Confirm New Password</label>
                                    <Input name={'passwordConfirmation'} value={passwordConfirmation}
                                           onChange={(e, {value}) => changePasswordConfirmation(value)}/>
                                </Form.Field>
                            </>
                        )
                    }
                    <Button type='submit'>Send Password Reset Email</Button>
                </Form>
            </LoginCard>
        </CardPageContainer>
    );
};

export default PasswordResetPage;
