import React, { FC } from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AddOrganization from '../../components/organization/AddEditOrganization';
import { useQuery } from "@apollo/react-hooks";

const GET_ORGANIZATIONS_FOR_USER = require('../../../graphql/queries/organization/GET_ORGANIZATIONS_FOR_USER.gql')
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
    const { loading, data } = useQuery(GET_ORGANIZATIONS_FOR_USER)
    let orgs = data && data.getAllOrganizationsForUser;
    if (loading) {
        return <h1>Loading</h1>
    }
    if (orgs) {
        orgs = [...orgs.owned, ...orgs.member]
    }

    return (
        <OrgPageStyle>
            <div className={'header'}>
                <Typography variant='h4'>Select An Organization Below</Typography>
                <AddOrganization />
            </div>
            <List >
                {orgs.map((org: any) => (
                    <>
                        <ListItem alignItems="flex-start" key={org.id}>
                            <Link to={`/organization/${org.id}/projects`}>
                                <ListItemText
                                    primary={org.name}
                                    secondary={org.address}
                                />
                            </Link>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))}
            </List>
        </OrgPageStyle>
    );
};

export default OrgSelectPage;
