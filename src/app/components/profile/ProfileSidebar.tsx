import React, {FC, useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {getFormState} from "../../../redux/store/reducers/finalFormReducer";
import {addUserBreakdown} from "../../../redux/actions/talentActions";
import TalentSpecificationsForm from "../shared/TalentSpecificationsForm";
import {
    ListItem,
    List,
    ListItemText,
    Modal,
    makeStyles,
    createStyles,
    Theme,
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    Typography, Chip
} from "@material-ui/core";
import {GlobalContext} from "context/globalContext";
import NotesOnActor from "../audition/NotesOnActor";
import EditUserModal from "./EditUserModal";
import TagsOnActor from "../audition/TagsOnActor";
import AddTags from "./AddTags";
import AddNotes from "./AddNotes";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        paper: {
            position: "absolute",
            width: 800,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3)
        },
        text: {
            color: theme.palette.secondary.light
        }
    });
});

const ListItemLink = (props: any) => {
    const history = useHistory();
    return <ListItem onClick={() => history.push(props.to)} {...props} />;
};

const AttributesModal: FC<any> = props => {
    const classes = useStyles();
    const [open, changeOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const handleSubmit = async () => {
        await props.addUserBreakdown(props.specs);
        changeOpen(false);
        window.location.reload();
    };

    return (
        <>
            <ListItemLink onClick={() => changeOpen(true)}>
                <ListItemText
                    classes={{secondary: classes.text}}
                    primary="Actor Breakdown"
                    secondary="Update Your Character Types"
                />
            </ListItemLink>
            <Modal onClose={() => changeOpen(false)} open={open}>
                <div style={modalStyle} className={classes.paper}>
                    <h1>Actor Attributes</h1>
                    <TalentSpecificationsForm
                        onSubmit={handleSubmit}
                        button={true}
                        breakdown={props.user.breakdown}
                    />
                </div>
            </Modal>
        </>
    );
};

const ProfileSidebar: FC<any> = (props: any) => {
    const classes = useStyles();
    const {userType} = useContext(GlobalContext);

    const canAddNotes = userType.includes("theatre");


    return (
        <div>
            {props.readOnly ? (props.user.ghostAccount ? (
                <Chip
                    color={"primary"}
                    label="Unverified Account"
                />
            ) : (
                <Chip
                    color={"primary"}
                    label="Verified Account"
                />
            )) : null}
            <List component="nav" aria-label="">
                {!props.readOnly && <AttributesModal {...props} />}
                {!props.readOnly && <EditUserModal user={props.user}/>}
                {props.readOnly && canAddNotes && !props.auditionView && <AddNotes user={props.user}/>}
                {props.readOnly && !props.auditionView && <AddTags user={props.user}/>}
            </List>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        specs: getFormState(state, "talentSpecs").values
    };
};

export default connect(mapStateToProps, {addUserBreakdown})(ProfileSidebar);
