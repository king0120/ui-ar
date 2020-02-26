import React, {FC} from 'react';
import {withRouter} from "react-router";
import {useMutation} from "@apollo/react-hooks";

const DELETE_TIME_SLOT = require('../../../graphql/mutations/timeslots/DELETE_TIME_SLOT.gql')
const REMOVE_TALENT_FROM_TIME_SLOT = require('../../../graphql/mutations/timeslots/REMOVE_TALENT_FROM_TIME_SLOT.gql')
const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql')

const AuditionTimeSlotActionColumn: FC<any> = ({match, data}) => {
    const {auditionId} = match.params;
    const [deleteTimeSlot] = useMutation(DELETE_TIME_SLOT, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: {auditionId}
        }]
    })

    const [removeTalent] = useMutation(REMOVE_TALENT_FROM_TIME_SLOT, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: {auditionId}
        }]
    })

    return (<h1>Currently Hidden</h1>)
    // return (
    //     <div className="flex justify-around pl-10 pr-10">
    //         <Popup
    //             inverted
    //             trigger={
    //                 <Button circular color="yellow" icon='edit'/>
    //             }
    //             content="Edit This Project"
    //         />
    //         <Popup
    //             inverted
    //             trigger={
    //                 <Button
    //                     circular color="red"
    //                     icon='remove user'
    //                     onClick={() => {
    //                         removeTalent({variables: {data: {id: data.id}}})
    //                     }}
    //                 />
    //             }
    //             content="Remove Actor"
    //         />
    //         <Popup
    //             inverted
    //             trigger={
    //                 <Button
    //                     circular color="red" icon='delete'
    //                     onClick={
    //                         () => deleteTimeSlot({
    //                             variables: {data: {auditionId, id: data.id}}
    //                         })
    //                     }
    //                 />
    //             }
    //             content="Delete This TimeSlot"
    //         />
    //     </div>
    // )
};

export default withRouter(AuditionTimeSlotActionColumn);
