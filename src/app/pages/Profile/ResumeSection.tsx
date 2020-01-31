import {Button, Card, CardContent, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import AddSkillModal from "../../components/profile/AddSkillModal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import React, {FC, useEffect, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import {MakeDraggable} from "./ExperienceSection";

interface IResumeSection {
    title: string;
    readOnly: boolean;
    items: any[];
    type: 'skill' | 'training';
    profileOrder: string[];
    userId: string
}

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const REMOVE_SKILL = gql`
    mutation removeSkillOrTraining($type: String!, $text: String!) {
        removeSkillOrTraining(type: $type, text: $text)
    }
`;

const REORDER_SKILL = gql`
    mutation reorderSkillsOrTraining($type: String!, $skillOrder: [ExperienceOrder!]) {
        reorderSkillOrTraining(type: $type, skillOrder: $skillOrder)
    }
`

const ResumeSection: FC<IResumeSection> = (props) => {
    const [reorder, setReorder] = useState(false)
    const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [skillItems, setSkillItems] = useState([] as any[])
    const [reorderSkillsOrTraining] = useMutation(REORDER_SKILL)
    const onDragEnd = (result: any) => {
        const newOrder: any[] = [...skillItems];
        newOrder.splice(
            result.destination.index,
            0,
            newOrder.splice(result.source.index, 1)[0]
        );
        setSkillItems(newOrder as any[])
    };
    useEffect(() => {
        const sorted = props.items.sort((a: any, b: any) => a.index - b.index);
        setSkillItems(sorted)
    }, [props.items.length]);

    const handleReorder = () => {
        setAnchorEl(null);
        if (reorder) {
            const indexedItems = skillItems.map((item: any, index: number) => ({
                id: item.id,
                index
            }))
            reorderSkillsOrTraining({
                variables: {
                    type: props.type, skillOrder: indexedItems
                }
            })
        }
        setReorder(!reorder)
    };

    return (
        <>
            <div className={'flex justify-between mt-8 mb-8'}>
                <Typography variant={"h4"}>{props.title}</Typography>
                {!props.readOnly && (
                    <div>
                        <Button onClick={handleReorder}>
                            {reorder ? "Save Order" : "Reorder " + props.type}
                        </Button>
                        <AddSkillModal type={props.type}/>
                    </div>
                )}
            </div>
            <div>
                <Card>
                    <CardContent>
                        <List>
                            <MakeDraggable
                                draggable={reorder}
                                items={skillItems}
                                onDragEnd={onDragEnd}
                                readOnly={props.readOnly}>
                                <ResumeListItem/>
                            </MakeDraggable>
                        </List>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

function ResumeListItem(props: any) {
    const [removeSkill] = useMutation(REMOVE_SKILL, {
        refetchQueries: [
            {query: GET_USER, variables: {id: props.userId}}
        ]
    })
    return (
        <>
            <ListItem alignItems="flex-start"
                      className={'mt-12 mb-12'}
            >
                <Typography variant={"h6"}>{props.text}</Typography>
                {!props.readOnly && (
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="comments"
                                    onClick={() => removeSkill({
                                        variables: {
                                            type: props.type,
                                            text: props.text
                                        }
                                    })}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                )}
            </ListItem>
            <Divider/>
        </>
    )
}

export default ResumeSection;

// @ts-ignore
Array.prototype.moveUp = function (value, by) {
    var index = this.indexOf(value),
        newPos = index - (by || 1);

    if (index === -1)
        throw new Error("Element not found in array");

    if (newPos < 0)
        newPos = 0;

    this.splice(index, 1);
    this.splice(newPos, 0, value);
};

// @ts-ignore
Array.prototype.moveDown = function (value, by) {
    var index = this.indexOf(value),
        newPos = index + (by || 1);

    if (index === -1)
        throw new Error("Element not found in array");

    if (newPos >= this.length)
        newPos = this.length;

    this.splice(index, 1);
    this.splice(newPos, 0, value);
};
