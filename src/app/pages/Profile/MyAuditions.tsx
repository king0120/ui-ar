import React, {useContext} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {format} from 'date-fns';
import gql from 'graphql-tag';
import {GlobalContext} from 'context/globalContext';
import {Container, Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider} from '@material-ui/core';
import clsx from 'clsx';
import {useHistory} from 'react-router';

const useStyles = makeStyles(() => ({
    root: {
        height: '80%'
    }
}));

const MyAuditions = () => {
    const {userId} = useContext(GlobalContext);
    const {push} = useHistory();
    const classes = useStyles();
    const {loading, data} = useQuery(GET_USER_AUDITION(), {
        variables: {id: userId}
    });
    if (loading) {
        return <h1>Loading</h1>;
    }

    const user = data.getInstances;
    user.instances.sort((a: any, b: any) => {
        a = new Date(a.audition.startDate);
        b = new Date(b.audition.startDate);
        return a > b ? 1 : a < b ? -1 : 0;
    });
    return (
        <Container className="h-full">
            <Paper className={clsx(classes.root, 'p-16 mt-36')}>
                <Typography variant="h4">My Auditions</Typography>
                <Typography variant="h6">{user.instances.length} upcoming auditions</Typography>
                <List>
                    {user.instances.map((instance: any) => {
                        const project = instance.audition.project || {};
                        return (
                            <>
                                <ListItem alignItems="flex-start" onClick={() => push(`/profile/auditions/${instance.id}`)}>
                                    <ListItemText
                                        key={instance.id}
                                        primary={
                                            <div className="flex justify-between">
                                                <Typography variant="h6">{project.name}</Typography>
                                                <p>{format(new Date(instance.audition.startDate), 'MMM do, hh:mm a')}</p>
                                            </div>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary">
                                                    {instance.audition.address}
                                                </Typography>
                                                <br/>
                                                {instance.timeSlot && (
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary">
                                                        Time Slot Start: {format(new Date(instance.timeSlot.startTime), 'MMM do, hh:mm a')}
                                                    </Typography>
                                                )}

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider/>
                            </>
                        );
                    })}
                </List>
            </Paper>
        </Container>
    );
};

export default MyAuditions;

const GET_USER_AUDITION = () => gql`
    query getUser($id: String!) {
        getInstances(id: $id) {
            id
            displayName
            instances {
                id
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
`;
