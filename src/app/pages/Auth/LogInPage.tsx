import React, {FC, useContext, useEffect, useState} from 'react';
import {Button, Form, Input} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import {CardPageContainer, LoginCard} from 'styles/shared';
import {useMutation} from "@apollo/react-hooks";
import {GlobalContext} from "context/globalContext";

const LOGIN = require('../../graphql/mutations/LOGIN.gql')
const LogInPage: FC<any> = (props) => {
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const {setUserId, setDisplayName} = useContext(GlobalContext)
    const [login, {data}] = useMutation(LOGIN)

    useEffect(() => {
        const user = data && data.login
        if (user) {
            localStorage.setItem('accessToken', user.accessToken);
            setUserId(user.userId);
            setDisplayName(user.displayName);
            props.history.push('/profile');
            window.location.reload();
        }
    }, [data, props.history, setUserId, setDisplayName]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        login({variables: {email, password}})
    }

    return (
        <CardPageContainer>
            <LoginCard>
                <h1>Log In</h1>
                <Form error onSubmit={handleSubmit}>
                    <Form.Field>
                        <label htmlFor='email'>E-Mail</label>
                        <Input name={'email'} value={email} onChange={(e, {value}) => changeEmail(value)}/>
                    </Form.Field>
                    <Form.Field>
                        <label htmlFor='password'>Password</label>
                        <Input name={'password'} type={'password'} value={password} onChange={(e, {value}) => changePassword(value)}/>
                    </Form.Field>
                    {/* TODO: ADD ERROR MESSAGING */}
                    {/*{props.error*/}
                    {/*    ? (<Message*/}
                    {/*        error*/}
                    {/*        header='Log-In Error'*/}
                    {/*        content={props.error}*/}
                    {/*    />) : null*/}
                    {/*}*/}
                    <div>
                        <Link to={'/passwordReset'}>Forgot Password?</Link>
                    </div>
                    <Button type='submit'>Log In</Button>
                </Form>
            </LoginCard>
        </CardPageContainer>
    );
};

export default withRouter(LogInPage);
