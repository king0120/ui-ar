import React, { FC, useState } from 'react';
import { gql } from 'apollo-boost';
import { AnimateGroup } from 'app/pages/Search/Partials/ActorSearchResults';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Avatar, List, ListItemText, ListItem, ListItemAvatar, ExpansionPanelDetails, ExpansionPanel, ExpansionPanelSummary, Typography, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import {deepOrange} from "@material-ui/core/colors";
import Pagination from "../../../components/shared/Pagination";


const query = gql`
query getActor($id: String!) {
    getActor(id: $id) {
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
        background: deepOrange[500],
        fontSize: '1.5rem',
        margin: 10,
        width: 25,
        height: 25,
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

const TalentListItem: FC<any> = ({ id, role, handleClick, talent }) => {
    const { data, loading } = useQuery(query, { variables: { id } });
    const classes = useStyles();
    if (loading) { return <p></p> }
    const user = data.getActor
    return (
        <ListItem dense={true} disableGutters={true} key={user.id} onClick={() => handleClick(talent)}>
            <ListItemAvatar>
                <Avatar alt={user.displayName} src={user.profilePicture && user.profilePicture.url}>{user.displayName[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText secondaryTypographyProps={{ className: classes.icon }} primary={user.displayName} secondary={role.characterName} />
        </ListItem>);
}

const TalentListSection: FC<any> = ({ title, talentList, handleClick, roles }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    const [selected, setSelectedPage] = useState(0);
    const changePage = (data: any) => setSelectedPage(data.selected);
    const sliceToShow = talentList && talentList.slice(selected * 10, (selected * 10) + 10);
    return (
        <ExpansionPanel classes={{ root: classes.root, expanded: classes.expanded }} className="w-full p-2" expanded={open} onChange={() => setOpen(!open)}>
            <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMoreIcon className={classes.icon} />}>
                <div className="p-0 flex items-baseline justify-between">
                    <Avatar className={classes.smallAvatar}>{talentList.length}</Avatar>
                    <Typography>{title}</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="pl-0 flex-col">
                <List>
                    {sliceToShow.map((talent: any) => {
                        let role = ''
                        if (roles && roles.length) {
                            role = roles.find((r: any) => r.id === talent.decision);
                        }
                        return (
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
                                <TalentListItem 
                                    role={role} 
                                    id={talent.user.id} 
                                    handleClick={handleClick} 
                                    talent={talent} 
                                />
                            </AnimateGroup>)
                    }
                    )}
                    {sliceToShow.length === 0 && (
                        <ListItem>
                            <ListItemText primary="none" />
                        </ListItem>
                    )}
                </List>
                <Pagination
                    itemCount={talentList.length}
                    handlePageChange={changePage}
                    colorTheme={'dark'}
                />
            </ExpansionPanelDetails>
        </ExpansionPanel>);
};

export default TalentListSection
