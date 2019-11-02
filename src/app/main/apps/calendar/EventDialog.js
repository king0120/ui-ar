import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from 'react-router';
import FuseUtils from '@fuse/FuseUtils';
import { useForm } from '@fuse/hooks';
import { TimePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const CREATE_TIME_SLOTS = require('graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql')
const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql')

const defaultFormState = {
    id: FuseUtils.generateGUID(),
    title: '',
    allDay: true,
    start: new Date(),
    end: new Date(),
    desc: ''
};

function EventDialog(props) {
    const dispatch = useDispatch();
    const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);

    const { form, setForm } = useForm(defaultFormState);
    console.log(eventDialog)
    const { auditionId } = props.match.params;

    const [startTime, changeStartTime] = useState(eventDialog.props.date);
    const [endTime, changeEndTime] = useState(eventDialog.props.date);
    useEffect(() => {
        changeStartTime(eventDialog.props.date)
        changeEndTime(eventDialog.props.date)
    }, [eventDialog.props.open, eventDialog.props.date, props.open, eventDialog.props])

    const [createTimeSlots] = useMutation(CREATE_TIME_SLOTS, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: { auditionId }
        }]
    })
    const buildTimeSlots = (startTime, endTime) => {
        createTimeSlots({
            variables: {
                data: { startTime, endTime, auditionId }
            }
        })
    };

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (eventDialog.type === 'edit' && eventDialog.data) {
                setForm({ ...eventDialog.data });
            }

            /**
             * Dialog type: 'new'
             */
            if (eventDialog.type === 'new') {
                setForm({
                    ...defaultFormState,
                    ...eventDialog.data,
                    id: FuseUtils.generateGUID()
                });
            }
        },
        [eventDialog.data, eventDialog.type, setForm],
    );

    useEffect(() => {
        /**
         * After Dialog Open
         */
        if (eventDialog.props.open) {
            initDialog();
        }
    }, [eventDialog.props.open, initDialog]);

    function closeComposeDialog() {
        eventDialog.type === 'edit' ? dispatch(Actions.closeEditEventDialog()) : dispatch(Actions.closeNewEventDialog());
    }

    function handleSubmit(event) {
        event.preventDefault();
        buildTimeSlots(startTime, endTime);
        closeComposeDialog();
    }

    function handleRemove() {
        
        dispatch(Actions.removeEvent(form.id));
        closeComposeDialog();
    }
    return (
        <Dialog {...eventDialog.props} onClose={closeComposeDialog} fullWidth maxWidth="xs" component="form">

            <AppBar position="static">
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        {eventDialog.type === 'new' ? 'New Event' : 'Edit Event'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <form noValidate onSubmit={handleSubmit}>
                <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
                    <TimePicker
                        label="Start Time"
                        value={startTime}
                        onChange={(date) => { changeStartTime(date) }}
                    />
                    <TimePicker
                        label="End Time"
                        value={endTime}
                        onChange={(date) => { changeEndTime(date) }}
                    />
                </DialogContent>

                {eventDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-8 sm:pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                        <DialogActions className="justify-between pl-8 sm:pl-16">
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            > Save
                        </Button>
                            <IconButton onClick={handleRemove}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </form>
        </Dialog>
    );
}

export default withRouter(EventDialog);
