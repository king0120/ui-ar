import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dialog, makeStyles, CircularProgress, TextField, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from 'react-router';
import { TimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import arAxios from 'utils/axiosHelper';
import AuditionRoles from '../../../createAuditionForms/AuditionRoles'

const CREATE_TIME_SLOTS = require('graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql')
const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql')
const INVITE_TO_AUDITION = require('graphql/mutations/INVITE_TO_AUDITION.gql')
const DELETE_TIME_SLOT = require('graphql/mutations/timeslots/DELETE_TIME_SLOT.gql')

const useStyles = makeStyles(theme => ({
    popup: {
        zIndex: 999999
    }
}));
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

    const classes = useStyles()
    const dispatch = useDispatch();
    const eventDialog = useSelector<any, any>(({ calendarApp }) => {
        console.log(calendarApp)
        return calendarApp.events ? calendarApp.events.eventDialog : {props: {}}
    });
    const actorResults = useSelector<any, any>(({ search }) => search.data);
    console.log(eventDialog)
    const [startTime, changeStartTime] = useState(eventDialog.props.start);
    const [endTime, changeEndTime] = useState(eventDialog.props.end);
    const [forRoles, setForRoles] = useState([])


    const [open, setOpen] = useState(false)
    const [options, setOptions] = useState([])
    const [value, setValue] = useState('')
    const [capacity, setCapacity] = useState(1)
    const [selectedActor, setSelectedActor] = useState(eventDialog.props.talent)
    const loading = open && options.length === 0;

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
                setSelectedActor(eventDialog.props.talent && eventDialog.props.talent.user)
                changeStartTime(eventDialog.props.start)
                changeEndTime(eventDialog.props.end)
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

    function handleSubmit(event: any) {
        event.preventDefault();
        if (eventDialog.type === "new") {
            buildTimeSlots(startTime, endTime);
            closeComposeDialog();
        } else {
            if (selectedActor && selectedActor.id && (selectedActor.id !== (eventDialog.props.talent && eventDialog.props.talent.user.id))) {
                invite(selectedActor.id)
            }
            buildTimeSlots(startTime, endTime)
            closeComposeDialog();
        }

    }

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const value = await arAxios.get(`/api/v1/users/search`, {
                params: { value: '', type: 'displayName' }
            })

            if (active) {
                setOptions(value.data);
            }
        })();

        return () => {
            active = false;
        };
    }, [actorResults, dispatch, loading, options, value]);
    
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
                    {eventDialog.type === "edit" && (
                        <>
                            <label>Assigned To Actor: </label>
                            <Autocomplete
                                classes={{
                                    popup: classes.popup,
                                    paper: classes.popup
                                }}
                                style={{ width: 300 }}
                                open={open}
                                onOpen={() => {
                                    setOpen(true);
                                }}
                                onClose={() => {
                                    setOpen(false);
                                }}
                                getOptionLabel={option => option.displayName}
                                value={selectedActor}
                                onChange={(e, newActor) => { setSelectedActor(newActor) }}
                                options={options}
                                loading={loading}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        fullWidth
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value)
                                        }}
                                        variant="standard"
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <React.Fragment>
                                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                                    {params.InputProps.endAdornment}
                                                </React.Fragment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </>
                    )}
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
                            setCapacity(e.target.value as any)
                        }}
                        variant="standard"
                    />
                    <AuditionRoles roles={[]} forRoles={forRoles} setForRoles={setForRoles} />
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
