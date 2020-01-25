import {Button, Card, CardContent, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import AddSkillModal from "../../components/profile/AddSkillModal";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import React, {FC} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";

interface IResumeSection {
    title: string;
    readOnly: boolean;
    items: any[];
    type: 'skill' | 'training';
    profileOrder: string[];
    userId: string
}

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const MOVE_SECTION = gql`
    mutation moveSection($order: [String!]!) {
        moveSection(order: $order)
    }
`;

const ResumeSection: FC<IResumeSection> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [moveSection] = useMutation(MOVE_SECTION, {
        refetchQueries: [
            {query: GET_USER, variables: {id: props.userId}}
        ]
    });

    const moveUp = () => {
        console.log(props.profileOrder);
        const newOrder = [...props.profileOrder];
        // @ts-ignore
        newOrder.moveUp(props.type);
        console.log(newOrder);
        moveSection({
            variables: {order: newOrder}
        });
    };

    const moveDown = () => {
        console.log(props.profileOrder);
        const newOrder = [...props.profileOrder];
        // @ts-ignore
        newOrder.moveDown(props.type);
        moveSection({
            variables: {order: newOrder}
        });
    };

    return (
        <>
            <div className={'flex justify-between mt-8 mb-8'}>
                <Typography variant={"h4"}>{props.title}</Typography>
                {!props.readOnly && (
                    <div>
                        <AddSkillModal type={props.type}/>
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
            <div>
                <Card>
                    <CardContent>
                        <List>
                            {
                                props.items && props.items.map((training: any, index: number) => (
                                    <>
                                        <ListItem alignItems="flex-start"
                                                  className={'mt-12 mb-12'}
                                                  key={training.id}
                                        >
                                            <Typography variant={"h6"}>{training.text}</Typography>
                                        </ListItem>
                                        <Divider/>
                                    </>
                                ))}
                        </List>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

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
