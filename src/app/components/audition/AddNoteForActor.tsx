import React, { FC, useState } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { Button, TextField } from '@material-ui/core';
import { useForm } from '@fuse/hooks';

const ADD_NOTE = require('../../../graphql/mutations/ADD_NOTE.gql');
const GET_NOTES = require('../../../graphql/queries/GET_NOTES.gql');

const AddNoteForActor: FC<any> = ({ userId, auditionId }) => {
    const [text, setText] = useState('');
    const { form, handleChange, resetForm, setInForm } = useForm({
        note: ''
    });
    const variables = { input: { for: userId, audition: auditionId, text: form.note } };
    const refetchQueries = [{
        query: GET_NOTES,
        variables: { actorId: userId }
    }];
    const [addNote] = useMutation(ADD_NOTE, { variables, refetchQueries });
    const handleSubmit = (e: any) => {
        e.preventDefault()
        addNote();
        resetForm();
    };

    return (
        <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full"
            onSubmit={handleSubmit}
        >
            <TextField
                className="mb-16"
                label="Add Notes Here..."
                type="note"
                name="note"
                value={form.note}
                onChange={handleChange}
            />
            <Button type="submit" className="mt-6" variant="contained" size="small" color="primary">Add Note</Button>
        </form>
        // <Form onSubmit={handleSubmit}>
        //     <Form.Field>
        //         <input placeholder="Add Notes Here..." value={text} onChange={(e) => setText(e.target.value)} />
        //     </Form.Field>
        //     <Button type={'submit'}>Add
        //         Note</Button>
        // </Form>
    );
};

export default AddNoteForActor;
