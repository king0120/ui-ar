import React, {FC, useState} from "react";
import {Button, Icon, Modal} from "semantic-ui-react";

const ConfirmationModal: FC<any> = ({onConfirm, id}) => {
    const [open, changeOpen] = useState(false);

    return (
        <Modal open={open} trigger={<Button onClick={() => changeOpen(true)} circular={true} color='red' icon='delete'/>}>
            <Modal.Content>
                Are you sure you want to delete this?
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' onClick={() => changeOpen(false)}>
                    <Icon name='remove'/> No
                </Button>
                <Button color='green' onClick={() => {
                    changeOpen(false);
                    onConfirm()
                }}>
                    <Icon name='checkmark'/> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ConfirmationModal
