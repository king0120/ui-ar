import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { transformPhoneNumber } from '../../../utils';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ExperienceList from '../../components/profile/ExperienceList';
import AddExperienceModal from '../../components/profile/AddExperienceModal';
import { Container, Header } from 'semantic-ui-react';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import { useQuery } from "@apollo/react-hooks";
import { GlobalContext } from "../../../context/globalContext";
import { Animate } from '../Auth/SharedAuth';
import { Avatar, Typography, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.primary.contrastText,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.primary.dark
    }
}));

const ProfileHeader = ({ user }: any) => {
    return (
        <div className={"flex flex-1 flex-col items-center justify-center md:flex-row md:items-between"}>
            <div className="flex flex-1 flex-col items-between justify-start">
                <Animate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="h2" color="inherit">{user.displayName}</Typography>
                </Animate>
                <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h4" color="inherit">{user.city}, {user.state}</Typography>
                </Animate>
            </div>

            <div className="flex flex-col items-between justify-end">
                <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6" color="inherit">{user.email}</Typography>
                </Animate>
                <Animate animation="transition.expandIn" delay={300}>
                    <Typography variant="h6" color="inherit">{transformPhoneNumber(user.phoneNumber)}</Typography>
                </Animate>
            </div>
        </div>
    )
}

const ProfilePage: FC<any> = (props) => {
    const { readOnly } = props;
    const { userId } = useContext(GlobalContext);
    const id = readOnly ? props.match.params.userId : userId;
    const { data, loading, refetch } = useQuery(GET_USER, { variables: { id } })
    const user = data && data.getUser;

    const classes = useStyles()

    if (!data || loading) {
        return <h1>loading</h1>
    }
    console.log(clsx(classes.header))
    return (
        <div>
            <div className={clsx(classes.header) + ' p-5 flex flex-col-reverse items-start justify-start md:flex-row md:items-between shadow-xl'}>
                <ProfileSidebar user={user} readOnly={props.readOnly} refetchUser={refetch} />
                <div className='w-8/12 flex flex-col items-between h-full'>
                    <ProfileHeader user={user} />
                    <ProfileBreakdown breakdown={user.breakdown || {}} />
                </div>
            </div>
            <div>
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
            </div>
        </div>
    );
};

export default ProfilePage;
