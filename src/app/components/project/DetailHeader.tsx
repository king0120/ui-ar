import React, { FC } from 'react';
import { Typography, Divider } from '@material-ui/core';
import { format } from "date-fns";

interface IDetailHeaderProps {
  project: any;
}

const DetailHeader: FC<IDetailHeaderProps> = ({ project }) => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <Typography variant="h2">{project.name}</Typography>
        <div className="flex">
          <Typography className="mr-20" variant="body1">Written By: {project.writer}</Typography>
          <Typography variant="body1">Directed By: {project.director}</Typography>
        </div>
      </div>
      <div className="w-1/4">
        <div>
          <Typography variant="body1">Rehearsal Dates</Typography>
          {format(new Date(project.rehearsalDateStart), 'MMM Do, yyyy')} to {format(new Date(project.rehearsalDateEnd), 'MMM Do, yyyy')}
        </div>
        <Divider />
        <div>
          <Typography variant="body1">Performance Dates</Typography>
          {format(new Date(project.performanceDateStart), 'MMM Do, yyyy')} to {format(new Date(project.performanceDateEnd), 'MMM Do, yyyy')}
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
