import React, { FC, useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab, Dialog, Button, DialogContent, DialogActions, Tooltip } from "@material-ui/core";

const ConfirmationModal: FC<any> = ({ onConfirm, id }) => {
    const [open, changeOpen] = useState(false);

    return (
        <>
            <Tooltip title="Delete Item" placement="bottom">
                <Fab onClick={() => changeOpen(true)} color='primary' size="small">
                    <DeleteIcon />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => changeOpen(false)}
            >
                <DialogContent>
                    Are you sure you want to delete this?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeOpen(false)} color="primary">
                        No
          </Button>
                    <Button onClick={() => {
                        changeOpen(false)
                        onConfirm()
                    }} variant="outlined" color="primary" autoFocus>
                        Yes
            </Button>

                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmationModal
