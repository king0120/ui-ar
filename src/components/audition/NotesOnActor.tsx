import React, {FC, useState} from 'react';
import {List, Input, Button} from 'semantic-ui-react';
import {gql} from "apollo-boost";
import {useQuery, useMutation} from '@apollo/react-hooks'

const GET_NOTES = gql`
    query getNotes($actorId: String!){
        getNotes(actorId: $actorId) {
            id
            text
        }
    }
`

const ADD_NOTE = gql`
    mutation addNote($input: CreateNoteDTO!) {
        addNote(
            input: $input
        ) {
            id
            text
        }
    }
`

const NotesOnActor: FC<any> = ({userId, auditionId}) => {
    const [text, setText] = useState('')
    const {loading, data} = useQuery(GET_NOTES, {
        variables: {actorId: userId}
    });

    const variables = {input: {for: userId, audition: auditionId, text}};
    const refetchQueries = [{
        query: GET_NOTES,
        variables: {actorId: userId}
    }];
    const [addNote] = useMutation(ADD_NOTE, {variables, refetchQueries});

    const notes = data.getNotes;
    return (
        loading ? (<h1>Loading</h1>) : (
            <div>
                <Input value={text} onChange={(e, target) => setText(target.value)}/> <Button onClick={() => addNote()}>Add
                Note</Button>
                <List divided relaxed>
                    {notes.map((note: any) => (
                        <List.Item key={note.id}>
                            {note.text}
                        </List.Item>
                    ))}
                </List>
            </div>
        )
    );
};

export default NotesOnActor;
