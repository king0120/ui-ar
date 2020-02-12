import React, {FC, useContext, useState} from 'react';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import {useQuery} from "@apollo/react-hooks";
import {GlobalContext} from "../../../context/globalContext";
import {makeStyles, Tab, Tabs} from '@material-ui/core';
import clsx from 'clsx';
import TabPanel from 'app/components/shared/TabPanel';
import ProfileImagePage from './ProfileImagePage';
import ProfileHeader from './ProfileHeader';
import ResumeSection from "./ResumeSection";
import ExperienceSection from "./ExperienceSection";
import ActorSearchPage from "../Search/ActorSearchPage";
import MyTags from "./MyTags";

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

const ActorProfilePage: FC<any> = (props) => {
    const classes = useStyles();
    const {userId} = useContext(GlobalContext);
    const {readOnly, tabIndex = 0, auditionView = false} = props;
    const [selectedTab, setSelectedTab] = useState(tabIndex);

    const id = readOnly ? props.match.params.userId : userId;
    const {data, loading, refetch} = useQuery(GET_USER, {variables: {id}, skip: !id});

    const user = data && data.getUser;

    if (!user) {
        return <h1>loading</h1>;
    }

    if (!data || loading) {
        return <h1>loading</h1>;
    }
    return (
        <div>
            <div
                className={clsx(classes.header) + ' p-5 flex flex-col-reverse items-start justify-start md:flex-row md:items-between shadow-xl'}>
                <ProfileSidebar user={user} auditionView={auditionView} readOnly={props.readOnly}
                                refetchUser={refetch}/>
                <div className='w-10/12 flex flex-col items-between h-full'>
                    <ProfileHeader user={user}/>
                    <ProfileBreakdown breakdown={user.breakdown || {}}/>
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
                    <Tab className="h-64" label="General Resume"/>
                    <Tab className="h-64" label="Additional Photos"/>
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <div className={'flex justify-between flex-col lg:flex-row'}>
                        <div className={'lg:w-8/12 mr-24'}>
                            <ExperienceSection
                                user={user}
                                type={'experience'}
                                readOnly={props.readOnly}
                            />
                        </div>
                        <div className={'lg:w-4/12'}>
                            <ResumeSection
                                type={"training"}
                                title={"Training"}
                                items={user.trainings}
                                readOnly={props.readOnly}
                                profileOrder={user.profileOrder}
                                userId={user.id}
                            />
                            <ResumeSection
                                type={"skill"}
                                title={"Special Skills"}
                                items={user.specialSkills}
                                readOnly={props.readOnly}
                                profileOrder={user.profileOrder}
                                userId={user.id}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <ProfileImagePage userId={id} readOnly={readOnly}/>
                </TabPanel>
            </div>
        </div>
    );
}

const ProfilePage: FC<any> = (props) => {
    const {readOnly} = props;
    const {userType} = useContext(GlobalContext);
    if (!readOnly && userType.includes('theatre')) {
        return <div>
            <ActorSearchPage/>
            <MyTags/>
        </div>
    } else {
        return <ActorProfilePage {...props}/>
    }
};

export default ProfilePage;
