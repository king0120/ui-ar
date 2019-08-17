import React, {FC, useState} from 'react';
import {Button, Modal} from "semantic-ui-react";
import {connect} from "react-redux";
import {inviteToAudition} from "../../actions/auditionActions";
import {ActorSearch} from "../../pages/Search/ActorSearchPage";

const AddTalentToActiveAudition: FC<any> = ({auditionId, projectId, inviteToAudition}) => {
    const [open, changeOpen] = useState(false);
    const handleClickTalent = async (actorId: string) => {
        await inviteToAudition(projectId, auditionId, actorId);
        changeOpen(false);
    };
    return (
        <Modal
            open={open}
            closeOnDimmerClick
            closeIcon
            onClose={() => {
                changeOpen(false);
            }}
            trigger={<Button primary onClick={() => changeOpen(true)}>Add Talent</Button>}>
            <Modal.Header>Invite Actor To Audition</Modal.Header>
            <Modal.Content>
                <ActorSearch showTalentSpec={false} handleClickTalent={handleClickTalent}/>
            </Modal.Content>
        </Modal>

    );
};


export default connect(null, {inviteToAudition})(AddTalentToActiveAudition);
