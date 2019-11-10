import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { format } from 'date-fns'
import gql from 'graphql-tag';
import { GlobalContext } from 'context/globalContext';
import { Container, Typography, Paper, makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    root: {
        height: '80%'
    }
}))

const MyAuditions = () => {
    const { userId } = useContext(GlobalContext);
    const classes = useStyles()
    const { loading, data } = useQuery(GET_USER_AUDITION(), {
        variables: { id: userId }
    })
    if (loading) {
        return <h1>Loading</h1>
    }
    const user = data.getUser
    console.log(user)
    return (
        <Container className="h-full">
            <Paper className={clsx(classes.root, "p-16 mt-36")}>
                <Typography variant="h4">My Auditions</Typography>
                <Typography variant="h6">{user.instances.length} upcoming auditions</Typography>
                <List>
                    {user.instances.map((instance: any) => {
                        const project = instance.audition.project || {}
                        return (
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    key={instance.id}
                                    primary={`${project.name}  ${format(new Date(instance.audition.startDate), "MMM do, hh:mm a")}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary">
                                                {instance.audition.address}
                                            </Typography>

                                        </React.Fragment>
                                    }
                                /><Divider variant="inset" component="li" />
                            </ListItem>
                        )
                    })}
                </List>
            </Paper>
        </Container>
    );
};

export default MyAuditions;

const GET_USER_AUDITION = () => gql`
    query getUser($id: String!) {
        getUser(id: $id) {
            id
            displayName
            instances {
                projectId
                registered
                audition {
                    name
                    description
                    startDate
                    endDate
                    address
                    lat
                    long
                    project {
                        name
                    }
                }
                timeSlot {
                    startTime
                    endTime
                }
            }
        }
    }
`