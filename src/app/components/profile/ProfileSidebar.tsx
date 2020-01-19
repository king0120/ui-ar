import React, { FC, useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormState } from '../../../redux/store/reducers/finalFormReducer';
import { addUserBreakdown } from '../../../redux/actions/talentActions';
import TalentSpecificationsForm from '../shared/TalentSpecificationsForm';
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
    Typography
} from '@material-ui/core';
import LightboxModal from '../shared/LightboxModal';
import { GlobalContext } from 'context/globalContext';
import NotesOnActor from '../audition/NotesOnActor';
import EditUserModal from "../project/EditUserModal";
import TagsOnActor from "../audition/TagsOnActor";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        paper: {
            position: 'absolute',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        text: {
            color: theme.palette.secondary.light
        },
        profilePic: {
            height: 300,
            width: 250,
            borderRadius: 10,
            "object-fit": "scale-down"
        }
    })
});

const ListItemLink = (props: any) => {
    const history = useHistory()
    return <ListItem onClick={() => history.push(props.to)} {...props} />;
}

const AttributesModal: FC<any> = (props) => {
    const classes = useStyles();
    const [open, changeOpen] = useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const handleSubmit = async () => {
        await props.addUserBreakdown(props.specs);
        changeOpen(false);
        window.location.reload()
    };

    return (
        <>
            <ListItemLink onClick={() => changeOpen(true)}>
                <ListItemText
                    classes={{ secondary: classes.text }}
                    primary="Actor Breakdown"
                    secondary="Update Your Character Types"
                />
            </ListItemLink>
            <Modal onClose={() => changeOpen(false)} open={open}>
                <div style={modalStyle} className={classes.paper}>
                    <h1>Actor Attributes</h1>
                    <TalentSpecificationsForm onSubmit={handleSubmit} button={true} breakdown={props.user.breakdown} />
                </div>
            </Modal>
        </>
    );
};
declare const Chargebee: any;

// const handleUpgradeClick = () => {
//     const cb = Chargebee.getInstance();
//     cb.openCheckout({
//         hostedPage: (page: any) => {
//             console.log(page);
//             return Promise.resolve('success');
//         }
//     });
// };

const ProfileSidebar: FC<any> = (props: any) => {
    const classes = useStyles();
    const { userType } = useContext(GlobalContext);
    let imageUrl = 'https://image.shutterstock.com/z/stock-vector-default-avatar-profile-icon-grey-photo-placeholder-518740741.jpg';
    if (props.user.profilePicture && props.user.profilePicture.url) {
        imageUrl = props.user.profilePicture && props.user.profilePicture.url;
    }
    const canAddNotes = userType.includes('theatre')
    const [open, setOpen] = useState(false);
    const [notesOpen, setNotesOpen] = useState(false);
    const [tagsOpen, setTagsOpen] = useState(false);
    return (
        <div>
            <LightboxModal
                open={open}
                handleClose={() => setOpen(false)}
                images={[{ src: imageUrl }]}
            />
            <List component="nav" aria-label="">
                <ListItem>
                    <img data-cy="profile-picture" alt={props.user.displayName} className={classes.profilePic} onClick={() => setOpen(true)} src={imageUrl} />
                </ListItem>
                {!props.readOnly && (
                    <AttributesModal {...props} />
                )}
                {!props.readOnly && <EditUserModal user={props.user}/>}
                {props.readOnly && canAddNotes && !props.auditionView && (
                    <>
                        <ListItemLink onClick={() => setNotesOpen(true)}>
                            <ListItemText
                                classes={{ secondary: classes.text }}
                                primary="Notes"
                                secondary="See and Add Notes On This Actor"
                                data-cy="add-notes"
                            />
                        </ListItemLink>
                        <Dialog className={'mh-1/2'} open={notesOpen} fullWidth={true}>
                            <DialogTitle>Notes on {props.user.displayName}</DialogTitle>
                            <DialogContent>
                                <NotesOnActor userId={props.user.id} auditionId={''} />
                                {/* <AddNoteForActor userId={props.user.id} auditionId={''} /> */}
                                <DialogActions>
                                    <Button onClick={() => setNotesOpen(false)} color="primary">
                                        Close
                                </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
                {props.readOnly && !props.auditionView && (
                    <>
                        <ListItemLink onClick={() => setTagsOpen(true)}>
                            <ListItemText
                                classes={{ secondary: classes.text }}
                                primary="Tags"
                                secondary="See and Add Tags On This Actor"
                                data-cy="add-notes"
                            />
                        </ListItemLink>
                        <Dialog className={'mh-1/2'} open={tagsOpen} fullWidth={true}>
                            <DialogTitle>Tags for {props.user.displayName}</DialogTitle>
                            <DialogContent>
                                <Typography variant={"body2"}>Tags are private and are not shared with actor or other users</Typography>
                                <TagsOnActor userId={props.user.id}/>
                                {/* <AddNoteForActor userId={props.user.id} auditionId={''} /> */}
                                <DialogActions>
                                    <Button onClick={() => setTagsOpen(false)} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </DialogContent>
                        </Dialog>
                    </>
                )}
            </List>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        specs: getFormState(state, 'talentSpecs').values,
    };
};

export default connect(mapStateToProps, { addUserBreakdown })(ProfileSidebar);
