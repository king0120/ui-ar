import React, {FC} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import {connect} from 'react-redux';
import AddressInput from './AddressInput';

const AddOrganization: FC<any> = (props) => {
    const onSubmit = () => console.log('hello')
    return (
        <Modal
            trigger={
                <Button secondary>Create New Organization</Button>
            }>
            <Modal.Header>Create A New Organization</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={{}}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <AddressInput />
                                <Form.Field>
                                    <label>Audition Name</label>
                                    <Field name={'name'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Audition Type</label>
                                    <label>
                                        <Field
                                            name='auditionType'
                                            component='input'
                                            type='radio'
                                            value='generalAudition'
                                        />{' '} General Audition
                                    </label>
                                    <label>
                                        <Field
                                            name='auditionType'
                                            component='input'
                                            type='radio'
                                            value='callback'
                                        />{' '} Callback
                                    </label>
                                    <label>
                                        <Field
                                            name='auditionType'
                                            component='input'
                                            type='radio'
                                            value='callForSubmission'
                                        />{' '} Call For Submission
                                    </label>
                                </Form.Field>
                                <Form.Field>
                                    <label>Audition Team</label>
                                    <Field name={'auditionTeam'} component={'select'}>
                                        <option value="0">Not Yet Available</option>
                                    </Field>
                                </Form.Field>
                                <Form.Group>
                                    <Form.Field width={8}>
                                        <label>Address</label>
                                        <Field name={'address1'} component={'input'} type={'text'}/>
                                    </Form.Field>
                                    <Form.Field width={8}>
                                        <label>Address 2</label>
                                        <Field name={'address2'} component={'input'} type={'text'}/>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label>Contact Number</label>
                                    <Field name={'phoneNumber'} component={'input'} type={'tel'}/>
                                </Form.Field>
                                <Form.Group widths={'equal'}>
                                    <Form.Field>
                                        <label>City</label>
                                        <Field name={'city'} component={'input'} type={'text'}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>State</label>
                                        <Field name={'state'} component={'input'} type={'text'}/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Zip Code</label>
                                        <Field name={'zipCode'} component={'input'} type={'number'}/>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Field>
                                    <label>Description</label>
                                    <Field name={'description'} component={'textarea'}/>
                                </Form.Field>
                                <Button type={'submit'}>Save Audition</Button>
                            </Form>
                        )}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

const mapStateToProps = (state: any) => ({
    hello: 'world'
});

export default connect(mapStateToProps, {})(AddOrganization);
