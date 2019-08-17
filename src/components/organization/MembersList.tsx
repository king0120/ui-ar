import React, {FC, useState} from 'react';
import {connect} from 'react-redux';
import {Button, List, Modal, Card} from 'semantic-ui-react';
import ConfirmationModal from "../shared/ConfirmationModal";
import {removeMemberFromOrganization, addMemberToOrganization} from "../../actions/organizationActions";
import {ActorSearch} from '../../pages/Search/ActorSearchPage';
import Flex from 'styled-flex-component';

const AddMemberModal = (props: any) => {
    const [open, changeOpen] = useState(false)
    return (
        <Modal
            open={open}
            onClose={() => {
                changeOpen(false);
            }}
            trigger={<Button primary onClick={() => changeOpen(true)}>Add User To Organization</Button>}>
            <Card fluid style={{margin: 0, minHeight: "200px"}}>
                <Card.Content>
                    <Card.Header>Search For A Member</Card.Header>
                    <ActorSearch handleClickTalent={(id: any) => {
                        props.addMemberToOrganization(props.organization.id, id);
                        changeOpen(false);
                    }}/>
                </Card.Content>
            </Card>
        </Modal>
    )
}

const MembersList: FC<any> = (props) => {
    const {organization} = props;
    return (
        <div>
            <div>
                <h3>Owner</h3>
                <p>{organization.owner.displayName}</p>
            </div>
            <div>
                <Flex justifyBetween alignBaseline>
                    <h3>Members</h3>
                    <AddMemberModal {...props}/>
                </Flex>
                <List divided verticalAlign='middle'>
                    {organization.members.map((member: any) => {
                        const remove = () => props.removeMemberFromOrganization(organization.id, member.id)
                        return (
                            <List.Item key={member.id}>
                                {member.displayName}
                                <List.Content floated='right'>
                                    <ConfirmationModal onConfirm={remove}/>
                                </List.Content>
                            </List.Item>
                        )
                    })}
                </List>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        organization: state.organization.organization
    }
}
export default connect(mapStateToProps, {removeMemberFromOrganization, addMemberToOrganization})(MembersList);
