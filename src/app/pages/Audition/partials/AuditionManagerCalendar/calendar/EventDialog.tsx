import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, TextField, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from 'react-router';
import { TimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

import ActorAutocomplete from './ActorAutocomplete'

const CREATE_TIME_SLOTS = require('graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql')
const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql')
const INVITE_TO_AUDITION = require('graphql/mutations/INVITE_TO_AUDITION.gql')
const DELETE_TIME_SLOT = require('graphql/mutations/timeslots/DELETE_TIME_SLOT.gql')


const EventDialog = (props: any) => {
    const { enqueueSnackbar } = useSnackbar();
    const { auditionId, projectId } = props.match.params;
    const [inviteToAudition] = useMutation(INVITE_TO_AUDITION, {
        onError(e) {
            enqueueSnackbar(e.message, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
        }
    })
    const [createTimeSlots] = useMutation(CREATE_TIME_SLOTS, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: { auditionId }
        }]
    })
    const [deleteTimeSlot] = useMutation(DELETE_TIME_SLOT, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: { auditionId }
        }]
    })


    const dispatch = useDispatch();
    const eventDialog = useSelector<any, any>(({ calendarApp }) => {
        return calendarApp.events ? calendarApp.events.eventDialog : { props: {} }
    });

    const [startTime, changeStartTime] = useState(eventDialog.props.start);
    const [endTime, changeEndTime] = useState(eventDialog.props.end);
    const [forRoles, setForRoles] = useState([])

    const [capacity, setCapacity] = useState<number>(eventDialog.props.capacity)
    const [selectedActors, setSelectedActors] = useState(eventDialog.props.talent)


    const invite = async (userId: any) => {
        await inviteToAudition({
            variables: {
                projectId,
                auditionId,
                userId: userId,
                timeSlotId: eventDialog.props.id
            },
            refetchQueries: [{
                query: GET_AUDITION,
                variables: { auditionId }
            }]
        });
    };

    useEffect(() => {
        changeStartTime(eventDialog.props.start)
        changeEndTime(eventDialog.props.end)
    }, [eventDialog.props.open, eventDialog.props.date, props.open, eventDialog.props])


    const buildTimeSlots = (startTime: any, endTime: any) => {
        const data = { startTime, endTime, auditionId, capacity: capacity as number }
        createTimeSlots({
            variables: {
                data
            }
        })
    };

    const initDialog = useCallback(
        () => {
            /**
             * Dialog type: 'edit'
             */
            if (eventDialog.type === 'edit' && eventDialog.data) {
                setSelectedActors(eventDialog.props.talent && eventDialog.props.talent.map((r: any) => r.user))
                changeStartTime(eventDialog.props.start)
                changeEndTime(eventDialog.props.end)
                setCapacity(eventDialog.props.capacity)
            }

            /**
             * Dialog type: 'new'
             */
            if (eventDialog.type === 'new') {
                changeStartTime(eventDialog.props.start)
                changeEndTime(eventDialog.props.end)
            }
        },
        [eventDialog.data, eventDialog.props, eventDialog.type],
    );

    useEffect(() => {
        if (eventDialog.props.open) {
            initDialog();
        }
    }, [eventDialog.props.open, initDialog]);

    function closeComposeDialog() {
        eventDialog.type === 'edit' ? dispatch(Actions.closeEditEventDialog()) : dispatch(Actions.closeNewEventDialog());
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if (eventDialog.type === "new") {
            buildTimeSlots(startTime, endTime);
            closeComposeDialog();
        } else {
            selectedActors.map((selectedActor: any) => {
                const alreadyExists = eventDialog.props.talent.filter((tal: any) => tal.user.id === selectedActor.id).length
                if (selectedActor && selectedActor.id && !alreadyExists) {
                    invite(selectedActor.id)
                }
            })

            buildTimeSlots(startTime, endTime)
            closeComposeDialog();
        }

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
                    {eventDialog.type === "edit" ? [...Array(capacity)].map((num, i) => {
                        if (!selectedActors) {
                            return <></>
                        }
                        console.log('selectedActors', selectedActors)
                        return <ActorAutocomplete
                            selectedActor={selectedActors[i]}
                            setSelectedActor={(actor: any) => {
                                const newSelected = [...selectedActors]
                                newSelected[i] = actor
                                setSelectedActors(newSelected)
                            }}
                        />
                    }) : null}
                    <TimePicker
                        label="Start Time"
                        fullWidth
                        value={startTime}
                        onChange={(date) => { changeStartTime(date) }}
                    />
                    <TimePicker
                        label="End Time"
                        fullWidth
                        value={endTime}
                        onChange={(date) => { changeEndTime(date) }}
                    />
                    <TextField
                        label="Maximum Capacity"
                        fullWidth
                        value={capacity}
                        type="number"
                        onChange={(e) => {
                            setCapacity(parseInt(e.target.value as any))
                        }}
                        variant="standard"
                    />
                    {/* <AuditionRoles roles={[]} forRoles={forRoles} setForRoles={setForRoles} /> */}
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
                            <IconButton onClick={() => {
                                deleteTimeSlot({
                                    variables: { data: { auditionId, id: eventDialog.data.id } }
                                })
                                closeComposeDialog();
                            }}>
                                <Icon>delete</Icon>
                            </IconButton>
                        </DialogActions>
                    )}
            </form>
        </Dialog>
    );
}

export default withRouter(EventDialog);
