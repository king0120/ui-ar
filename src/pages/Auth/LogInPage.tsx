import React, {FC, useState} from 'react';
import {Button, Form, Input, Message} from 'semantic-ui-react';

import {connect} from 'react-redux';
import {logIn} from '../../actions/authActions';
import {Link, withRouter} from 'react-router-dom';
import {CardPageContainer, LoginCard} from '../../styles/shared';

const LogInPage: FC<any> = (props) => {
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    async function handleSubmit(e: any) {
        e.preventDefault();
        await props.logIn({email, password});
        props.history.push('/profile');
    }

    return (
        <CardPageContainer>
            <LoginCard>
                <h1>LogIn</h1>
                <Form error onSubmit={handleSubmit}>
                    <Form.Field>
                        <label htmlFor='email'>E-Mail</label>
                        <Input name={'email'} value={email} onChange={(e, {value}) => changeEmail(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='password'>Password</label>
                        <Input name={'password'} type={'password'} value={password} onChange={(e, {value}) => changePassword(value)}/>
                    </Form.Field>
                    {props.error
                        ? (<Message
                            error
                            header='Log-In Error'
                            content={props.error}
                        />) : null
                    }
                    <div>
                        <Link to={'/passwordReset'}>Forgot Password?</Link>
                    </div>
                    <Button type='submit'>Log In</Button>
                </Form>
            </LoginCard>
        </CardPageContainer>
    );
};

const mapStateToProps = (state: any) => ({
    error: state.user.error
});

export default connect(mapStateToProps, {logIn})(withRouter(LogInPage));
