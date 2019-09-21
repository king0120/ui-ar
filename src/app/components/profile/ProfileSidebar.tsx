import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFormState } from '../../../redux/store/reducers/finalFormReducer';
import { addUserBreakdown } from '../../../redux/actions/talentActions';
import TalentSpecificationsForm from '../shared/TalentSpecificationsForm';
import { ListItem, List, Divider, ListItemText, ListItemIcon, Modal, makeStyles, createStyles, Theme } from '@material-ui/core';
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

const ListItemLink = withRouter((props: any) => {
    return <ListItem button component="a" onClick={() => props.history.push(props.to)} {...props} />;
})

const ProfileSidebarStyle = styled(List)`
    &&& {
        width: 80%;
    }
`;

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
                <ListItemText primary="Experience/Skills" secondary="Update Recent Activity" />
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

const handleUpgradeClick = () => {
    const cb = Chargebee.getInstance();
    cb.openCheckout({
        hostedPage: (page: any) => {
            console.log(page);
            return Promise.resolve('success');
        }
    });
};

const ProfileSidebar: FC<any> = (props: any) => {
    const imagePageUrl = props.readOnly ? `/profile/${props.user.id}/images` : '/profile/images';
    let imageUrl = 'https://image.shutterstock.com/z/stock-vector-default-avatar-profile-icon-grey-photo-placeholder-518740741.jpg';
    if (props.user.profilePicture && props.user.profilePicture.url) {
        imageUrl = props.user.profilePicture && props.user.profilePicture.url;
    }
    return (
        <div>
            <List component="nav" aria-label="">
                <ListItem>
                    <img src={imageUrl} className="rounded-lg w-7/12" />
                </ListItem>
                <AttributesModal {...props} />
                <ListItemLink to={imagePageUrl}>
                    <ListItemText primary="Additional Photos" secondary={props.readOnly ? 'See Additional Photos' : 'See and Upload Additional Photos'} />
                </ListItemLink>
                {/* <ListItemLink>
                    <ListItemText onClick={handleUpgradeClick} primary="Upgrade Account"/>
                </ListItemLink> */}
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
