import React, {FC, useEffect} from 'react';
import {Button, Header, Tab} from 'semantic-ui-react';
import ProjectTable from '../components/ProjectTable';
import Calendar from '../components/Calendar';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {fetchOrganization} from '../actions/organizationActions';
import {IOrganization} from '../types/IOrganization';

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

const ProjectsList: FC<IProjectList> = ({organization, fetchOrganization, match}) => {

    useEffect(() => {
        const orgId = match.params.organizationId;
        fetchOrganization(orgId);
    }, [fetchOrganization, match.params.organizationId]);
    const panes = [
        {menuItem: 'Project Dashboard', render: () => <ProjectTable/>},
        {menuItem: 'Calendar', render: () => <Calendar/>},
    ];

    if (!organization) {
        return <h1>Loading</h1>;
    }

    return (
        <Container>
            <TheatreHeader>
                <Header as="h1">{organization.name}</Header>
                <Button color={'yellow'}>Edit Organization</Button>
            </TheatreHeader>

            <Tab menu={{fluid: true, tabular: true}} panes={panes}/>
        </Container>
    );
};

interface IProjectList {
    organization: IOrganization;
    fetchOrganization: (id: number) => {};
    match: any;
}

const mapStateToProps = (state: any) => {
    return {
        organization: state.organization.organization
    };
};
export default connect(mapStateToProps, {fetchOrganization})(ProjectsList);
