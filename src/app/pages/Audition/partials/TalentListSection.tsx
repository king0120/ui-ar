import React, { FC, useEffect, useState } from 'react';
import { gql } from 'apollo-boost';
import { AnimateGroup } from 'app/pages/Search/Partials/ActorSearchResults';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Avatar, List, ListItemText, ListItem, ListItemAvatar, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Typography, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';;


const query = gql`
query getUser($id: String!) {
    getUser(id: $id) {
        id
        displayName
        profilePicture {
            url
        }
        profileImages {
            s3Key
            url
        }
    }
}

`

const useStyles = makeStyles({
    smallAvatar: {
        margin: 10,
        width: 20,
        height: 20,
    },
    icon: {
        color: 'white',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    root: {
        background: '#1b1c1d',
        color: 'white',
        border: 'none'
    },
    expanded: {
        margin: "0 !important",
    }
});

const TalentListItem: FC<any> = ({ id, handleClick, talent }) => {
    const { data, loading, refetch } = useQuery(query, { variables: { id } });
    useEffect(() => { refetch() }, [talent])
    if (loading) { return <p></p> }
    const user = data.getUser
    return (
        <ListItem key={user.id} onClick={() => handleClick(talent)}>
            <ListItemAvatar>
                <Avatar alt={user.displayName} src={user.profilePicture && user.profilePicture.url}>{user.displayName[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.displayName} />
        </ListItem>);
}

const TalentListSection: FC<any> = ({ title, talentList, handleClick }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    return (
        <ExpansionPanel classes={{ root: classes.root, expanded: classes.expanded }} className="w-full p-2" expanded={open} onChange={() => setOpen(!open)}>
            <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMoreIcon className={classes.icon}/>}>
                <div className="p-0 flex items-baseline justify-between">
                    <Avatar className={classes.smallAvatar}>{talentList.length}</Avatar>
                    <Typography>{title}</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="pl-0">
                <List>
                    {talentList && talentList.map((talent: any) => (
                        <AnimateGroup
                            key={talent.id}
                            className="w-full"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                            leave={{
                                animation: "transition.slideUpBigOut"
                            }}
                        >
                            <TalentListItem id={talent.user.id} handleClick={handleClick} talent={talent} />
                        </AnimateGroup>)
                    )}
                    {talentList.length === 0 && (
                        <ListItem>
                            <ListItemText primary="none" />
                        </ListItem>
                    )}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>);
};

export default TalentListSection