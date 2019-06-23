import React, {FC, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import {connect} from 'react-redux';
import AddressInput from './AddressInput';
import {createOrganization, editOrganization} from "../actions/organizationActions";

const AddEditOrganization: FC<any> = ({editOrganization, createOrganization, defaultValue = {}}) => {
    const latlong: any = {}
    if (defaultValue.lat) {
        Object.assign(latlong, {lat: defaultValue.lat, long: defaultValue.long});
    }

    const [latLong, changeLatLong] = useState(latlong);
    const [address, changeAddress] = useState(defaultValue.address || '');
    const [open, changeOpen] = useState(false)

    const onSubmit = (val: any) => {
        const toSubmit = {...val, ...latLong, address};
        defaultValue ? editOrganization(defaultValue.id, toSubmit) : createOrganization(toSubmit)
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
        <Button onClick={() => changeOpen(true)} circular={true} color='yellow' icon='edit'/>
    ) : (
        <Button onClick={() => changeOpen(true)} primary size={'small'}>Create New Organization</Button>
    );

    const header = defaultValue.name ? (
        <span>Edit {defaultValue.name}</span>
    ) : (
        <span>Create A New Organization</span>
    )
    return (
        <Modal
            open={open}
            closeOnDimmerClick
            closeIcon
            onClose={() => {
                changeOpen(false);
            }}
            trigger={trigger}>
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={defaultValue || {}}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label>Organization Name</label>
                                    <Field name={'name'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Address</label>
                                    <AddressInput defaultValue={defaultValue.address} handleChange={handleAddressChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Contact Phone Number</label>
                                    <Field name={'contactPhoneNumber'} component={'input'} type={'number'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>IRS Status</label>
                                    <Field name={'irsStatus'} component={'input'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>About Us</label>
                                    <Field name={'aboutUs'} component={'textarea'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>EID Statement</label>
                                    <Field name={'eid'} component={'textarea'}/>
                                </Form.Field>
                                <Button type={'submit'}>Save Organization</Button>
                            </Form>
                        )}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default connect(null, {editOrganization, createOrganization})(AddEditOrganization);
