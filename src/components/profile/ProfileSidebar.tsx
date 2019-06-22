import React, {FC, useState} from 'react';
import {Image, List, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getFormState} from '../../reducers/finalFormReducer';
import {addUserBreakdown} from '../../actions/talent/talentActions';
import TalentSpecificationsForm from '../shared/TalentSpecificationsForm';

const ProfileSidebarStyle = styled(List)`
    &&& {
        width: 80%;
    }
`;

const AttributesModal: FC<any> = (props) => {
    const [open, changeOpen] = useState(false);
    const handleSubmit = async () => {
        await props.addUserBreakdown(props.specs);
        changeOpen(false);
    };

    return (
        <Modal onClose={() => changeOpen(false)} closeIcon={true} closeOnEscape={true} open={open} trigger={
            (<List.Content onClick={() => changeOpen(true)}>
                    <List.Header>Experience/Skills</List.Header>
                    Update Recent Activity
                </List.Content>
            )}>
            <Modal.Header>
                Actor Attributes
            </Modal.Header>
            <TalentSpecificationsForm onSubmit={handleSubmit} button={true} breakdown={props.user.breakdown}/>
        </Modal>
    );
};

const ProfileSidebar: FC<any> = (props = {user: {profileImages: []}}) => {
    const imagePageUrl = props.readOnly ? `/profile/${props.user.id}/images` : '/profile/images';
    let imageUrl = 'https://image.shutterstock.com/z/stock-vector-default-avatar-profile-icon-grey-photo-placeholder-518740741.jpg';
    if (props.user.profileImages && props.user.profileImages[0] && props.user.profileImages[0].url) {
        imageUrl = props.user.profileImages[0].url;
    }
    return (
        <div>
            <ProfileSidebarStyle divided relaxed>
                <List.Item>
                    <Image size={'medium'} src={imageUrl}/>
                </List.Item>
                {!props.readOnly &&
                <List.Item as={'a'}>
                    <AttributesModal {...props}/>
                </List.Item>
                }
                <List.Item>
                    <Link to={imagePageUrl}>
                        <List.Content>
                            <List.Header>Additional Photos</List.Header>
                            {props.readOnly ? 'See Additional Photos' : 'See and Upload Additional Photos'}
                        </List.Content>
                    </Link>
                </List.Item>
            </ProfileSidebarStyle>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        specs: getFormState(state, 'talentSpecs').values,
    };
};

export default connect(mapStateToProps, {addUserBreakdown})(ProfileSidebar);
