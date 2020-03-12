import React from "react";
import {
    Button,
    Card,
    CardContent,
    Theme,
    Typography
} from "@material-ui/core";
import { darken } from "@material-ui/core/styles/colorManipulator";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { Animate } from "./SharedAuth";
import ARLogo from "../../../static/AR_Logo.png";
import arAxios from "../../../utils/axiosHelper";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        background:
            "radial-gradient(" +
            darken(theme.palette.primary.dark, 0.5) +
            " 0%, " +
            theme.palette.primary.dark +
            " 80%)",
        color: theme.palette.primary.contrastText
    }
}));

interface PendingVerificationProps {
    type: "actor" | "company";
}

function PendingPasswordResetPage(props: PendingVerificationProps) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    function sendVerificationEmail() {
        arAxios.get("/auth/resendVerification");
        enqueueSnackbar("Sent New Verification Email", {
            variant: "success",
            anchorOrigin: {
                vertical: "top",
                horizontal: "right"
            }
        });
    }

    return (
        <div
            className={clsx(
                classes.root,
                "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32"
            )}
        >
            <div className="flex flex-col items-center justify-center w-full">
                <Animate animation="transition.expandIn">
                    <Card className="w-full max-w-384">
                        <CardContent className="flex flex-col items-center justify-center p-32 text-center">
                            <img className="m-32" src={ARLogo} alt="logo" />

                            <Typography variant="subtitle1" className="mb-16">
                                Password Reset Complete!
                            </Typography>
                                <Typography color="textSecondary" className="max-w-288">
                                    We've sent you an email with further instructions.
                                </Typography>
                                <br />
                                <Typography color="textSecondary" className="max-w-288">
                                    Please look out for an email from "support@auditionrevolution.com" to complete your password reset.
                                </Typography>
                        </CardContent>
                    </Card>
                </Animate>
            </div>
        </div>
    );
}

export default PendingPasswordResetPage;
