import React, { FC } from 'react';
import { Button, Dialog, makeStyles, createStyles, Theme, Typography, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
const CLOSE_AUDITION = require('graphql/mutations/CLOSE_AUDITION.gql')

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

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
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const CloseAuditionModal: FC<any> = (props) => {
  const classes = useStyles();
  const { auditionId } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [close] = useMutation(CLOSE_AUDITION, { variables: { auditionId } })

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeAudition = async () => {
    handleClose()
    const { organizationId, projectId } = props.match.params;
    await close()
    props.history.push(`/organization/${organizationId}/projects/${projectId}/dashboard`)
  }
  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
      >
        Close Audition
      </Button>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Close Audition</DialogTitle>
        {props.talent.pending.length ? (
          <DialogContent>
            <DialogContentText>
              There are still actors pending audition, are you sure you want to close this audition?
              </DialogContentText>
          </DialogContent>
        ) : (
            <DialogContent>
              <DialogContentText>
                This action will end this audition. Actors in callback and on hold will be placed in a new callback audition.  Actors in "No Thanks" will be placed in a queue for emails to be sent.
              </DialogContentText>
              <DialogContentText>
                Are you sure you want to close this audition?
              </DialogContentText>
            </DialogContent>
          )}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
              </Button>
          <Button onClick={closeAudition} color="primary" autoFocus>
            Close Audition
              </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(CloseAuditionModal);