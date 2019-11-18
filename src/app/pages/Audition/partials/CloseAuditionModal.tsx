import React, { FC } from 'react';
import { Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from '@material-ui/core';
import { withRouter } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
const CLOSE_AUDITION = require('graphql/mutations/CLOSE_AUDITION.gql')

const CloseAuditionModal: FC<any> = (props) => {
  const { auditionId } = props;
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