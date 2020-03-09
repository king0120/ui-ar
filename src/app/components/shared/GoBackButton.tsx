import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import React from 'react';
import { withRouter } from 'react-router';

const GoBackButton = (props: any) => {
  return (
    <div onClick={props.history.goBack}>
      <ArrowBackIcon />
      <span>Go Back</span>
    </div>
  );
};

export default withRouter(GoBackButton);
