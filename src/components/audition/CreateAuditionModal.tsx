import React, {FC, useEffect, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import {fetchRolesForProject} from '../../actions/roleActions';
import AddressInput from "../shared/AddressInput";
import {useMutation} from "@apollo/react-hooks";
const CREATE_AUDITION = require('../../graphql/mutations/CREATE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');

const CreateAuditionModal: FC<any> = ({projectId, roles, fetchRolesForProject}) => {
    const refetchQueries = [{
        query: GET_AUDITIONS_FOR_PROJECT,
        variables: {projectId}
    }];
    const [open, setOpen] = useState(false)
    const [latLong, changeLatLong] = useState({} as any);
    const [address, changeAddress] = useState('');
    const [startDate, changeStartDate] = useState(new Date());
    const [createAudition] = useMutation(CREATE_AUDITION, {refetchQueries});
    useEffect(() => {
        fetchRolesForProject(projectId);
    }, [projectId]);

    const onSubmit = async (data: any) => {
        const {status, question1, question2, question3, question4, question5, ...cleaned} = data;
        await createAudition({
            variables: {
                projectId: projectId,
                audition: {
                    ...cleaned, lat: latLong.lat, long: latLong.long, private: status === "private", address, startDate,
                    questions: [question1, question2, question3, question4, question5].filter(Boolean)
                }
            }
        });
        setOpen(false)
    };

    const handleAddressChange = (addressObject: any) => {
        changeLatLong({
            lat: addressObject.latlng.lat,
            long: addressObject.latlng.lng
        });
        changeAddress(addressObject.value);
    };

    return (
        <Modal
            open={open}
            closeOnDimmerClick={true}
            onClose={() => setOpen(false)}
            trigger={
                <Button secondary onClick={() => setOpen(true)}>Create an Audition</Button>
            }>
            <Modal.Header>Create New Audition</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={{}}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
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
                                    <label>Visibiliy</label>
                                    <label>
                                        <Field
                                            name='status'
                                            component='input'
                                            type='radio'
                                            value='public'
                                        />{' '} Public
                                    </label>
                                    <label>
                                        <Field
                                            name='status'
                                            component='input'
                                            type='radio'
                                            value='private'
                                        />{' '} Private
                                    </label>
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label>
                                    <AddressInput handleChange={handleAddressChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Date</label>
                                    <DatePicker selected={startDate} onChange={(data: Date) => changeStartDate(data)}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Contact Phone Number</label>
                                    <Field name={'phoneNumber'} component={'input'} type={'number'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Audition Team</label>
                                    <Field name={'auditionTeam'} component={'select'}>
                                        <option value="0">Not Yet Available</option>
                                    </Field>
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Field name={'description'} component={'textarea'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Audition Prep</label>
                                    <Field name={'prep'} component={'textarea'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Audition Questions</label>
                                    <Field name={'question1'} component={'input'}/>
                                    <Field name={'question2'} component={'input'}/>
                                    <Field name={'question3'} component={'input'}/>
                                    <Field name={'question4'} component={'input'}/>
                                    <Field name={'question5'} component={'input'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>For Role</label>
                                    {roles.map((role: any) => (
                                        <label key={role.id}>
                                            <Field
                                                name='forRoles'
                                                component='input'
                                                type='checkbox'
                                                value={role.id}
                                            />{' '} {role.characterName}
                                        </label>
                                    ))}
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
    roles: state.roles.roles
});

export default connect(mapStateToProps, {fetchRolesForProject})(CreateAuditionModal);
