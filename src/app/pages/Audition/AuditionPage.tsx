import React, { FC, useEffect, useState } from 'react';
import ProfilePage from "../Profile/ProfilePage";
import styled from "styled-components";
import NotesOnActor from "../../components/audition/NotesOnActor";
import AddTalentToActiveAudition from '../../components/audition/AddTalentToActiveAudition';
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { FuseAnimateGroup } from '@fuse';
import CastingDecision from './CastingDecision'
import { Paper, Typography, Divider, makeStyles, Button } from '@material-ui/core';
import TalentListSection from './partials/TalentListSection';
import CloseAuditionModal from './partials/CloseAuditionModal';
import arAxios from 'utils/axiosHelper';
import { AxiosResponse } from 'axios';

const GET_AUDITION = require('../../../graphql/queries/auditions/GET_AUDITION.gql');
const UPDATE_TALENT_INSTANCE = require('../../../graphql/mutations/UPDATE_TALENT_INSTANCE.gql');
const AnimateGroup: any = FuseAnimateGroup

const useStyles = makeStyles({
    divider: {
        backgroundColor: 'white'
    },
});


const AuditionPageStyles = styled.div`
  display: flex;
  min-height: 98vh;
  max-height: 100vh;
  .list .item {
    margin: 15px;
  }
  .leftColumn {
    background: #1b1c1d;
    color: whitesmoke;
    min-width: 300px;
    width: 15%;
    overflow-y: scroll;
  }
  .middleColumn {
     width: 65%;
     overflow-y: scroll;
  }
  .rightColumn {
     width: 20%;
  }
`;

const AuditionPage: FC<any> = ({ match }) => {
    const classes = useStyles()
    const { auditionId, projectId } = match.params;
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

    const getPDF = () => {
        arAxios({
            url: `/api/v1/projects/${projectId}/auditions/${auditionId}/pdf`,
            method: 'GET',
            responseType: 'blob'
        }).then((response: AxiosResponse) => {
            const content = response.headers['content-disposition']
            var startIndex = content.indexOf("filename=") + 9; // Adjust '+ 10' if filename is not the right one.
            var endIndex = content.length; //Check if '- 1' is necessary
            var filename = content.substring(startIndex, endIndex);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
    }
    useEffect(() => {
        getAudition({ variables: { auditionId } });
    }, [getAudition, auditionId]);

    if (loading || !data) {
        return <h1>loading</h1>;
    }
    const { forRoles } = data.getAudition
    console.log(data.getAudition)
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
                <div className="flex justify-between p-5">
                    <Button variant="contained" onClick={getPDF}>Generate PDF</Button>
                    <AddTalentToActiveAudition
                        projectId={match.params.projectId}
                        auditionId={match.params.auditionId}
                    />
                    <CloseAuditionModal
                        projectId={match.params.projectId}
                        auditionId={match.params.auditionId}
                        talent={talent}
                    />
                </div>
                <TalentListSection
                    title='Pending'
                    talentList={talent.pending}
                    handleClick={handleTalentClick}
                />
                <Divider light={true} classes={{ root: classes.divider }} />
                <TalentListSection
                    title='Cast'
                    talentList={talent['cast']}
                    roles={forRoles}
                    handleClick={handleTalentClick} />
                <Divider light={true} classes={{ root: classes.divider }} />
                <TalentListSection
                    title='Callback'
                    talentList={talent['callback']}
                    handleClick={handleTalentClick}
                />
                <Divider light={true} classes={{ root: classes.divider }} />
                <TalentListSection
                    title='On Hold'
                    talentList={talent['on_hold']}
                    handleClick={handleTalentClick}
                />
                <Divider light={true} classes={{ root: classes.divider }} />
                <TalentListSection
                    title='No Thanks'
                    talentList={talent['no_thanks']}
                    handleClick={handleTalentClick}
                />
            </div>
            {currentlyViewing ? (
                <>
                    <div className="middleColumn">
                        <ProfilePage
                            readOnly={true}
                            auditionView={true}
                            match={{ params: { userId: currentlyViewing } }}
                        />
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
                                    forRoles={forRoles}
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
            if (Object.keys(defaultObject).includes(val.decision)) {
                acc[val.decision].push(val);
            } else {
                acc.cast.push(val);
            }
        } else {
            acc.pending.push(val);
        }
        return acc;
    }, defaultObject);
}

export default AuditionPage;
