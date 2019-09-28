import React, { FC, useEffect, useState } from 'react';
import ProfilePage from "../Profile/ProfilePage";
import styled from "styled-components";
import { Button, Dropdown, List, Tab } from 'semantic-ui-react';
import NotesOnActor from "../../components/audition/NotesOnActor";
import Flex from 'styled-flex-component';
import AddTalentToActiveAudition from '../../components/audition/AddTalentToActiveAudition';
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import WidgetNow from 'app/main/apps/dashboards/project/widgets/WidgetNow';
import { FuseAnimateGroup } from '@fuse';
import CastingDecision from './CastingDecision'
import { Paper, Typography } from '@material-ui/core';

const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql');
const UPDATE_TALENT_INSTANCE = require('../../../graphql/mutations/UPDATE_TALENT_INSTANCE.gql');
const AnimateGroup: any = FuseAnimateGroup


const AuditionPageStyles = styled.div`
  display: flex;
  min-height: 98vh;
  .list .item {
    margin: 15px;
  }
  .leftColumn {
    background: #1b1c1d;
    color: whitesmoke;
    width: 15%;
    padding: 15px;
  }
  .middleColumn {
     width: 65%;
  }
  .rightColumn {
     width: 20%;
  }
`;

export const decisionOptions = [
    { key: 'pending', text: 'None', value: 'pending' },
    { key: 'no_thanks', text: 'No Thanks', value: 'no_thanks' },
    { key: 'on_hold', text: 'On Hold', value: 'on_hold' },
    { key: 'callback', text: 'Add To Callback', value: 'callback' },
    { key: 'cast', text: 'Cast To SOMEONE', value: 'cast' },
];

const TalentListSection: FC<any> = ({ title, talentList, handleClick }) => {
    return (
        <>
            <h3>{title}</h3>
            <List divided inverted relaxed>
                {talentList && talentList.map((talent: any) => {
                    return (
                        <List.Item
                            key={talent.id}
                            onClick={() => handleClick(talent)}
                        >
                            <List.Content>
                                {talent.user.displayName}
                            </List.Content>
                        </List.Item>
                    );
                })}
                {talentList.length === 0 && <List.Item><List.Content>None</List.Content></List.Item>}
            </List>
        </>
    );
};


const AuditionPage: FC<any> = ({ match }) => {
    const { auditionId } = match.params;
    const [currentlyViewing, setCurrentlyViewing] = useState(null);
    const [currentTalentId, setCurrentTalentId] = useState(null);
    const [decisionValue, setDecisionValue] = useState('');
    const [getAudition, { loading, data }] = useLazyQuery(GET_AUDITION);
    const [updateTalentInstance] = useMutation(UPDATE_TALENT_INSTANCE, {
        refetchQueries: [{
            query: GET_AUDITION,
            variables: { auditionId }
        }]
    })

    useEffect(() => {
        getAudition({ variables: { auditionId } });
    }, [getAudition, auditionId]);

    if (loading || !data) {
        return <h1>loading</h1>;
    }
    const changeDecision = (id: any) => updateTalentInstance({
        variables: {
            decision: decisionValue === 'pending' ? undefined : decisionValue,
            instanceId: id
        }
    })
    const talent = formatAuditionObject(data.getAudition.talent);

    const handleTalentClick = (selectedTalent: any) => {
        setDecisionValue(selectedTalent.decision || '');
        setCurrentlyViewing(selectedTalent.user.id);
        setCurrentTalentId(selectedTalent.id);
    };

    return (
        <AuditionPageStyles>
            <div className="leftColumn">
                <AddTalentToActiveAudition
                    projectId={match.params.projectId}
                    auditionId={match.params.auditionId}
                />
                <TalentListSection title='Pending' talentList={talent.pending} handleClick={handleTalentClick} />
                <TalentListSection title='Cast' talentList={talent['cast']} handleClick={handleTalentClick} />
                <TalentListSection title='Callback' talentList={talent['callback']} handleClick={handleTalentClick} />
                <TalentListSection title='On Hold' talentList={talent['on_hold']} handleClick={handleTalentClick} />
                <TalentListSection title='No Thanks' talentList={talent['no_thanks']} handleClick={handleTalentClick} />
            </div>
            {currentlyViewing ? (
                <>
                    <div className="middleColumn">
                        <ProfilePage readOnly={true}
                            match={{ params: { userId: currentlyViewing } }} />
                    </div>
                    <div className="rightColumn">
                        <AnimateGroup
                            className="w-full"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget w-full p-12">
                                <CastingDecision
                                    currentTalentId={currentTalentId}
                                    changeDecision={changeDecision}
                                    decisionValue={decisionValue}
                                    setDecisionValue={setDecisionValue}
                                />
                            </div>
                            <div className="widget w-full p-12">
                                <Paper className="w-full rounded-8 shadow-none border-1">
                                    <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                                        <Typography className="text-16">Add Notes</Typography>
                                    </div>
                                    <div className="px-24 py-16">
                                        <NotesOnActor
                                            auditionId={data.getAudition.id}
                                            userId={currentlyViewing}
                                        />
                                    </div>
                                </Paper>
                            </div>
                        </AnimateGroup>
                    </div>
                </>
            ) : (
                    <div>
                        Click a name to the left to show their profile
                </div>
                )}
        </AuditionPageStyles>
    );
};

function formatAuditionObject(talent: any = []) {
    const defaultObject = {
        'no_thanks': [],
        'on_hold': [],
        'callback': [],
        'cast': [],
        'pending': [],
    };

    return talent.reduce((acc: any, val: any) => {
        if (val.decision) {
            acc[val.decision].push(val);
        } else {
            acc.pending.push(val);
        }
        return acc;
    }, defaultObject);
}

export default AuditionPage;
