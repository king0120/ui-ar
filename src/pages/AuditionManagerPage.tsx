import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {fetchAudition} from '../actions/auditionActions';
import styled from 'styled-components';
import {Button, Icon} from 'semantic-ui-react';
import AuditionManagerConfiguration from './AuditionManagerConfiguration';
import AuditionManagerView from './AuditionManagerView';
import {fetchProject} from '../actions/projectActions';

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

const AuditionManagerPage: FC<any> = ({match, history, audition, fetchAudition, fetchProject}) => {
    const [allSlots, changeAllSlots] = useState<any>([]);
    const [showConfig, toggleShowConfig] = useState<boolean>(false);

    useEffect(() => {
        fetchProject(match.params.projectId);
        fetchAudition(match.params.projectId, match.params.auditionId);
    }, [fetchProject, fetchAudition, match.params.projectId, match.params.auditionId]);
    useEffect(() => {
        changeAllSlots(audition.timeSlots);
    }, [audition.timeSlots]);

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

const mapStateToProps = (state: any) => {
    return {
        project: state.projects.project,
        audition: state.auditions.audition,
    };
};
export default connect(mapStateToProps, {fetchAudition, fetchProject})(AuditionManagerPage);
