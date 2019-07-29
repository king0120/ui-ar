import React, {FC, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {fetchAudition, updateInstance} from "../actions/auditionActions";
import ProfilePage from "./ProfilePage";
import styled from "styled-components";
import {Button, List, Dropdown, Tab} from 'semantic-ui-react';
import ProfileImagePage from "./ProfileImagePage";
import NotesOnActor from "../components/audition/NotesOnActor";

const AuditionPageStyles = styled.div`
  display: flex;
  min-height: 98vh;
  .list .item {
    margin: 15px;
  }
  .leftColumn {
    background: #1b1c1d;
    color: whitesmoke;
    width: 20%;
  }
  .rightColumn {
     width: 80%;
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
                    )
                })}
                {talentList.length === 0 && <List.Item><List.Content>None</List.Content></List.Item>}
            </List>
        </>
    )
}


const AuditionPage: FC<any> = ({match, fetchAudition, audition, updateInstance, showingTalent}) => {
    const [currentlyViewing, setCurrentlyViewing] = useState(null);
    const [currentTalentId, setCurrentTalentId] = useState(null);
    const [decisionValue, setDecisionValue] = useState('');
    useEffect(() => {
        fetchAudition(match.params.projectId, match.params.auditionId)
    }, [match, fetchAudition]);

    const {auditionId, projectId} = match.params;
    const changeDecision = (id: any) => updateInstance(projectId, auditionId, id, {decision: decisionValue === 'pending' ? null : decisionValue});
    const talent = formatAuditionObject(audition.talent);

    const handleTalentClick = (selectedTalent: any) => {
        setDecisionValue(selectedTalent.decision || '');
        setCurrentlyViewing(selectedTalent.user.id);
        setCurrentTalentId(selectedTalent.id);
    };

    const panes = [
        {menuItem: "Profile", render: () => <Tab.Pane><ProfilePage readOnly={true} match={{params: {userId: currentlyViewing}}}/></Tab.Pane>},
        {menuItem: "Notes", render: () => <Tab.Pane><NotesOnActor auditionId={audition.id} userId={currentlyViewing}/></Tab.Pane>},
        {menuItem: "Photos", render: () => <Tab.Pane><ProfileImagePage readOnly={true} match={{params: {userId: currentlyViewing}}}/></Tab.Pane>}
    ]

    return (
        <AuditionPageStyles>
            <div className="leftColumn">
                <Button primary>Add Talent</Button>
                <TalentListSection title='Pending' talentList={talent.pending} handleClick={handleTalentClick}/>
                <TalentListSection title='Cast' talentList={talent['cast']} handleClick={handleTalentClick}/>
                <TalentListSection title='Callback' talentList={talent['callback']} handleClick={handleTalentClick}/>
                <TalentListSection title='On Hold' talentList={talent['on_hold']} handleClick={handleTalentClick}/>
                <TalentListSection title='No Thanks' talentList={talent['no_thanks']} handleClick={handleTalentClick}/>
            </div>
            <div className="rightColumn">
                <div>
                    <Dropdown
                        selection
                        placeholder={'Select Talent Decision'}
                        options={decisionOptions}
                        value={decisionValue}
                        onChange={(e, data) => setDecisionValue(data.value as string)}
                    />
                    <Button onClick={() => (changeDecision(currentTalentId))}>Submit Decision</Button>
                    <Button>Favorite</Button>
                    <Button>Add Notes</Button>
                </div>
                {currentlyViewing ? (
                    <Tab panes={panes} />
                ) : (
                    <div>
                        Click a name to the left to show their profile
                    </div>
                )}

            </div>
        </AuditionPageStyles>
    );
};

const mapStateToProps = (state: any) => {
    return {
        audition: state.auditions.audition,
        user: state.user.user,
        me: state.user.me
    }
}

function formatAuditionObject(talent: any = []) {
    const defaultObject = {
        'no_thanks': [],
        'on_hold': [],
        'callback': [],
        'cast': [],
        'pending': [],
    }

    return talent.reduce((acc: any, val: any) => {
        if (val.decision) {
            acc[val.decision].push(val)
        } else {
            acc.pending.push(val)
        }
        return acc
    }, defaultObject)
}

export default connect(mapStateToProps, {fetchAudition, updateInstance})(AuditionPage);
