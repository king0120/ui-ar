import React, {FC} from 'react';
import styled from "styled-components";
import {Button, Popup} from "semantic-ui-react";
import {connect} from "react-redux";
import { deleteTimeSlot } from "../../actions/auditionActions";


export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 15%;
`;



const AuditionTimeSlotActionColumn: FC<any> = ({auditionId, data, deleteTimeSlot}) => {
    console.log(data)

    return (
        <ActionsContainer>
            <Popup
                inverted
                trigger={
                    <Button circular color="yellow" icon='edit' />
                }
                content="Edit This Project"
            />
            <Popup
                inverted
                trigger={
                    <Button circular color="orange" icon='add user'/>
                }
                content="Manage Audition Teams"
            />
            <Popup
                inverted
                trigger={
                    <Button
                        circular color="red" icon='delete'
                        onClick={() => deleteTimeSlot(5, auditionId, data.id)}
                    />
                }
                content="Delete This TimeSlot"
            />
        </ActionsContainer>
    )
};

const mapStateToProps = (state: any) => {
    return {
        auditionId: state.auditions.audition.id,
    }
}
export default connect(mapStateToProps, {deleteTimeSlot})(AuditionTimeSlotActionColumn);
