import React, { FC, useState } from 'react';
import ProjectTable from '../../components/organization/ProjectTable';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { deleteOrganization } from '../../../redux/actions/organizationActions';
import { IOrganization } from '../../../types/IOrganization';
import ConfirmationModal from "../../components/shared/ConfirmationModal";
import AddOrganization from "../../components/organization/AddEditOrganization";
import MembersList from "../../components/organization/MembersList";
import { useQuery } from "@apollo/react-hooks";
import { Typography, Tabs, Tab } from '@material-ui/core';

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

const OrganizationPage: FC<IProjectList> = ({ deleteOrganization, history, match }) => {
    const orgId = match.params.organizationId;
    const { loading, data } = useQuery(GET_ORGANIZATION, { variables: { orgId } })
    const [selectedTab, setSelectedTab] = useState(0);

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
                <Typography variant="h3">{organization.name}</Typography>
                {/*TODO move to settings one day */}
                {/* <div className="flex w-96 justify-between">
                    <AddOrganization defaultValue={organization} />
                    <ConfirmationModal onConfirm={handleDeleteOrg} />
                </div> */}
            </TheatreHeader>
            <Tabs
                value={selectedTab}
                onChange={(e, v) => setSelectedTab(v)}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="off"
                className="w-full h-32"
            >
                <Tab className="h-32" label="Project Dashboard" />
                <Tab className="h-32" label="Members" />
            </Tabs>
            {selectedTab === 0 && <ProjectTable />}
            {selectedTab === 1 && <MembersList />}
        </Container>
    );
};

interface IProjectList {
    organization: IOrganization;
    deleteOrganization: (id: number) => {};
    match: any;
    history: any;
}

export default connect(null, { deleteOrganization })(OrganizationPage);
