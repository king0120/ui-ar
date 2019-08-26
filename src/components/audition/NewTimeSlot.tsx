import React, {FC} from 'react';
import {Button, Form, Input} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment, {Moment} from 'moment';
import {withRouter} from "react-router";
import {useMutation} from "@apollo/react-hooks";

const CREATE_TIME_SLOTS = require('../../graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql');
const GET_AUDITION = require('../../graphql/queries/auditions/GET_AUDITION.gql');

const NewTimeSlot: FC<any> = (props) => {
    const {auditionId} = props.match.params;
    const {allSlots, changeAllSlots} = props;

    const [createTimeSlots] = useMutation(CREATE_TIME_SLOTS, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: {auditionId}
        }]
    });

    const buildTimeSlots = (startTime: Moment, numSlots: number, duration: number) => {
        const start = startTime.clone();
        const slots = [];
        for (let i = 0; i < numSlots; i++) {
            slots.push({
                startTime: start.clone(),
                endTime: start.clone().add(duration, 'm'),
            });
            start.add(duration, 'm');
        }
        changeAllSlots(slots);
    };

    const handleSaveTime = () => {
        allSlots.forEach((slot: any) => {
            const {startTime, endTime} = slot;
            createTimeSlots({
                variables: {
                    data: {startTime, endTime, auditionId}
                }
            })
        })
    };

    return (
        <FinalForm
            onSubmit={handleSaveTime}
            render={({handleSubmit, form}) => {
                return (
                    <Form onSubmit={handleSubmit}>
                        <Field
                            name={'startTime'}
                            render={({input}) => (
                                <Form.Field>
                                    <label>Start Time</label>
                                    {/*
                                    // @ts-ignore */}
                                    <TimePicker
                                        showSecond={false}
                                        defaultValue={moment().hour(0).minute(0)}
                                        format={'h:mm a'}
                                        inputReadOnly
                                        use12Hours
                                        {...input}
                                    />
                                </Form.Field>
                            )}
                        />
                        <Form.Group widths='equal'>
                            <Field
                                type={'number'}
                                name={'duration'}
                                render={({input}) => (
                                    <Form.Field>
                                        <label>Duration</label>
                                        <Input {...input}/>
                                    </Form.Field>
                                )}
                            />
                            <Field
                                type={'number'}
                                name={'numberOfSlots'}
                                render={({input}) => (
                                    <Form.Field>
                                        <label>Number Of Slots</label>
                                        <Input {...input}/>
                                    </Form.Field>
                                )}
                            />
                        </Form.Group>
                        <Button secondary onClick={() => {
                            const vals = ['startTime', 'numberOfSlots', 'duration'].map(form.getFieldState).map((f: any) => f.value);
                            buildTimeSlots(vals[0], vals[1], vals[2]);
                        }}>Update TimeSlots</Button>
                        <Button type={'submit'}>Save Times</Button>
                    </Form>
                );
            }
            }
        />
    );
};


export default withRouter(NewTimeSlot);
