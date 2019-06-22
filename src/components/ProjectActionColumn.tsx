import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Button, Icon, Modal, Popup} from 'semantic-ui-react';
import {IProject} from '../types/IProject';
import EditProjectModal from './EditProjectModal';

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 15%;
`;

interface IProjectActionColumn {
    data: IProject;
    deleteProject: (id: number) => {};
}

const DeleteModal: FC<any> = ({deleteProject, id}) => {
    const [open, changeOpen] = useState(false);

    return (
        <Modal open={open} trigger={<Button onClick={() => changeOpen(true)} circular={true} color='red' icon='delete'/>}>
            <Modal.Content>
                Are you sure you want to delete this project?
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' onClick={() => changeOpen(false)}>
                    <Icon name='remove'/> No
                </Button>
                <Button color='green' onClick={() => {
                    deleteProject(id);
                    changeOpen(false);
                }}>
                    <Icon name='checkmark'/> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
};

const ProjectActionColumn: FC<IProjectActionColumn> = ({data, deleteProject}) => {
    return (
        <ActionsContainer>
            <Popup
                inverted
                trigger={
                    <EditProjectModal project={data}/>
                }
                content='Edit This Project'
            />
            {/*<Popup*/}
            {/*  inverted*/}
            {/*  trigger={*/}
            {/*    <Button circular color="orange" icon='add user' />*/}
            {/*  }*/}
            {/*  content="Manage Audition Teams"*/}
            {/*/>*/}
            <Popup
                inverted
                trigger={
                    <DeleteModal id={data.id} deleteProject={deleteProject}/>
                }
                content='Delete This Project'
            />
        </ActionsContainer>
    );
};

export default ProjectActionColumn;
