import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {Button, Icon, Modal, Popup} from 'semantic-ui-react';
import {IProject} from '../../types/IProject';
import EditProjectModal from '../project/EditProjectModal';
import ConfirmationModal from '../shared/ConfirmationModal';

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 15%;
`;

interface IProjectActionColumn {
    data: IProject;
    deleteProject: (id: number) => {};
}


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
            <Popup
                inverted
                trigger={
                    <ConfirmationModal id={data.id} onConfirm={() => deleteProject(data.id)}/>
                }
                content='Delete This Project'
            />
        </ActionsContainer>
    );
};

export default ProjectActionColumn;
