import React, {FC} from 'react';
import {Header, Tab} from 'semantic-ui-react';
import ProjectTable from '../../components/organization/ProjectTable';
import Calendar from '../../components/shared/Calendar';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deleteOrganization} from '../../../redux/actions/organizationActions';
import {IOrganization} from '../../../types/IOrganization';
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import AddOrganization from "../../components/organization/AddEditOrganization";
import MembersList from "../../components/organization/MembersList";
import {useQuery} from "@apollo/react-hooks";

const GET_ORGANIZATION = require('../../../graphql/queries/organization/GET_ORGANIZATION.gql')
const TheatreHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;
const Container = styled.div`
  width: 90vw;
  margin: 0 auto;
`;

const OrganizationPage: FC<IProjectList> = ({deleteOrganization, history, match}) => {
    const orgId = match.params.organizationId;
    const {loading, data} = useQuery(GET_ORGANIZATION, {variables: {orgId}})

    const panes = [
        {menuItem: 'Project Dashboard', render: () => <ProjectTable/>},
        {menuItem: 'Members', render: () => <MembersList/>},
        {menuItem: 'Calendar', render: () => <Calendar/>},
    ];

    const organization = data && data.getOneOrganization;
    if (loading || !organization) {
        return <h1>Loading</h1>;
    }

    const handleDeleteOrg = () => {
        deleteOrganization(orgId)
        history.push('/organization')
    }
    return (
        <Container>
            <TheatreHeader>
                <Header as="h1">{organization.name}</Header>
                <div>
                    <AddOrganization defaultValue={organization}/>
                    <ConfirmationModal onConfirm={handleDeleteOrg}/>
                </div>
            </TheatreHeader>

            <Tab menu={{fluid: true, tabular: true}} panes={panes}/>
        </Container>
    );
};

interface IProjectList {
    organization: IOrganization;
    deleteOrganization: (id: number) => {};
    match: any;
    history: any;
}

export default connect(null, {deleteOrganization})(OrganizationPage);
