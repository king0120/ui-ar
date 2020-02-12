import React from 'react';
import {Button, Card, CardContent, Divider, TextField, Theme, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import {useForm} from '@fuse/hooks';
import clsx from 'clsx';
import {Animate} from "./Auth/SharedAuth";
import ARLogo from '../../static/AR_Logo.png';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
}));

function PendingVerificationPage()
{
    const classes = useStyles();

    const {form, handleChange, resetForm} = useForm({
        email: ''
    });

    function isFormValid()
    {
        return form.email.length > 0;
    }

    function handleSubmit(ev: any)
    {
        ev.preventDefault();
        resetForm();
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}>

            <div className="flex flex-col items-center justify-center w-full">

                <Animate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32 text-center">

                            <img className="m-32" src={ARLogo} alt="logo"/>

                            <Typography variant="subtitle1" className="mb-16">
                                Thank you for joining the Audition Revolution!
                            </Typography>

                            <Typography color="textSecondary" className="max-w-288">
                                We are still verifying your company's request to access our data.
                            </Typography>

                            <Typography color="textSecondary" className="max-w-288">
                                Our Team will be in touch with you soon!
                            </Typography>

                        </CardContent>
                    </Card>
                </Animate>
            </div>
        </div>
    );
}

export default PendingVerificationPage;
