import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchAllOrganizations} from '../actions/organizationActions';
import {Card, List} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AddOrganization from '../components/AddEditOrganization';

const OrgPageStyle = styled.div`
    width: 90%;
    margin: 20px auto;
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const OrgSelectPage: FC<any> = ({fetchAllOrganizations, orgs}) => {
    useEffect(() => {
        fetchAllOrganizations();
    }, [fetchAllOrganizations]);

    return (
        <OrgPageStyle>
            <div className={'header'}>
                <h1>Select An Organization Below</h1>
                <AddOrganization/>
            </div>
            <List bulleted divided relaxed>
                {orgs.map((org: any) => (
                    <List.Item>
                        <Link to={`/organization/${org.id}/projects`} key={org.id}>
                            <List.Content>
                                <List.Header as='a'>{org.name}</List.Header>
                                <List.Description as='a'>{org.address}</List.Description>
                            </List.Content>
                        </Link>
                    </List.Item>
                ))}
            </List>
        </OrgPageStyle>
    );
};

const mapStateToProps = (state: any) => {
    return {
        orgs: state.organization.organizations,
    };
};

export default connect(mapStateToProps, {fetchAllOrganizations})(OrgSelectPage);
