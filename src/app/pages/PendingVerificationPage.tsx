import React from 'react';
import {Button, Card, CardContent, Theme, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import {Animate} from "./Auth/SharedAuth";
import ARLogo from '../../static/AR_Logo.png';
import arAxios from '../../utils/axiosHelper';
import {useSnackbar} from 'notistack';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color: theme.palette.primary.contrastText
    }
}));

interface PendingVerificationProps {
    type: 'actor' | 'company'
}

function PendingVerificationPage(props: PendingVerificationProps) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    function sendVerificationEmail(){
        arAxios.get('/auth/resendVerification')
        enqueueSnackbar("Sent New Verification Email", {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right',
            }
        });
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <Animate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32 text-center">

                            <img className="m-32" src={ARLogo} alt="logo"/>

                            <Typography variant="subtitle1" className="mb-16">
                                Thank you for joining Audition Revolution!
                            </Typography>

                            {props.type === 'company' && (
                                <>
                                    <Typography color="textSecondary" className="max-w-288">
                                        You’re almost there! We just sent an email to verify your account. You should
                                        receive it soon - be on the lookout!
                                    </Typography>
                                    <Typography color="textSecondary" className="max-w-288">
                                        Our Team will be in touch with you soon!
                                    </Typography>
                                </>
                            )}
                            {props.type === 'actor' && (
                                <>
                                    <Typography color="textSecondary" className="max-w-288">
                                        You’re almost there! We just sent an email to verify your account. You should
                                        receive it soon - be on the lookout!
                                    </Typography>
                                    <br/>
                                    <Typography color="textSecondary" className="max-w-288">
                                        To be sure you receive all notifications from Audition Revolution, whitelist
                                        support@auditionrevolution.com and check your spam and promotions folder.
                                    </Typography>

                                    <Button variant="contained" size="small" color="primary" onClick={() => sendVerificationEmail()}>Resend Verification Email</Button>
                                </>
                            )}

                        </CardContent>
                    </Card>
                </Animate>
            </div>
        </div>
    );
}

export default PendingVerificationPage;
