import React, { FC, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fab,
  Tooltip
} from "@material-ui/core";

const ConfirmationModal: FC<any> = ({ onConfirm, id, trigger }) => {
  const [open, changeOpen] = useState(false);
  const trig = trigger ? (
    React.cloneElement(trigger, { onClick: () => changeOpen(true) })
  ) : (
    <Fab onClick={() => changeOpen(true)} color="primary" size="small">
      <DeleteIcon />
    </Fab>
  );

  return (
    <>
      <Tooltip title="Delete Item" placement="bottom">
        {trig}
      </Tooltip>
      <Dialog open={open} onClose={() => changeOpen(false)}>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={() => changeOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              changeOpen(false);
              onConfirm();
            }}
            variant="outlined"
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModal;
