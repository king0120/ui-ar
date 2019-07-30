import React, {FC} from 'react';
import {Icon, List} from 'semantic-ui-react';
import {gql} from "apollo-boost";
import {useMutation, useQuery} from '@apollo/react-hooks'
import AddNoteForActor from './AddNoteForActor';
import moment from "moment";
import Flex from 'styled-flex-component'

export const GET_NOTES = gql`
    query getNotes($actorId: String!){
        getNotes(actorId: $actorId) {
            id
            text
            audition {
                name
            }
            createdAt
        }
    }
`

const REMOVE_NOTE = gql`
    mutation removeNote($id: String!) {
        removeNote(id: $id)
    }
`

const NoteItem: FC<any> = ({note, userId}) => {
    const refetchQueries = [{
        query: GET_NOTES,
        variables: {actorId: userId}
    }];
    const [removeNote] = useMutation(REMOVE_NOTE, {variables: {id: note.id}, refetchQueries});
    const formattedUnixTime = Math.floor(note.createdAt / 1000)
    const date = moment.unix(formattedUnixTime).calendar()
    return (
        <List.Item key={note.id}>
            <Flex full justifyBetween alignCenter>
                <div>
                    <List.Header>{note.text}</List.Header>
                    <List.Description>{date} during {note.audition.name}</List.Description>
                </div>
                <Icon float='right' name={'delete'} onClick={removeNote}/>
            </Flex>
        </List.Item>
    )
}

const NotesOnActor: FC<any> = ({userId, auditionId}) => {

    const {loading, data} = useQuery(GET_NOTES, {
        variables: {actorId: userId}
    });

    const notes = data.getNotes;
    return (
        loading ? (<h1>Loading</h1>) : (
            <div>
                <AddNoteForActor userId={userId} auditionId={auditionId}/>
                <List divided relaxed>
                    {notes.map((note: any) => <NoteItem key={note.id} note={note} userId={userId}/>)}
                </List>
            </div>
        )
    );
};

export default NotesOnActor;
