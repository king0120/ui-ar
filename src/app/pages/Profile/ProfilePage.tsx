import React, { FC, useContext, useState } from 'react';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ExperienceList from '../../components/profile/ExperienceList';
import AddExperienceModal from '../../components/profile/AddExperienceModal';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import { useQuery } from "@apollo/react-hooks";
import { GlobalContext } from "../../../context/globalContext";
import { makeStyles, Tabs, Tab } from '@material-ui/core';
import clsx from 'clsx';
import TabPanel from 'app/components/shared/TabPanel';
import ProfileImagePage from './ProfileImagePage';
import ProfileHeader from './ProfileHeader';

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.primary.contrastText,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.primary.dark
    },
    profilePic: {
        height: 300,
        width: 250,
        "object-fit": "scale-down"
    }
}));

const ProfilePage: FC<any> = (props) => {
    const { readOnly, tabIndex = 0, auditionView = false } = props;
    const { userId, userType } = useContext(GlobalContext);
    console.log(userType)
    const id = readOnly ? props.match.params.userId : userId;
    const { data, loading, refetch } = useQuery(GET_USER, { variables: { id } })
    const user = data && data.getUser;
    const [selectedTab, setSelectedTab] = useState(tabIndex)
    const classes = useStyles()

    if (!data || loading) {
        return <h1>loading</h1>
    }
    return (
        <div>
            <div className={clsx(classes.header) + ' p-5 flex flex-col-reverse items-start justify-start md:flex-row md:items-between shadow-xl'}>
                <ProfileSidebar user={user} auditionView={auditionView} readOnly={props.readOnly} refetchUser={refetch} />
                <div className='w-8/12 flex flex-col items-between h-full'>
                    <ProfileHeader user={user} />
                    <ProfileBreakdown breakdown={user.breakdown || {}} />
                </div>
            </div>
            <div>
                <Tabs
                    value={selectedTab}
                    onChange={(_e: any, val: any) => setSelectedTab(val)}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="h-64 w-full border-b-1"
                >
                    <Tab
                        className="h-64"
                        label="Experience" />
                    <Tab
                        className="h-64"
                        label="Skills & Abilities" />
                    <Tab
                        className="h-64" label="Photos & Videos" />
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <div>
                        <h1>Experience</h1>
                        {!props.readOnly && <AddExperienceModal />}
                    </div>
                    <ExperienceList value={'theatreExperience'} type={'Theatre'} experiences={user.theatreExperience}
                        readOnly={props.readOnly} />
                    <ExperienceList value={'musicalTheatreExperience'} type={'Musical Theatre'}
                        experiences={user.musicalTheatreExperience}
                        readOnly={props.readOnly} />
                    <ExperienceList value={'operaExperience'} type={'Opera'} experiences={user.operaExperience}
                        readOnly={props.readOnly} />
                    <ExperienceList value={'filmExperience'} type={'Film'} experiences={user.filmExperience}
                        readOnly={props.readOnly} />
                    <ExperienceList value={'televisionExperience'} type={'Television'}
                        experiences={user.televisionExperience}
                        readOnly={props.readOnly} />
                    <ExperienceList value={'commercialExperience'} type={'Commercial'}
                        experiences={user.commercialExperience}
                        readOnly={props.readOnly} />
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    Coming Soon
                </TabPanel>
                <TabPanel value={selectedTab} index={2}>
                    <ProfileImagePage userId={id} readOnly={readOnly} />
                </TabPanel>
            </div>
        </div>
    );
};

export default ProfilePage;
