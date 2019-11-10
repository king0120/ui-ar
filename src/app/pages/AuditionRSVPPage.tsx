import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Paper, Typography } from '@material-ui/core';
import { GlobalContext } from 'context/globalContext';

const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql');
const AuditionRSVPPage: FC<any> = ({ match, history }) => {
  const { auditionId } = match.params
  const { userId } = useContext(GlobalContext)
  const { loading, data } = useQuery(GET_AUDITION, { variables: { auditionId } });
  if (loading) {
    return <h1>Loading</h1>
  }
  const audition = data && data.getAudition;

  const buildURL = '/auditionResponse?' +
    `audition=${audition.id}&` +
    `email=${userId}&` +
    `responseCode=${audition.id}`

  return (
    <Paper className="w-3/4 ml-auto mr-auto mt-160 p-16">
      <Typography variant="h5">{audition.name}</Typography>
      <Typography variant="body1">{audition.timeSlots.length} timeSlots still available</Typography>

      <Button variant="contained" color="primary" onClick={() => history.push(buildURL)}>RSVP For This Audition</Button>
    </Paper>
  );
};

export default AuditionRSVPPage;