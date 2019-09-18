import React, {FC, useContext} from 'react';
import styled from 'styled-components';
import {transformPhoneNumber} from '../../utils';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ExperienceList from '../../components/profile/ExperienceList';
import AddExperienceModal from '../../components/profile/AddExperienceModal';
import {Container, Header} from 'semantic-ui-react';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import {useQuery} from "@apollo/react-hooks";
import {GlobalContext} from "../../context/globalContext";

const GET_USER = require('../../graphql/queries/user/GET_USER.gql');

const ProfilePageStyle = styled(Container)`
    &&& {
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        width: 90%;
        margin: 0 auto;
        h3 {
            text-transform: capitalize;
        }
    }
    .profileInfo {
        display: flex;
        justify-content: space-between;

        .inner {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1,h2,h3 {
        margin: 0;
    }
`;

const ProfileHeader: FC<any> = ({user}) => {
    return (
        <ExperienceHeader>
            <div>
                <Header as={'h1'}>{user.displayName}</Header>
                <h3>Location: {user.city}, {user.state}</h3>
                <h3>Gender: {user.gender}</h3>
            </div>
            <div>
                <p>Phone {transformPhoneNumber(user.phoneNumber)}</p>
                <p>E-mail: {user.email}</p>
            </div>
        </ExperienceHeader>
    );
};

const ProfilePage: FC<any> = (props) => {
    const { readOnly } = props;
    const {userId} = useContext(GlobalContext);
    const id = readOnly ? props.match.params.userId : userId;
    const {data, loading} = useQuery(GET_USER, {variables: {id}})
    const user = data && data.getUser;

    if (!data || loading) {
        return <h1>loading</h1>
    }
    return (
        <ProfilePageStyle>
            <div className={'profileInfo'}>
                <ProfileSidebar user={user} readOnly={props.readOnly}/>
                <div className={'inner'}>
                    <ProfileHeader user={user}/>
                    <ProfileBreakdown breakdown={user.breakdown || {}}/>
                </div>
            </div>
            <div>
                <ExperienceHeader>
                    <h1>Experience</h1>
                    {!props.readOnly && <AddExperienceModal/>}
                </ExperienceHeader>
                <ExperienceList value={'theatreExperience'} type={'Theatre'} experiences={user.theatreExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'musicalTheatreExperience'} type={'Musical Theatre'}
                                experiences={user.musicalTheatreExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'operaExperience'} type={'Opera'} experiences={user.operaExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'filmExperience'} type={'Film'} experiences={user.filmExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'televisionExperience'} type={'Television'}
                                experiences={user.televisionExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'commercialExperience'} type={'Commercial'}
                                experiences={user.commercialExperience}
                                readOnly={props.readOnly}/>
            </div>
        </ProfilePageStyle>
    );
};

export default ProfilePage;
