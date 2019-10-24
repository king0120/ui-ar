import React, { FC, useState } from 'react';
import { withRouter } from 'react-router';
import { useMutation } from "@apollo/react-hooks";
import { Button, Paper } from "@material-ui/core"
import { TimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

const CREATE_TIME_SLOTS = require('../../../graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql')
const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql')

const AddSingleTimeSlot: FC<any> = (props) => {
    const { auditionId } = props.match.params;
    const [startTime, changeStartTime] = useState(new Date());
    const [endTime, changeEndTime] = useState(new Date());
    const [createTimeSlots] = useMutation(CREATE_TIME_SLOTS, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: { auditionId }
        }]
    })
    const buildTimeSlots = (startTime: Date, endTime: Date) => {
        createTimeSlots({
            variables: {
                data: { startTime, endTime, auditionId }
            }
        })
    };

    return (
        <Paper className="p-12 mt-12 mb-12">
            <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(date: MaterialUiPickersDate) => { changeStartTime(date as any) }}
            />
            <TimePicker
                label="End Time"
                value={endTime}
                onChange={(date: MaterialUiPickersDate) => { changeEndTime(date as any) }}
            />
            <Button variant="contained" color="primary" onClick={() => {
                buildTimeSlots(startTime, endTime);
            }}>
                Add Time Slot
            </Button>
        </Paper>
    );
};


export default withRouter(AddSingleTimeSlot);
