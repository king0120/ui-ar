import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {transformPhoneNumber} from '../../utils';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import {getCurrentUserDetails, getProfileDetails} from '../../actions/talentActions';
import ExperienceList from '../../components/profile/ExperienceList';
import AddExperienceModal from '../../components/profile/AddExperienceModal';
import {Container, Header} from 'semantic-ui-react';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';

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

const ProfileHeader: FC<any> = (props) => {
    return (
        <ExperienceHeader>
            <div>
                <Header as={'h1'}>{props.user.displayName}</Header>
                <h3>Location: {props.user.city}, {props.user.state}</h3>
                <h3>Gender: {props.user.gender}</h3>
            </div>
            <div>
                <p>Phone {transformPhoneNumber(props.user.phoneNumber)}</p>
                <p>E-mail: {props.user.email}</p>
            </div>
        </ExperienceHeader>
    );
};

const ProfilePage: FC<any> = (props) => {
    const { readOnly, getProfileDetails, match, getCurrentUserDetails, user } = props;
    useEffect(() => {
        if (readOnly) {
            getProfileDetails(match.params.userId);
        } else {
            getCurrentUserDetails(user.id);
        }
    }, [match.params.userId, readOnly, user.id, getProfileDetails, getCurrentUserDetails]);

    return (
        <ProfilePageStyle>
            <div className={'profileInfo'}>
                <ProfileSidebar user={props.user} readOnly={props.readOnly}/>
                <div className={'inner'}>
                    <ProfileHeader {...props}/>
                    <ProfileBreakdown breakdown={props.user.breakdown || {}}/>
                </div>
            </div>
            <div>
                <ExperienceHeader>
                    <h1>Experience</h1>
                    {!props.readOnly && <AddExperienceModal/>}
                </ExperienceHeader>
                <ExperienceList value={'theatreExperience'} type={'Theatre'} experiences={props.user.theatreExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'musicalTheatreExperience'} type={'Musical Theatre'}
                                experiences={props.user.musicalTheatreExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'operaExperience'} type={'Opera'} experiences={props.user.operaExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'filmExperience'} type={'Film'} experiences={props.user.filmExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'televisionExperience'} type={'Television'}
                                experiences={props.user.televisionExperience}
                                readOnly={props.readOnly}/>
                <ExperienceList value={'commercialExperience'} type={'Commercial'}
                                experiences={props.user.commercialExperience}
                                readOnly={props.readOnly}/>
            </div>
        </ProfilePageStyle>
    );
};

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};
export default connect(mapStateToProps, {getProfileDetails, getCurrentUserDetails})(ProfilePage);
