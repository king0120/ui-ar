import React, { FC, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import { GlobalContext } from 'context/globalContext';

const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql');
const AuditionRSVPPage: FC<any> = ({ match, history }) => {
  const { auditionId } = match.params
  const { userId } = useContext(GlobalContext)
  const { loading, data } = useQuery(GET_AUDITION, { variables: { auditionId } });
  if (loading) {
    return <h1>Loading</h1>
  }
  const audition = data && data.getAudition
  const buildURL = '/auditionResponse?' +
    `audition=${audition.id}&` +
    `email=${userId}&` +
    `responseCode=fromSite`
  return (
    <div>
      <div>{audition.name}</div>
      <div>{audition.timeSlots.length} timeSlots still available</div>

      <Button onClick={() => history.push(buildURL)}>RSVP For This Audition</Button>
    </div>
  );
};

export default AuditionRSVPPage;