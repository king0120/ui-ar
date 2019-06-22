
import React, { FC } from 'react';
import DetailHeader from './DetailHeader';
import { IProjectsDetailPage } from '../../pages/ProjectsDetailPage';

export const Dashboard: FC<IProjectsDetailPage> = ({ project }) => {
  return (<div className="displayDashboard">
    <DetailHeader project={project} />
    <h4>Written By: {project.writer}</h4>
    <h4>Directed By: {project.director}</h4>
  </div>);
};
