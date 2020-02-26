import React, {FC} from 'react';
import styled from 'styled-components';
import EditProjectModal from '../project/EditProjectModal';
import ConfirmationModal from '../shared/ConfirmationModal';
import {IProject} from 'types/IProject';
import {Tooltip} from '@material-ui/core';

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
            <Tooltip title="Edit This Project" aria-label="Project Edit">
                <EditProjectModal project={data}/>
            </Tooltip>
            <Tooltip title="Delete This Project" aria-label="Project Edit">
                <ConfirmationModal id={data.id} onConfirm={() => deleteProject(data.id)}/>
            </Tooltip>
        </ActionsContainer>
    );
};

export default ProjectActionColumn;
