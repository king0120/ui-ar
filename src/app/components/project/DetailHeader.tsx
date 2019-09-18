import React, { FC } from 'react';
import { IProject } from '../../types/IProject';
import { Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';

const DetailHeaderStyles = styled.div`
  display: flex;
  align-items: baseline;
  .image {
    max-width: 20vw;
  }
  .ui.header {
    font-size: 2.5rem;
    margin-left: 15px;
  }
`

interface IDetailHeaderProps {
  project: IProject;
}

const DetailHeader: FC<IDetailHeaderProps> = ({ project }) => {
  return (
    <DetailHeaderStyles>
      <div className="image">
        <Image src="https://dctheatrescene.com/wp-content/uploads/2019/04/hadestown3.jpg" />
      </div>

      <Header as="h1">{project.name}</Header>
    </DetailHeaderStyles>
  );
};

export default DetailHeader;
