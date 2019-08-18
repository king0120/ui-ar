import React, {FC} from 'react';
import styled from "styled-components";
import {Button, Popup} from "semantic-ui-react";
import {connect} from "react-redux";
import {deleteTimeSlot, removeActorFromTimeslot} from "../../actions/auditionActions";
import {withRouter} from "react-router";


export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 15%;
`;


const AuditionTimeSlotActionColumn: FC<any> = ({match, data, removeActorFromTimeslot, deleteTimeSlot}) => {
    const {projectId, auditionId} = match.params;
    return (
        <ActionsContainer>
            <Popup
                inverted
                trigger={
                    <Button circular color="yellow" icon='edit'/>
                }
                content="Edit This Project"
            />
            <Popup
                inverted
                trigger={
                    <Button
                        circular color="red"
                        icon='remove user'
                        onClick={() => {
                            removeActorFromTimeslot(projectId, auditionId, data.id)
                        }}
                    />
                }
                content="Remove Actor"
            />
            <Popup
                inverted
                trigger={
                    <Button
                        circular color="red" icon='delete'
                        onClick={() => deleteTimeSlot(projectId, auditionId, data.id)}
                    />
                }
                content="Delete This TimeSlot"
            />
        </ActionsContainer>
    )
};

export default connect(null, {deleteTimeSlot, removeActorFromTimeslot})(withRouter(AuditionTimeSlotActionColumn));
