import React, { FC } from 'react';
import { Button, Popup } from 'semantic-ui-react'
import { ActionsContainer } from '../ProjectActionColumn';
import { IProject } from '../../types/IProject';

interface IProjectActionColumn {
  data: IProject;
  deleteRole: () => {}
}

const RoleBreakdownActionColumn: FC<IProjectActionColumn> = ({ deleteRole }) => {
  return (
    <ActionsContainer>
        <Popup
          inverted
          trigger={
            <Button 
              onClick={() => deleteRole()} 
              circular color="red" icon='delete' 
            />
          }
          content="Delete This Role"
        />
      </ActionsContainer>
  );
};

export default RoleBreakdownActionColumn;