import React, {FC, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import {Field, Form as FinalForm} from 'react-final-form';
import {connect} from 'react-redux';
import AddressInput from './AddressInput';
import {createOrganization} from "../actions/organizationActions";

const AddOrganization: FC<any> = (props) => {
    const [latLong, changeLatLong] = useState({});
    const [address, changeAddress] = useState('');

    const onSubmit = (val: any) => {
        const toSubmit = {...val, ...latLong, address};
        console.log(toSubmit)
        props.createOrganization(toSubmit)
    };
    const handleAddressChange = (addressObject: any) => {
        changeLatLong({
            lat: addressObject.latlng.lat,
            long: addressObject.latlng.lng
        });
        changeAddress(addressObject.value)
    };
    return (
        <Modal
            trigger={
                <Button secondary>Create New Organization</Button>
            }>
            <Modal.Header>Create A New Organization</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <FinalForm
                        onSubmit={onSubmit}
                        initialValues={{}}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>
                                <AddressInput handleChange={handleAddressChange}/>
                                <Form.Field>
                                    <label>Organization Name</label>
                                    <Field name={'name'} component={'input'} type={'text'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Contact Phone Number</label>
                                    <Field name={'contactPhoneNumber'} component={'input'} type={'number'}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>IRS Status</label>
                                    <Field name={'irsStatus'} component={'input'}/>
                                </Form.Field>
                                <Form.Group>
                                    <label>About Us</label>
                                    <Field name={'aboutUs'} component={'textarea'}/>
                                </Form.Group>
                                <Form.Group>
                                    <label>EID Statement</label>
                                    <Field name={'eid'} component={'textarea'}/>
                                </Form.Group>
                                <Button type={'submit'}>Save Organization</Button>
                            </Form>
                        )}
                    />
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

const mapStateToProps = (state: any) => ({
    hello: 'world'
});

export default connect(mapStateToProps, { createOrganization })(AddOrganization);
