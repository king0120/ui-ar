import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks'
import { format } from 'date-fns'
import gql from 'graphql-tag';
import { GlobalContext } from 'context/globalContext';
import { Container, Typography, Paper, makeStyles, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import clsx from 'clsx';
import {useHistory} from "react-router";

const useStyles = makeStyles(() => ({
    root: {
        height: '80%'
    }
}))

const GET_DISTINCT_TAGS = gql`
    {
        getDistinctTags {
            tags
        }
    }
`;

const MyTags = () => {
    const { userId } = useContext(GlobalContext);
    const {push} = useHistory()
    const classes = useStyles()
    const { loading, data } = useQuery(GET_DISTINCT_TAGS)
    if (loading) {
        return <h1>Loading</h1>
    }

    const distinctTags = data.getDistinctTags

    return (
        <Container className="h-full">
            <Paper className={clsx(classes.root, "p-16 mt-36")}>
                <Typography variant="h4">My Tags</Typography>
                <List>
                    {distinctTags.tags.map((tag: any) => {
                        console.log(tag)
                        return (
                            <>
                                <ListItem alignItems="flex-start" key={tag}>
                                    <ListItemText

                                        primary={
                                            <div className="flex justify-between">
                                                <Typography variant="h6">{tag}</Typography>
                                            </div>
                                        }
                                    />
                                </ListItem>
                                <Divider />
                            </>
                        )
                    })}
                </List>
            </Paper>
        </Container>
    );
};

export default MyTags;
