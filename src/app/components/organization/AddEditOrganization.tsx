import React, { FC, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Field, Form as FinalForm } from 'react-final-form';
import { connect } from 'react-redux';
import AddressInput from '../shared/AddressInput';
import EditIcon from '@material-ui/icons/Edit';
import { createOrganization, editOrganization } from "../../../redux/actions/organizationActions";
import { Button, ListItemIcon, ListItemText, MenuItem, Icon, Dialog, DialogTitle, DialogContent, DialogActions, Fab, TextField, Tooltip } from '@material-ui/core';
import { useForm } from '@fuse/hooks'

const AddEditOrganization: FC<any> = ({ editOrganization, createOrganization, defaultValue = {} }) => {
    const { form, handleChange } = useForm({
        name: "",
        contactPhoneNumber: "",
        irsStatus: "",
        aboutUs: "",
        eid: "",
    });

    const latlong: any = {}
    if (defaultValue.lat) {
        Object.assign(latlong, { lat: defaultValue.lat, long: defaultValue.long });
    }

    const [latLong, changeLatLong] = useState(latlong);
    const [address, changeAddress] = useState(defaultValue.address || '');
    const [open, changeOpen] = useState(false)

    const onSubmit = (e: any) => {
        e.preventDefault()
        const toSubmit = { ...form, ...latLong, address };
        defaultValue.name ? editOrganization(defaultValue.id, toSubmit) : createOrganization(toSubmit)
        changeOpen(false)
    };

    const handleAddressChange = (addressObject: any) => {
        changeLatLong({
            lat: addressObject.latlng.lat,
            long: addressObject.latlng.lng
        });
        changeAddress(addressObject.value)
    };

    const trigger = defaultValue.name ? (
        <Tooltip title="Edit Organization" placement="bottom">
            <Fab onClick={() => changeOpen(true)} color='secondary' size="small">
                <EditIcon />
            </Fab>
        </Tooltip>

    ) : (
            <MenuItem onClick={() => changeOpen(true)}>
                <ListItemIcon className="min-w-40">
                    <Icon>add</Icon>
                </ListItemIcon>
                <ListItemText className="pl-0" primary={"Create New Theatre"} />
            </MenuItem>
        );

    const header = defaultValue.name ? <span>Edit {defaultValue.name}</span> : <span>Create A New Organization</span>;

    return (
        <>
            {trigger}
            <Dialog
                open={open}
                fullWidth={true}
                onClose={() => {
                    changeOpen(false);
                }}>
                <DialogTitle>{header}</DialogTitle>
                <DialogContent>
                    <form
                        name="registerForm"
                        noValidate
                        className="flex flex-col justify-center w-full"
                        onSubmit={onSubmit}
                    >
                        <TextField
                            className="mb-16"
                            label="Organization Name"
                            type="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <AddressInput
                            type={'address'}
                            label="Address"
                            variant="standard"
                            defaultValue={defaultValue.address}
                            handleChange={handleAddressChange} />
                        <TextField
                            className="mb-16"
                            label="Contact Phone Number"
                            type="contactPhoneNumber"
                            name="contactPhoneNumber"
                            value={form.contactPhoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            className="mb-16"
                            label="IRS Status"
                            type="irsStatus"
                            name="irsStatus"
                            value={form.irsStatus}
                            onChange={handleChange}
                        />
                        <TextField
                            className="mb-16"
                            label="About Us"
                            type="aboutUs"
                            name="aboutUs"
                            multiline={true}
                            rows={3}
                            value={form.aboutUs}
                            onChange={handleChange}
                        />
                        <TextField
                            className="mb-16"
                            label="EID Statement"
                            type="eid"
                            name="eid"
                            multiline={true}
                            rows={3}
                            value={form.eid}
                            onChange={handleChange}
                        />
                        <DialogActions>
                            <Button variant='contained' color="secondary" onClick={() => changeOpen(false)}>Cancel</Button>
                            <Button variant='contained' color="primary" type={'submit'}>Save Organization</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default connect(null, { editOrganization, createOrganization })(AddEditOrganization);
