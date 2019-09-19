import React, {FC, useContext, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import {useMutation} from "@apollo/react-hooks";
import {GlobalContext} from "../../../context/globalContext";

const ADD_EXPERIENCE = require('../../../graphql/mutations/profile/ADD_EXPERIENCE.gql')
const GET_USER = require('../../../graphql/queries/user/GET_USER.gql')

const experiences = [{
    id: 'theatreExperience',
    friendly: 'Theatre',
}, {
    id: 'musicalTheatreExperience',
    friendly: 'Musical Theatre',
}, {
    id: 'operaExperience',
    friendly: 'Opera',
}, {
    id: 'filmExperience',
    friendly: 'Film',
}, {
    id: 'televisionExperience',
    friendly: 'Television',
}, {
    id: 'commercialExperience',
    friendly: 'Commercial',
}];

const AddExperienceModal: FC<any> = () => {
    const [open, toggleOpen] = useState(false);
    const {userId} = useContext(GlobalContext);
    const [addExperience] = useMutation(ADD_EXPERIENCE, {
        refetchQueries: [{
            query: GET_USER,
            variables: {id: userId}
        }]
    })
    const onSubmit = (data: any) => {
        const {experienceType, ...experience} = data;
        addExperience({variables: {data: {experienceType, experience}}});
        toggleOpen(false);
    };

    return (
        <Modal
            open={open}
            trigger={
                <Button onClick={() => toggleOpen(true)}>Add Experience</Button>
            }>
            <Modal.Header>Add An Experience</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={{}}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label>Experience Type</label>
                                    {experiences.map((exp) => (
                                        <label key={exp.id}>
                                            <Field
                                                name='experienceType'
                                                component='input'
                                                type='radio'
                                                value={exp.id}
                                            />{' '} {exp.friendly}
                                        </label>
                                    ))}
                                </Form.Field>
                                <Form.Field>
                                    <label>Role Name</label>
                                    <Field name={'role'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Project Name</label>
                                    <Field name={'project'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Company Name</label>
                                    <Field name={'company'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Director</label>
                                    <Field name={'director'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Description</label>
                                    <Field name={'description'} component={'textarea'} type={'text'}/>
                                </Form.Field>
                                <Button primary type={'submit'}>Save Experience</Button>
                                <Button secondary onClick={() => toggleOpen(false)}>Cancel</Button>
                            </Form>
                        )}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default AddExperienceModal;
