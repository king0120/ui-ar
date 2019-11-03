import React, { FC, useState } from 'react';
import { withRouter } from "react-router";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { useSnackbar } from 'notistack'
import { TimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { TextField, Button, Paper } from '@material-ui/core';
import { addMinutes } from 'date-fns';
import { ApolloError } from 'apollo-boost';

const CREATE_TIME_SLOTS = require('graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql');
const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql');

const NewTimeSlot: FC<any> = (props) => {
    const { auditionId } = props.match.params;
    const { allSlots, changeAllSlots } = props;
    const [startTime, changeStartTime] = useState(new Date(props.startDate))
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [numberOfSlots, changeNumberOfSlots] = useState(0)
    const [duration, changeDuration] = useState(0)
    const [getAudition] = useLazyQuery(GET_AUDITION, {
        variables: { auditionId },
    });
    const [createTimeSlots, { error }] = useMutation(CREATE_TIME_SLOTS, {
        onCompleted: async (data: any) => {
            if (data.createTimeslot) {
                await changeAllSlots([...allSlots, data.createTimeslot]); // multiple times
            }
        },
        onError: (error: ApolloError) => {
            enqueueSnackbar(error.message, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            console.log("OH SHIT", error)
        }
    });

    const buildTimeSlots = (startTime: Date, numSlots: number, duration: number) => {
        let start = startTime;
        const slots = [];
        for (let i = 0; i < numSlots; i++) {
            const newSlot: any = { startTime: start, endTime: null }
            const endTime = addMinutes(start, duration)
            newSlot.endTime = endTime
            start = endTime
            slots.push(newSlot);
        }
        handleSaveTime(slots)
    };

    const handleSaveTime = (slots: any) => {
        slots.forEach((slot: any) => {
            const { startTime, endTime } = slot;
            createTimeSlots({
                variables: {
                    data: { startTime, endTime, auditionId }
                }
            })
            getAudition();
        })
    };

    return (
        <Paper className="p-12 mt-12 mb-12">
            <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(date: MaterialUiPickersDate) => { changeStartTime(date as any) }}
            />
            <TextField
                className="mb-16"
                label="Number of Slots"
                value={numberOfSlots}
                onChange={(e: any) => changeNumberOfSlots(e.target.value)}
            />
            <TextField
                className="mb-16"
                label="Duration"
                value={duration}
                onChange={(e: any) => changeDuration(e.target.value)}
            />
            <Button variant="contained" color="secondary" onClick={() => {
                buildTimeSlots(startTime, numberOfSlots, duration);
            }}>Update TimeSlots</Button>
        </Paper>
    );
};


export default withRouter(NewTimeSlot);
