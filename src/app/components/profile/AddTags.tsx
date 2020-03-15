import {
    Button, createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItem,
    ListItemText, makeStyles, Theme,
    Typography
} from "@material-ui/core";
import TagsOnActor from "../audition/TagsOnActor";
import React, {FC, useState} from "react";

interface AddTagsProps {
    user: Record<string, any>
    trigger?: any
}
const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        text: {
            color: theme.palette.secondary.light
        }
    });
});

const AddTags: FC<AddTagsProps> = (props) => {
    const classes = useStyles();
    const [tagsOpen, setTagsOpen] = useState(false);
    const Trigger = props.trigger || ((props: any) =>
        <ListItem onClick={props.onClick}>
            <ListItemText
                classes={{ secondary: classes.text }}
                primary="Tags"
                secondary="See and Add Tags On This Actor"
                data-cy="add-notes"
            />
        </ListItem>
    )
    return (
        <>
            <Trigger onClick={() => setTagsOpen(true)}/>
            <Dialog className={"mh-1/2"} open={tagsOpen} fullWidth={true}>
                <DialogTitle>Tags for {props.user.displayName}</DialogTitle>
                <DialogContent>
                    <Typography variant={"body2"}>
                        Tags are private and are not shared with actor or other users
                    </Typography>
                    <TagsOnActor userId={props.user.id} />
                    <DialogActions>
                        <Button onClick={() => setTagsOpen(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddTags
