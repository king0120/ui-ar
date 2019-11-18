import React, { useEffect, useRef, useState } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { FuseAnimate } from '@fuse';
import { useDispatch } from 'react-redux';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment'
import clsx from 'clsx';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import EventDialog from './EventDialog';
import CalendarHeader from './CalendarHeader';
import * as ReactDOM from 'react-dom';
import { isBefore } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import useStyles from './CalendarAppStyles'

export const DEFAULT_STEP = 5
const localizer = momentLocalizer(moment);

function CalendarApp(props) {
    const { forRoles } = props
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const headerEl = useRef(null);

    useEffect(() => {
        dispatch(Actions.getEvents());
    }, [dispatch]);

    function moveEvent({ event, start, end }) {
        dispatch(Actions.updateEvent({
            ...event,
            start,
            end
        }));
    }

    function resizeEvent({ event, start, end }) {
        delete event.type;
        dispatch(Actions.updateEvent({
            ...event,
            start,
            end
        }));
    }

    const [min, setMin] = useState(new Date(props.date))
    const [max, setMax] = useState(undefined)
    const [step, setStep] = useState(DEFAULT_STEP)

    const events = props.events.filter(event => {
        if (max) {
            return isBefore(new Date(event.startTime), max)
        } else {
            return true
        }
    }).map((event) => {
        let title;
        if (event.talent.length) {
            if (event.capacity === 1) {
                title = `${event.talent[0].user.displayName}: ${event.talent[0].status}`
            } else {
                title = event.capacity - event.talent.length + " Slots Available"
            }
        } else {
            title = event.capacity - event.talent.length + " Slots Available"
        }

        return {
            title,
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            talent: event.talent || [],
            id: event.id,
            capacity: event.capacity,
            forRoles
        }
    })
    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto relative")}>
            <div ref={headerEl} />
            <Calendar
                className="flex flex-1 container"
                defaultDate={new Date(props.date)}
                selectable
                localizer={localizer}
                events={events}
                onEventDrop={moveEvent}
                resizable
                onEventResize={resizeEvent}
                defaultView={Views.DAY}
                startAccessor="start"
                endAccessor="end"
                scrollToTime={new Date(props.date)}
                views={Views.Day}
                step={step}
                min={min}
                max={max}
                components={{
                    agenda: {
                        event: ({ event }) => {
                            if (event.talent) {
                                return <div>
                                    {event.talent.map((actor) => (
                                        <p><Link to={`/profile/${actor.user.id}`}>{actor.user.displayName}</Link>: {actor.status}</p>
                                    ))}
                                </div>
                            } else {
                                return (<div>
                                    <div>available</div>
                                </div>)
                            }
                        }
                    },
                    toolbar: (props) => {
                        return headerEl.current ?
                            ReactDOM.createPortal(
                                <CalendarHeader {...props} setDefaultStep={() => {
                                    setMin(new Date(props.date))
                                    setMax(undefined)
                                    setStep(DEFAULT_STEP)
                                }} />,
                                headerEl.current
                            ) : null;
                    }
                }}
                // onNavigate={handleNavigate}
                onSelectEvent={event => {
                    dispatch(Actions.openEditEventDialog(event));
                }}
                onSelectSlot={slotInfo => {
                    var duration = moment.duration(moment(slotInfo.end).diff(slotInfo.start));
                    var hours = duration.asHours();
                    switch (true) {
                        case hours >= 12:
                            setStep(30)
                            break
                        case hours >= 6:
                            setStep(15)
                            break
                        case hours >= 1:
                            setStep(5)
                            break
                        case hours === 1:
                            setStep(DEFAULT_STEP)
                            break
                        default:
                            setStep(DEFAULT_STEP)
                            break
                    }
                    setMin(slotInfo.start)
                    setMax(slotInfo.end)
                }}
            />
            <FuseAnimate animation="transition.expandIn" delay={500}>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className={classes.addButton}
                    onClick={() => dispatch(Actions.openNewEventDialog({
                        date: new Date(props.date),
                        start: new Date(props.date),
                        end: new Date(props.date)
                    }))}
                >
                    <Icon>add</Icon>
                </Fab>
            </FuseAnimate>
            <EventDialog />
        </div>
    )
}

export default withReducer('calendarApp', reducer)(CalendarApp);
