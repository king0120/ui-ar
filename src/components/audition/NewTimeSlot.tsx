import React, {FC} from 'react';
import {Button, Form, Input} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment, {Moment} from 'moment';
import {connect} from 'react-redux';
import {createTimeSlots} from '../../actions/audition/auditionThunkActions';

const NewTimeSlot: FC<any> = (props) => {
    const {allSlots, changeAllSlots} = props;

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
        const {projectId, auditionId} = props;
        props.createTimeSlots(projectId, auditionId, allSlots);
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

const mapStateToProps = (state: any) => ({
    projectId: state.projects.project.id,
    auditionId: state.auditions.audition.id,
});
export default connect(mapStateToProps, {createTimeSlots})(NewTimeSlot) as any;
