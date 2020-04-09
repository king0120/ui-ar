import {
    Button, createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ListItem,
    ListItemText,
    makeStyles, Theme
} from "@material-ui/core";
import NotesOnActor from "../audition/NotesOnActor";
import React, {useState, FC} from "react";
interface AddNotesProps {
    user: Record<string, any>;
    trigger?: any;
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        text: {
            color: theme.palette.secondary.light
        }
    });
});

const AddNotes: FC<AddNotesProps> = (props) => {
    const classes = useStyles();
    const [notesOpen, setNotesOpen] = useState(false);
    const Trigger = props.trigger || ((props: any) =>
            <ListItem onClick={props.onClick}>
                <ListItemText
                    classes={{ secondary: classes.text }}
                    primary="Notes"
                    secondary="See and Add Notes On This Actor"
                    data-cy="add-notes"
                />
            </ListItem>
    );
    return (
        <>
            <Trigger onClick={() => setNotesOpen(true)}/>
            <Dialog className={"mh-1/2"} open={notesOpen} fullWidth={true}>
                <DialogTitle>Notes on {props.user.displayName}</DialogTitle>
                <DialogContent>
                    <NotesOnActor userId={props.user.id} auditionId={""}/>
                    <DialogActions>
                        <Button onClick={() => setNotesOpen(false)} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddNotes
