import React, { FC, useContext, useState } from 'react';
import { connect } from "react-redux";
import queryString from 'query-string'
import { respondToAudition } from "../../../redux/actions/auditionActions";
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack'
import { Paper, Typography, Button, TextField, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';
import { GlobalContext } from 'context/globalContext';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql');
const RESPOND_TO_AUDITION = require('graphql/mutations/audition/RESPOND_TO_AUDITION.gql');

const useStyles = makeStyles({
    root: {
        width: '80%',
        margin: '2rem auto',
        padding: '2rem'
    }
});


const AuditionResponse: FC<any> = ({ location, history }) => {

    const classes = useStyles()
    const values = queryString.parse(location.search)
    console.log(values)
    const { userId } = useContext(GlobalContext)
    const { loading, data } = useQuery(GET_AUDITION, { variables: { auditionId: values.audition } });
    const [answers, setAnswers] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = React.useState('confirmed');
    const [respondToAudition] = useMutation(RESPOND_TO_AUDITION, {
        onCompleted() {
            enqueueSnackbar("Successfully registered.", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            history.push("/profile");
        },
        onError(error: ApolloError) {
            enqueueSnackbar(error.message, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
        }
    });

    if (loading) {
        return <h1>Loading</h1>
    }
    const audition = data && data.getAudition

    const handleSubmit = () => {
        const answersWithId = audition.questions.map((question: any, i: number) => {
            return {
                questionId: question.id,
                text: answers[i],
                userId
            }
        })
        respondToAudition({
            variables: {
                email: userId,
                responseCode: values.responseCode || '',
                response: value,
                answerToQuestions: JSON.stringify(answersWithId)
            }
        })
    }

    return (
        <Paper className={classes.root}>
            <Typography variant="h5">RSVP for {audition.name}</Typography>
            {audition.questions.map((question: any, i: number) => {
                return (
                    <TextField
                        fullWidth
                        className="mb-16"
                        label={question.text}
                        value={answers[i]}
                        onChange={(e: any) => {
                            const newA: string[] = [...answers]
                            newA[i] = e.target.value as string
                            setAnswers(newA as any)
                        }}
                    />
                )
            })
            }
            <RadioGroup name="status" value={value} onChange={(e: any) => setValue(e.target.value)}>
                <FormControlLabel value="confirmed" control={<Radio />} label="Confirm Audition" />
                <FormControlLabel value="denied" control={<Radio />} label="Reject Audition" />
            </RadioGroup>

            <Button variant="contained" color="primary" onClick={handleSubmit}>Complete RSVP</Button>
        </Paper >
    );
};

export default connect(null, { respondToAudition })(withRouter(AuditionResponse));
