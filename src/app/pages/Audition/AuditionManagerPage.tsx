import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import AuditionManagerConfiguration from './AuditionManagerConfiguration';
import { useLazyQuery } from "@apollo/react-hooks";
import { Typography, Button, Paper } from '@material-ui/core';
import CalendarApp from './partials/AuditionManagerCalendar/calendar/CalendarApp'
import TalentList from '../../components/shared/TalentList'
import GoBackButton from "../../components/shared/GoBackButton";

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

const AuditionManagerPage: FC<any> = ({ match }) => {
    const [allSlots, changeAllSlots] = useState<any>([]);
    const [showConfig, toggleShowConfig] = useState<boolean>(false);
    const [getAudition, { loading, data, error }] = useLazyQuery(GET_AUDITION);

    useEffect(() => {
        const { auditionId } = match.params;
        getAudition({ variables: { auditionId } });
    }, [getAudition, match.params, match.params.projectId, match.params.auditionId]);

    const audition = data && data.getAudition;

    useEffect(() => {
        if (audition && audition.timeSlots) {
            changeAllSlots(audition.timeSlots);
        }
    }, [audition]);

    if (error) {
        return <h1>ERROR IN AUDITIONMANGERPAGE <small>{error.message}</small></h1>
    }


    if (loading || !data) {
        return <h1>loading</h1>;
    }
    return (
        <AuditionManagerPageStyles>
            <GoBackButton />
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
