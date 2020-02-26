import React, {FC, useState} from 'react';
import {connect} from 'react-redux';
import {removeMemberFromOrganization, addMemberToOrganization} from "../../../redux/actions/organizationActions";
import {useQuery} from "@apollo/react-hooks";
import {withRouter} from 'react-router-dom';

const GET_ORGANIZATION = require('../../../graphql/queries/organization/GET_ORGANIZATION.gql')

const AddMemberModal = (props: any) => {
    const [open, changeOpen] = useState(false)
    return <h1>currently hidden</h1>
    // return (
    //     <Modal
    //         open={open}
    //         onClose={() => {
    //             changeOpen(false);
    //         }}
    //         trigger={<Button primary onClick={() => changeOpen(true)}>Add User To Organization</Button>}>
    //         <Card fluid style={{margin: 0, minHeight: "200px"}}>
    //             <Card.Content>
    //                 <Card.Header>Search For A Member</Card.Header>
    //                 <ActorSearch handleClickTalent={(id: any) => {
    //                     props.addMemberToOrganization(props.organization.id, id);
    //                     changeOpen(false);
    //                 }}/>
    //             </Card.Content>
    //         </Card>
    //     </Modal>
    // )
}

const MembersList: FC<any> = (props) => {
    const {organizationId} = props.match.params;
    const {loading, data} = useQuery(GET_ORGANIZATION, {variables: {orgId: organizationId}});
    const organization = data && data.getOneOrganization;
    if (loading) {
        return <h1>loading</h1>
    }
    return <h1>currently hidden</h1>
    // return (
    //     <div>
    //         <div>
    //             <h3>Owner</h3>
    //             <p>{organization.owner.displayName}</p>
    //         </div>
    //         <div>
    //             <Flex justifyBetween alignBaseline>
    //                 <h3>Members</h3>
    //                 <AddMemberModal organization={organization} {...props}/>
    //             </Flex>
    //             <List divided verticalAlign='middle'>
    //                 {organization.members.map((member: any) => {
    //                     const remove = () => props.removeMemberFromOrganization(organization.id, member.id)
    //                     return (
    //                         <List.Item key={member.id}>
    //                             {member.displayName}
    //                             <List.Content floated='right'>
    //                                 <ConfirmationModal onConfirm={remove}/>
    //                             </List.Content>
    //                         </List.Item>
    //                     )
    //                 })}
    //             </List>
    //         </div>
    //     </div>
    // );
};

export default connect(null, {
    removeMemberFromOrganization,
    addMemberToOrganization
})(withRouter(MembersList));
