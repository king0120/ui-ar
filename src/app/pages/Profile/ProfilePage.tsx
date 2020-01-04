import React, {FC, useContext, useEffect, useState} from 'react';
import ProfileSidebar from '../../components/profile/ProfileSidebar';
import ExperienceList from '../../components/profile/ExperienceList';
import AddExperienceModal from '../../components/profile/AddExperienceModal';
import ProfileBreakdown from '../../components/profile/ProfileBreakdown';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GlobalContext} from "../../../context/globalContext";
import {Button, IconButton, makeStyles, Menu, MenuItem, Tab, Tabs, Typography} from '@material-ui/core';
import clsx from 'clsx';
import TabPanel from 'app/components/shared/TabPanel';
import ProfileImagePage from './ProfileImagePage';
import ProfileHeader from './ProfileHeader';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {gql} from "apollo-boost";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const CHANGE_EXPERIENCE_ORDER = gql`
    mutation changeExperienceOrder($newExperiences: [ExperienceType!]!) {
        changeExperienceOrder(newExperiences: $newExperiences)
    }
`;
const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.primary.contrastText,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.primary.dark
    },
    profilePic: {
        height: 300,
        width: 250,
        "object-fit": "scale-down"
    }
}));

const ProfilePage: FC<any> = (props) => {
    const classes = useStyles();
    const {readOnly, tabIndex = 0, auditionView = false} = props;
    const {userId} = useContext(GlobalContext);
    const [selectedTab, setSelectedTab] = useState(tabIndex);
    const [reorderExperience, setReorderExperience] = useState(false);
    const [expOrder, setExpOrder] = useState([] as string[]);
    const id = readOnly ? props.match.params.userId : userId;
    const {data, loading, refetch} = useQuery(GET_USER, {variables: {id}, skip: !id});
    const [changeExperienceOrder] = useMutation(CHANGE_EXPERIENCE_ORDER);


    const user = data && data.getUser;
    const order = user ? user.experienceOrder : [];
    useEffect(() => user && setExpOrder(order), [order]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    if (!user) {
        return <h1>loading</h1>
    }
    const experienceData: any = {
        theatreExperience: {
            value: 'theatreExperience',
            type: 'Theatre',
        },
        musicalTheatreExperience: {
            value: 'musicalTheatreExperience',
            type: 'Musical Theatre',
        },
        operaExperience: {
            value: 'operaExperience',
            type: 'Opera',
        },
        filmExperience: {
            value: 'filmExperience',
            type: 'Film',
        },
        televisionExperience: {
            value: 'televisionExperience',
            type: 'Television',
        },
        commercialExperience: {
            value: 'commercialExperience',
            type: 'Commercial',
        }
    };

    const experienceList = expOrder.map((name: any) => {
        return experienceData[name]
    });

    const onDragEnd = (result: any) => {
        //Thanks stackoverflow
        const newOrder: string[] = [...expOrder];
        newOrder.splice(
            result.destination.index,
            0,
            newOrder.splice(result.source.index, 1)[0]
        );
        setExpOrder(newOrder);
    };

    const handleReorderToggle = () => {
        if (reorderExperience) {
            changeExperienceOrder({variables: {newExperiences: expOrder}})
        }
        setReorderExperience(!reorderExperience)
    };
    if (!data || loading) {
        return <h1>loading</h1>
    }
    return (
        <div>
            <div
                className={clsx(classes.header) + ' p-5 flex flex-col-reverse items-start justify-start md:flex-row md:items-between shadow-xl'}>
                <ProfileSidebar user={user} auditionView={auditionView} readOnly={props.readOnly}
                                refetchUser={refetch}/>
                <div className='w-8/12 flex flex-col items-between h-full'>
                    <ProfileHeader user={user}/>
                    <ProfileBreakdown breakdown={user.breakdown || {}}/>
                </div>
            </div>
            <div>
                <Tabs
                    value={selectedTab}
                    onChange={(_e: any, val: any) => setSelectedTab(val)}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="h-64 w-full border-b-1"
                >
                    <Tab
                        className="h-64"
                        label="Experience"/>
                    <Tab
                        className="h-64"
                        label="Training & Special Skills"/>
                    <Tab
                        className="h-64" label="Photos & Videos"/>
                </Tabs>
                <TabPanel value={selectedTab} index={0}>
                    <div className={'flex justify-between'}>
                        <Typography variant={"h4"}>Experience</Typography>
                        {!props.readOnly && (
                            <div>
                                <AddExperienceModal/>
                                <IconButton
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon/>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    <MenuItem onClick={() => {
                                        setAnchorEl(null);
                                        handleReorderToggle()
                                    }}>
                                        <Button>{reorderExperience ? "Save Order" : "Reorder Experiences"}</Button>
                                    </MenuItem>
                                </Menu>

                            </div>
                        )}
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {
                            reorderExperience ? (
                                <Droppable droppableId="experiencesDroppable">
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {experienceList.map((experience: any, index: number) => (
                                                <Draggable
                                                    key={experience.value} draggableId={experience.value} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            className={'mt-12 mb-12'}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <ExperienceList value={experience.value}
                                                                            draggable={true}
                                                                            id={user.id}
                                                                            type={experience.type}
                                                                            readOnly={props.readOnly}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            ) : experienceList.map((experience: any, index: number) => (
                                <div className={'mt-12 mb-12'}>
                                    <ExperienceList value={experience.value} id={user.id} type={experience.type}
                                                    experiences={experience.experiences}
                                                    readOnly={props.readOnly}/>
                                </div>
                            ))
                        }
                    </DragDropContext>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    Coming Soon
                </TabPanel>
                <TabPanel value={selectedTab} index={2}>
                    <ProfileImagePage userId={id} readOnly={readOnly}/>
                </TabPanel>
            </div>
        </div>
    );
};

export default ProfilePage;
