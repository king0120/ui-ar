import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {updateInstance} from "../../actions/auditionActions";
import ProfilePage from "../Profile/ProfilePage";
import styled from "styled-components";
import {Button, Dropdown, List, Tab} from 'semantic-ui-react';
import ProfileImagePage from "../Profile/ProfileImagePage";
import NotesOnActor from "../../components/audition/NotesOnActor";
import Flex from 'styled-flex-component';
import AddTalentToActiveAudition from '../../components/audition/AddTalentToActiveAudition';
import {useLazyQuery} from "@apollo/react-hooks";
const GET_AUDITION = require('../../graphql/queries/auditions/GET_AUDITION.gql');

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

const decisionOptions = [
    {key: 'pending', text: 'None', value: 'pending'},
    {key: 'no_thanks', text: 'No Thanks', value: 'no_thanks'},
    {key: 'on_hold', text: 'On Hold', value: 'on_hold'},
    {key: 'callback', text: 'Add To Callback', value: 'callback'},
    {key: 'cast', text: 'Cast To SOMEONE', value: 'cast'},
];

const TalentListSection: FC<any> = ({title, talentList, handleClick}) => {
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


const AuditionPage: FC<any> = ({match, updateInstance}) => {
    const [currentlyViewing, setCurrentlyViewing] = useState(null);
    const [currentTalentId, setCurrentTalentId] = useState(null);
    const [decisionValue, setDecisionValue] = useState('');
    const [getAudition, {loading, data}] = useLazyQuery(GET_AUDITION);

    useEffect(() => {
        const {auditionId} = match.params;
        getAudition({variables: {auditionId}});
    }, [getAudition, match]);

    if (loading || !data) {
        return <h1>loading</h1>;
    }

    const {auditionId, projectId} = match.params;
    const changeDecision = (id: any) => updateInstance(projectId, auditionId, id, {decision: decisionValue === 'pending' ? null : decisionValue});
    const talent = formatAuditionObject(data.getAudition.talent);

    const handleTalentClick = (selectedTalent: any) => {
        setDecisionValue(selectedTalent.decision || '');
        setCurrentlyViewing(selectedTalent.user.id);
        setCurrentTalentId(selectedTalent.id);
    };

    const panes = [
        {
            menuItem: "Profile",
            render: () => <Tab.Pane><ProfilePage readOnly={true}
                                                 match={{params: {userId: currentlyViewing}}}/></Tab.Pane>
        },
        {
            menuItem: "Photos",
            render: () => <Tab.Pane><ProfileImagePage readOnly={true}
                                                      match={{params: {userId: currentlyViewing}}}/></Tab.Pane>
        }
    ];

    return (
        <AuditionPageStyles>
            <div className="leftColumn">
                <AddTalentToActiveAudition
                    projectId={match.params.projectId}
                    auditionId={match.params.auditionId}
                />
                <TalentListSection title='Pending' talentList={talent.pending} handleClick={handleTalentClick}/>
                <TalentListSection title='Cast' talentList={talent['cast']} handleClick={handleTalentClick}/>
                <TalentListSection title='Callback' talentList={talent['callback']} handleClick={handleTalentClick}/>
                <TalentListSection title='On Hold' talentList={talent['on_hold']} handleClick={handleTalentClick}/>
                <TalentListSection title='No Thanks' talentList={talent['no_thanks']} handleClick={handleTalentClick}/>
            </div>
            {currentlyViewing ? (
                <>
                    <div className="middleColumn">
                        <Tab panes={panes}/>

                    </div>
                    <div className="rightColumn">
                        <h4>Casting Decision</h4>
                        <Flex>
                            <Dropdown
                                selection
                                name={'decision'}
                                placeholder={'Select Talent Decision'}
                                options={decisionOptions}
                                value={decisionValue}
                                onChange={(e, data) => setDecisionValue(data.value as string)}
                            />
                        </Flex>
                        <Button onClick={() => (changeDecision(currentTalentId))}>Submit Decision</Button>
                        <h4>Add Notes</h4>
                        <NotesOnActor auditionId={data.getAudition.id} userId={currentlyViewing}/>
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

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
        me: state.user.me
    };
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

export default connect(mapStateToProps, {updateInstance})(AuditionPage);
