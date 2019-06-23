import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchAllOrganizations} from '../actions/organizationActions';
import {Card} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AddOrganization from '../components/AddOrganization';

const OrgWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    .card {
        height: 100px;
        margin: 20px;
        margin-top: 20px;
        margin-bottom: 20px !important;
    }
`;

const OrgSelectPage: FC<any> = ({fetchAllOrganizations, orgs}) => {
    useEffect(() => {
        fetchAllOrganizations();
    }, [fetchAllOrganizations]);

    return (
        <div>
            <h1>Select An Organization Below</h1>
            <AddOrganization />
            <OrgWrapper>
                {orgs.map((org: any) => (
                    <Link to={`/organization/${org.id}/projects`} key={org.id}>
                        <Card>
                            <Card.Content>
                                <Card.Header>{org.name}</Card.Header>
                                <Card.Meta>
                                    <span>{org.orgAddress1} {org.orgAddress2}, {org.orgCity}, {org.orgStates}</span>
                                </Card.Meta>
                            </Card.Content>
                        </Card>
                    </Link>
                ))}
            </OrgWrapper>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        orgs: state.organization.organizations,
    };
};

export default connect(mapStateToProps, {fetchAllOrganizations})(OrgSelectPage);
