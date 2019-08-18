import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Button, Icon} from 'semantic-ui-react';
import AuditionManagerConfiguration from './AuditionManagerConfiguration';
import AuditionManagerView from './AuditionManagerView';
import {fetchProject} from '../../actions/projectActions';
import {useLazyQuery} from "@apollo/react-hooks";

const GET_AUDITION = require('../../graphql/queries/auditions/GET_AUDITION.gql');

const AuditionManagerPageStyles = styled.div`
    padding-bottom: 500px;
    width: 90vw;
    margin: 0 auto
`;

const AuditionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AuditionManagerPage: FC<any> = ({match, history, fetchProject}) => {
    const [allSlots, changeAllSlots] = useState<any>([]);
    const [showConfig, toggleShowConfig] = useState<boolean>(false);
    const [getAudition, {loading, data}] = useLazyQuery(GET_AUDITION);

    useEffect(() => {
        const {auditionId} = match.params;
        getAudition({variables: {auditionId}});
    }, [getAudition, match.params, fetchProject, match.params.projectId, match.params.auditionId]);

    const audition = data && data.getAudition;
    const timeSlots = audition ? audition.timeSlots : []

    useEffect(() => {
        changeAllSlots(timeSlots);
    }, [timeSlots]);

    if (loading || !data) {
        return <h1>loading</h1>;
    }
    return (
        <AuditionManagerPageStyles>
            <div onClick={history.goBack}>
                <Icon name='arrow left'/>
                <span>Go Back</span>
            </div>


            <AuditionHeader>
                <h1> {showConfig ?
                    <span>Configure Audition: {audition.name}</span>
                    : <span>{audition.name}</span>
                }</h1>
                <Button onClick={() => toggleShowConfig(!showConfig)}>Configure Audition</Button>
            </AuditionHeader>
            {
                showConfig
                    ? <AuditionManagerConfiguration allSlots={allSlots} changeAllSlots={changeAllSlots}
                                                    audition={audition} editable={showConfig}/>
                    : <AuditionManagerView allSlots={allSlots} changeAllSlots={changeAllSlots} audition={audition}/>
            }
        </AuditionManagerPageStyles>
    );
};

export default connect(null, {fetchProject})(AuditionManagerPage);
