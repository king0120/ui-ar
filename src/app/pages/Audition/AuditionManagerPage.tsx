import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import AuditionManagerConfiguration from './AuditionManagerConfiguration';
import AuditionManagerView from './AuditionManagerView';
import { useLazyQuery } from "@apollo/react-hooks";
import { Typography, Button, Paper } from '@material-ui/core';
import CalendarApp from 'app/main/apps/calendar/CalendarApp';
import TalentList from 'app/components/shared/TalentList';

const GET_AUDITION = require('graphql/queries/auditions/GET_AUDITION.gql');

const AuditionManagerPageStyles = styled.div`
    width: 90vw;
    margin: 0 auto;
`;

const AuditionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AuditionManagerPage: FC<any> = ({ match, history }) => {
    const [allSlots, changeAllSlots] = useState<any>([]);
    const [showConfig, toggleShowConfig] = useState<boolean>(false);
    const [getAudition, { loading, data, error }] = useLazyQuery(GET_AUDITION);

    useEffect(() => {
        const { auditionId } = match.params;
        getAudition({ variables: { auditionId } });
    }, [getAudition, match.params, match.params.projectId, match.params.auditionId]);

    const audition = data && data.getAudition;
    const timeSlots = audition ? audition.timeSlots : []

    useEffect(() => {
        changeAllSlots(timeSlots);
    }, [audition]);

    if (error) {
        return <h1>ERROR IN AUDITIONMANGERPAGE <small>{error.message}</small></h1>
    }


    if (loading || !data) {
        return <h1>loading</h1>;
    }
    return (
        <AuditionManagerPageStyles>
            <div className="p-5" onClick={history.goBack}>
                <Icon name='arrow left' />
                <span>Go Back</span>
            </div>
            <AuditionHeader>
                <Typography variant="h5">{audition.name}</Typography>
                <Button variant="contained" color="primary" onClick={() => toggleShowConfig(!showConfig)}>Add TimeSlots</Button>
            </AuditionHeader>

            {
                showConfig && <AuditionManagerConfiguration allSlots={allSlots} changeAllSlots={changeAllSlots}
                    audition={audition} editable={showConfig} />
            }
            <Paper className="flex">
                <CalendarApp forRoles={audition.forRoles} views={['day', 'agenda']} date={audition.startDate} events={allSlots} />
                <div className="p-20 w-1/2">
                    <h3>Invite Talent</h3>
                    <TalentList talent={audition.talent} />
                </div>
            </Paper>
        </AuditionManagerPageStyles>
    );
};

export default AuditionManagerPage;
