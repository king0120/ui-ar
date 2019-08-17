import React, {useState} from 'react';
import {CardPageContainer, LoginCard} from '../../styles/shared';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import arAxios from '../../utils/axiosHelper';

const PasswordResetPage = (props: any) => {
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [passwordConfirmation, changePasswordConfirmation] = useState('');
    const [error, setError] = useState(false)

    const handleSubmit = async () => {
        setError(false)
        try {
            if (!props.match.params.token) {
                await arAxios.post('/auth/passwordReset', {email});
                props.history.push('/')
            } else {
                const passwordResetToken = props.match.params.token;
                const expiresToken = props.location.search.split('=')[1];
                await arAxios.post(`/auth/passwordReset/${passwordResetToken}?resetPasswordExpires=${expiresToken}`, {password});
                props.history.push('/login');
            }
        } catch (e) {
            setError(true)
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
                                    <Input type={'password'} name={'password'} value={password}
                                           onChange={(e, {value}) => changePassword(value)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor='passwordConfirmation'>Confirm New Password</label>
                                    <Input type={'password'} name={'passwordConfirmation'} value={passwordConfirmation}
                                           onChange={(e, {value}) => changePasswordConfirmation(value)}/>
                                </Form.Field>
                            </>
                        )
                    }
                    {error && (
                        <Message negative>
                            <Message.Header>Bad Request</Message.Header>
                            <p>Please Try Again</p>
                        </Message>
                    )}
                    <Button
                        type='submit'>{props.match.params.token ? "Send Password Reset Email" : "Set New Password"}</Button>
                </Form>
            </LoginCard>
        </CardPageContainer>
    );
};

export default PasswordResetPage;
