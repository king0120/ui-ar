import React, {FC} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment, {Moment} from 'moment';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {useMutation} from "@apollo/react-hooks";

const CREATE_TIME_SLOTS = require('../../graphql/mutations/timeslots/CREATE_TIME_SLOTS.gql')
const GET_AUDITION = require('../../graphql/queries/auditions/GET_AUDITION.gql')

const AddSingleTimeSlot: FC<any> = (props) => {
    const {auditionId} = props.match.params;
    const [createTimeSlots] = useMutation(CREATE_TIME_SLOTS, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: {auditionId}
        }]
    })
    const buildTimeSlots = (startTime: Moment, endTime: Moment) => {
        createTimeSlots({
            variables: {
                data: {startTime, endTime, auditionId}
            }
        })
    };

    return (
        <FinalForm
            onSubmit={() => {
            }}
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
                        <Field
                            name={'endTime'}
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
                        <Button primary onClick={() => {
                            const vals = ['startTime', 'endTime'].map(form.getFieldState).map((f: any) => f.value);
                            buildTimeSlots(vals[0], vals[1]);
                        }}>Add Time Slot</Button>
                    </Form>
                );
            }
            }
        />
    );
};


export default withRouter(AddSingleTimeSlot);
