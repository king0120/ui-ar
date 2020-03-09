import React, { FC, useContext, useState } from 'react';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import { useQuery } from '@apollo/react-hooks';
import { GlobalContext } from '../../../context/globalContext';
import { ListItem, makeStyles, Tab, Tabs } from '@material-ui/core';
import clsx from 'clsx';
import TabPanel from 'app/components/shared/TabPanel';
import ProfileImagePage from './ProfileImagePage';
import ProfileHeader from './ProfileHeader';
import ResumeSection from './ResumeSection';
import ExperienceSection from './ExperienceSection';
import ActorSearchPage from '../Search/ActorSearchPage';
import MyTags from './MyTags';
import CompanyNotes from './CompanyNotes';
import LightboxModal from '../../components/shared/LightboxModal';

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const useStyles = makeStyles(theme => ({
  profilePic: {
    height: 300,
    width: 250,
    'object-fit': 'scale-down'
  },
  header: {
    background:
      'linear-gradient(to right, ' +
      theme.palette.primary.dark +
      ' 0%, ' +
      theme.palette.primary.main +
      ' 100%)',
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  }
}));

const ActorProfilePage: FC<any> = props => {
  const classes = useStyles();
  const { userId } = useContext(GlobalContext);
  const { readOnly, tabIndex = 0, auditionView = false } = props;
  const [selectedTab, setSelectedTab] = useState(tabIndex);
  const [open, setOpen] = useState(false);

  const id = readOnly ? props.match.params.userId : userId;
  const { data, loading, refetch } = useQuery(GET_USER, {
    variables: { id },
    skip: !id
  });

  const user = data && data.getUser;

  if (!user) {
    return <h1>loading</h1>;
  }

  if (!data || loading) {
    return <h1>loading</h1>;
  }
  let imageUrl =
    'https://image.shutterstock.com/z/stock-vector-default-avatar-profile-icon-grey-photo-placeholder-518740741.jpg';
  if (user.profilePicture && user.profilePicture.url) {
    imageUrl = user.profilePicture && user.profilePicture.url;
  }
  return (
    <div>
      <LightboxModal
        open={open}
        handleClose={() => setOpen(false)}
        images={[{ src: imageUrl }]}
      />
      <div className={clsx(classes.header) + ' shadow-xl'}>
        <div
          className={
            'p-5 flex flex-col-rev items-start justify-start md:flex-row md:items-between '
          }
        >
          <ListItem className={'w-4/12'}>
            <img
              data-cy="profile-picture"
              alt={user.displayName}
              className={classes.profilePic}
              onClick={() => setOpen(true)}
              src={imageUrl}
            />
          </ListItem>
          <div className="w-8/12 flex flex-col items-between h-full">
            <ProfileHeader user={user} />
            <ProfileBreakdown breakdown={user.breakdown || {}} />
          </div>
        </div>
        <ProfileSidebar
          user={user}
          auditionView={auditionView}
          readOnly={props.readOnly}
          refetchUser={refetch}
        />
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
          <Tab className="h-64" label="General Resume" />
          <Tab className="h-64" label="Photos" />
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
                type={'training'}
                title={'Training'}
                items={user.trainings}
                readOnly={props.readOnly}
                profileOrder={user.profileOrder}
                userId={user.id}
              />
              <ResumeSection
                type={'skill'}
                title={'Special Skills'}
                items={user.specialSkills}
                readOnly={props.readOnly}
                profileOrder={user.profileOrder}
                userId={user.id}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ProfileImagePage userId={id} readOnly={readOnly} />
        </TabPanel>
      </div>
    </div>
  );
};

const CompanyProfile = () => (
  <div className={'flex'}>
    <div className={'ml-10 w-8/12'}>
      <ActorSearchPage fullWidth={true} />
    </div>
    <div className={'w-4/12'}>
      <CompanyNotes />
      <MyTags />
    </div>
  </div>
);

const ProfilePage: FC<any> = props => {
  const { readOnly } = props;
  const { userType } = useContext(GlobalContext);
  const [tab, setTab] = useState(0);
  if (!readOnly && userType.includes('theatre')) {
    if (userType.includes('actor')) {
      return (
        <>
          <Tabs
            value={tab}
            onChange={(_, tab) => setTab(tab)}
            aria-label="simple tabs example"
          >
            <Tab label="Company Dashboard" />
            <Tab label="Actor Profile" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <CompanyProfile />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <ActorProfilePage {...props} />
          </TabPanel>
        </>
      );
    }
    return <CompanyProfile />;
  } else {
    return <ActorProfilePage {...props} />;
  }
};

export default ProfilePage;
