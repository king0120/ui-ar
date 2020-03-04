import {Button, Typography} from "@material-ui/core";
import AddExperienceModal from "../../components/profile/AddExperienceModal";
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
    const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [changeExperienceOrder] = useMutation(CHANGE_EXPERIENCE_ORDER);
    const [expOrder, setExpOrder] = useState([] as string[]);
    const order = user ? user.experienceOrder : [];
    useEffect(() => user && setExpOrder(order), [order, user]);

    const experienceList = expOrder.map((name: any) => {
        return experienceData[name];
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
                        <Button onClick={() => {
                            setAnchorEl(null);
                            handleReorderToggle();
                        }}>{reorderExperience ? "Save Order" : "Reorder Experience"}</Button>
                        <AddExperienceModal/>
                    </div>
                )}
            </div>
            <MakeDraggable draggable={reorderExperience} items={experienceList} onDragEnd={onDragEnd} readOnly={props.readOnly}>
                <ExperienceList id={user.id} />
            </MakeDraggable>
        </>
    );
};

interface IMakeDraggable {
    draggable: boolean
    items: any[]
    onDragEnd: (r: any) => void
    readOnly: boolean
    children: any
}


export function MakeDraggable(props: IMakeDraggable) {
    return (<DragDropContext onDragEnd={props.onDragEnd}>
        {
            props.draggable ? (
                <Droppable droppableId="experiencesDroppable">
                    {(provided: any, snapshot: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {props.items.map((experience: any, index: number) => (
                                <Draggable
                                    key={experience.value || experience.id}
                                    draggableId={experience.value || experience.id} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={'mt-12 mb-12'}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {React.cloneElement(props.children, {draggable: props.draggable, readOnly: props.readOnly, ...experience})}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            ) : props.items.map((experience: any, index: number) => (
                <div className={'mt-12 mb-12'} key={experience.id || index}>
                    {React.cloneElement(props.children, {draggable: props.draggable, readOnly: props.readOnly, ...experience})}
                </div>
            ))
        }
    </DragDropContext>)
}

export default ExperienceSection;
