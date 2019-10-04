import React, { FC } from 'react';
import DetailHeader from './DetailHeader';

import { gql } from 'apollo-boost';
import { useQuery } from "@apollo/react-hooks";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
const GET_USER = require('graphql/queries/user/GET_USER.gql')

const GET_FOR_DASHBOARD = gql`query getOneProject($projectId: String!) {
    getOneProject(projectId: $projectId) {
        name
        writer
        director
        summary
        notes
        rehearsalDateEnd
        rehearsalDateStart
        performanceDateEnd
        performanceDateStart
        roles {
            id
            characterName
            castTo {
                id
                displayName
            }
        }
        rejected {
            id
            displayName
        }
    }
}
`
export const Dashboard: FC<any> = ({ projectId }) => {
    const { loading, data } = useQuery(GET_FOR_DASHBOARD, { variables: { projectId } })
    if (loading) {
        return <h1>loading</h1>
    }

    const project = data && data.getOneProject
    return (<div className="displayDashboard">
        <DetailHeader project={project} />
        <div>
            <h4>Summary</h4>
            <p>{project.summary}</p>
            <h4>Notes</h4>
            <div>
                <p>{project.notes}</p>
            </div>
        </div>
        <div>
            <div>
                <h1>Cast</h1>
                <List>
                    {project.roles.map((role: any) => role.castTo ? <CastRole key={role.id} role={role} /> : (
                        <ListItem>
                            <h3>{role.characterName}</h3>
                            <p>Pending</p>
                        </ListItem>
                    ))}
                </List>
            </div>
            <div>
                <h1>Rejected Actors</h1>
                {project.rejected.map((rejected: any) => {
                    return (<p key={rejected.id}>{rejected.displayName}</p>)
                })}
            </div>
        </div>
    </div>);
};

function CastRole(props: any) {
    const { role } = props;
    const { data, loading } = useQuery(GET_USER, { variables: { id: role.castTo.id } });
    if (loading) { return <p>Loading</p> }
    const actor = data.getUser
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={actor.profilePicture && actor.profilePicture.url} />
            </ListItemAvatar>
            <ListItemText>
                <h3>{role.characterName}</h3>
                <p>Cast To: {role.castTo ? role.castTo.displayName : "None"}</p>
            </ListItemText>
        </ListItem>)
}