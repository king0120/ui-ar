import React, {FC} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment, {Moment} from 'moment';
import {connect} from 'react-redux';
import {createTimeSlots} from '../../actions/auditionActions';
import {withRouter} from 'react-router';

const AddSingleTimeSlot: FC<any> = (props) => {
    const {auditionId, projectId} = props.match.params;
    const buildTimeSlots = (startTime: Moment, endTime: Moment) => {
        props.createTimeSlots(projectId, auditionId, [{startTime, endTime}]);
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


export default connect(null, {createTimeSlots})(withRouter(AddSingleTimeSlot)) as any;
