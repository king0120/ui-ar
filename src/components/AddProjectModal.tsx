import React, {FC, SyntheticEvent, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

const AddProjectModal: FC<{ handleSubmit: (val: any) => void }> = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [auditionDate, setAuditionDate] = useState(new Date());
    const [callbackDate, setCallbackDate] = useState(new Date());

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.handleSubmit({
            name,
            shortName,
            director,
            writer,
            auditionDate: auditionDate.toString(),
            callbackDate: callbackDate.toString()
        });
        setOpen(false);
    };

    return (
        <Modal
            closeOnDimmerClick
            closeIcon
            open={open}
            trigger={
                <Button onClick={() => setOpen(true)} primary>Add New Project</Button>
            }
            onClose={() => {
                setOpen(false);
            }}>
            <Modal.Header>Create New Project</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form>
                        <Form.Field onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Short Name</label>
                            <input value={shortName} onChange={e => setShortName(e.target.value)}
                                   placeholder='Short Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Director</label>
                            <input value={director} onChange={e => setDirector(e.target.value)} placeholder='Director'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Writer</label>
                            <input value={writer} onChange={e => setWriter(e.target.value)} placeholder='Writer'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Audition Date</label>
                            <DatePicker selected={auditionDate} onChange={(data: Date) => setAuditionDate(data)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Callback Date</label>
                            <DatePicker selected={callbackDate} onChange={(data: Date) => setCallbackDate(data)}/>
                        </Form.Field>
                        <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default AddProjectModal;
