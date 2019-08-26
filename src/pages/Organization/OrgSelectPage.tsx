import React, {FC} from 'react';
import {List} from 'semantic-ui-react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AddOrganization from '../../components/organization/AddEditOrganization';
import {useQuery} from "@apollo/react-hooks";

const GET_ORGANIZATIONS_FOR_USER = require('../../graphql/queries/organization/GET_ORGANIZATIONS_FOR_USER.gql')
const OrgPageStyle = styled.div`
    width: 90%;
    margin: 20px auto;
    
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const OrgSelectPage: FC<any> = () => {
    const {loading, data} = useQuery(GET_ORGANIZATIONS_FOR_USER)
    let orgs = data && data.getAllOrganizationsForUser;
    if (loading) {
        return <h1>Loading</h1>
    }
    if (orgs) {
        orgs = [...orgs.owned, ...orgs.member]
    }

    console.log(orgs)
    return (
        <OrgPageStyle>
            <div className={'header'}>
                <h1>Select An Organization Below</h1>
                <AddOrganization/>
            </div>
            <List bulleted divided relaxed>
                {orgs.map((org: any) => (
                    <List.Item key={org.id}>
                        <Link to={`/organization/${org.id}/projects`}>
                            <List.Content>
                                <List.Header>{org.name}</List.Header>
                                <List.Description>{org.address}</List.Description>
                            </List.Content>
                        </Link>
                    </List.Item>
                ))}
            </List>
        </OrgPageStyle>
    );
};

export default OrgSelectPage;
