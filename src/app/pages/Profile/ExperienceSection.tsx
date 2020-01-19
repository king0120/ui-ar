import {Button, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import AddExperienceModal from "../../components/profile/AddExperienceModal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ExperienceList from "../../components/profile/ExperienceList";
import React, {FC, useEffect, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";


const CHANGE_EXPERIENCE_ORDER = gql`
    mutation changeExperienceOrder($newExperiences: [ExperienceType!]!) {
        changeExperienceOrder(newExperiences: $newExperiences)
    }
`;
const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const MOVE_SECTION = gql`
    mutation moveSection($order: [String!]!) {
        moveSection(order: $order)
    }
`;

interface IExperienceSection {
    readOnly: boolean;
    user: any;
    type: string
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

const ExperienceSection: FC<IExperienceSection> = (props) => {
    const {user} = props;
    const [reorderExperience, setReorderExperience] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [changeExperienceOrder] = useMutation(CHANGE_EXPERIENCE_ORDER);
    const [expOrder, setExpOrder] = useState([] as string[]);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const order = user ? user.experienceOrder : [];
    useEffect(() => user && setExpOrder(order), [order]);
    const [moveSection] = useMutation(MOVE_SECTION, {
        refetchQueries: [
            {query: GET_USER, variables: {id: user.id}}
        ]
    });

    const experienceList = expOrder.map((name: any) => {
        return experienceData[name];
    });

    const moveUp = () => {
        const newOrder = [...user.profileOrder];
        // @ts-ignore
        newOrder.moveUp(props.type);
        moveSection({
            variables: {order: newOrder}
        });
    };

    const moveDown = () => {
        const newOrder = [...user.profileOrder];
        // @ts-ignore
        newOrder.moveDown(props.type);
        moveSection({
            variables: {order: newOrder}
        });
    };


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
            changeExperienceOrder({variables: {newExperiences: expOrder}});
        }
        setReorderExperience(!reorderExperience);
    };

    return (
        <>
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
                                handleReorderToggle();
                            }}>
                                <Button>{reorderExperience ? "Save Order" : "Reorder Experiences"}</Button>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl(null);
                                moveUp();
                            }}>
                                <Button>Move Up</Button>
                            </MenuItem>
                            <MenuItem onClick={() => {
                                setAnchorEl(null);
                                moveDown();
                            }}>
                                <Button>Move Down</Button>
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
                                            key={experience.value}
                                            draggableId={experience.value} index={index}>
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
                            <ExperienceList value={experience.value} id={user.id}
                                            type={experience.type}
                                            experiences={experience.experiences}
                                            readOnly={props.readOnly}/>
                        </div>
                    ))
                }
            </DragDropContext>
        </>
    );
};

export default ExperienceSection;
