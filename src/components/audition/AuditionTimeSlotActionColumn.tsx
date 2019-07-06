import React, {FC} from 'react';
import styled from "styled-components";
import {Button, Popup} from "semantic-ui-react";
import {connect} from "react-redux";
import {deleteTimeSlot, removeActorFromTimeslot} from "../../actions/auditionActions";


export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 15%;
`;


const AuditionTimeSlotActionColumn: FC<any> = ({projectId, auditionId, data,removeActorFromTimeslot, deleteTimeSlot}) => {

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
                            console.log(data)
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

const mapStateToProps = (state: any) => {
    return {
        projectId: state.projects.project.id,
        auditionId: state.auditions.audition.id,
    }
}
export default connect(mapStateToProps, {deleteTimeSlot, removeActorFromTimeslot})(AuditionTimeSlotActionColumn);
