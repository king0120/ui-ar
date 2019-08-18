import React, {FC, SyntheticEvent, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';

const AddProjectModal: FC<{ handleSubmit: (val: any) => void }> = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [shortName] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [rehearsalStart, setRehearsalStart] = useState(new Date());
    const [rehearsalEnd, setRehearsalEnd] = useState(new Date());
    const [performanceStart, setPerformanceStart] = useState(new Date());
    const [performanceEnd, setPerformanceEnd] = useState(new Date());

    const [summary, setSummary] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        props.handleSubmit({
            name,
            shortName,
            director,
            writer,
            summary,
            notes,
            rehearsalDateStart: rehearsalStart.toString(),
            rehearsalDateEnd: rehearsalEnd.toString(),
            performanceDateStart: performanceStart.toString(),
            performanceDateEnd: performanceEnd.toString(),
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
                            <label>Director</label>
                            <input value={director} onChange={e => setDirector(e.target.value)} placeholder='Director'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Writer</label>
                            <input value={writer} onChange={e => setWriter(e.target.value)} placeholder='Writer'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Project Summary</label>
                            <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder='Summary'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Project Notes (Rehearsal plan, location, days off, etc.)</label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder='Notes'/>
                        </Form.Field>
                        <div>
                            <Form.Field>
                                <label>Rehearsal Start Date</label>
                                <DatePicker selected={rehearsalStart} onChange={(data: Date) => setRehearsalStart(data)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Rehearsal End Date</label>
                                <DatePicker selected={rehearsalEnd} onChange={(data: Date) => setRehearsalEnd(data)}/>
                            </Form.Field>
                        </div>
                        <div>
                            <Form.Field>
                                <label>Performance Start Date</label>
                                <DatePicker selected={performanceStart} onChange={(data: Date) => setPerformanceStart(data)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Performance End Date</label>
                                <DatePicker selected={performanceEnd} onChange={(data: Date) => setPerformanceEnd(data)}/>
                            </Form.Field>
                        </div>
                        <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default AddProjectModal;
