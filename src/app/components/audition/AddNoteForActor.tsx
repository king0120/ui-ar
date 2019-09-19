import React, {FC, useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import {useMutation} from "@apollo/react-hooks";

const ADD_NOTE = require('../../../graphql/mutations/ADD_NOTE.gql');
const GET_NOTES = require('../../../graphql/queries/GET_NOTES.gql');

const AddNoteForActor: FC<any> = ({userId, auditionId}) => {
    const [text, setText] = useState('');
    const variables = {input: {for: userId, audition: auditionId, text}};
    const refetchQueries = [{
        query: GET_NOTES,
        variables: {actorId: userId}
    }];
    const [addNote] = useMutation(ADD_NOTE, {variables, refetchQueries});
    const handleSubmit = () => {
        addNote();
        setText('');
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <input placeholder="Add Notes Here..." value={text} onChange={(e) => setText(e.target.value)}/>
            </Form.Field>
            <Button type={'submit'}>Add
                Note</Button>
        </Form>
    );
};

export default AddNoteForActor;
