import React, { FC, SyntheticEvent, useState } from 'react';
import { Form, Modal } from 'semantic-ui-react';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { Button } from '@material-ui/core'

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
                <Button onClick={() => setOpen(true)} variant="contained" color="primary">Add New Project</Button>
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
                            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Director</label>
                            <input value={director} onChange={e => setDirector(e.target.value)} placeholder='Director' />
                        </Form.Field>
                        <Form.Field>
                            <label>Writer</label>
                            <input value={writer} onChange={e => setWriter(e.target.value)} placeholder='Writer' />
                        </Form.Field>
                        <Form.Field>
                            <label>Project Summary</label>
                            <textarea value={summary} onChange={e => setSummary(e.target.value)} placeholder='Summary' />
                        </Form.Field>
                        <Form.Field>
                            <label>Project Notes (Rehearsal plan, location, days off, etc.)</label>
                            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder='Notes' />
                        </Form.Field>
                        <div>
                            <Form.Field>
                                <KeyboardDateTimePicker
                                    label="Rehearsal Start Date"
                                    variant="inline"
                                    value={rehearsalStart}
                                    disablePast={true}
                                    onChange={(data: any) => { setRehearsalStart(data) }}
                                    ampm={true}
                                    format="MM/dd/yyyy hh:mm aaaa"
                                />
                            </Form.Field>
                            <Form.Field>
                                <KeyboardDateTimePicker
                                    label="Rehearsal End Date"
                                    variant="inline"
                                    value={rehearsalEnd}
                                    disablePast={true}
                                    onChange={(data: any) => setRehearsalEnd(data)}
                                    ampm={true}
                                    format="MM/dd/yyyy hh:mm aaaa"
                                />
                            </Form.Field>
                        </div>
                        <div>
                            <Form.Field>
                                <KeyboardDateTimePicker
                                    label="Performance Start Date"
                                    variant="inline"
                                    value={performanceStart}
                                    disablePast={true}
                                    onChange={(data: any) => setPerformanceStart(data)}
                                    ampm={true}
                                    format="MM/dd/yyyy hh:mm aaaa"
                                />
                            </Form.Field>
                            <Form.Field>
                                <KeyboardDateTimePicker
                                    label="Performance End Date"
                                    variant="inline"
                                    value={performanceEnd}
                                    disablePast={true}
                                    onChange={(data: any) => setPerformanceEnd(data)}
                                    ampm={true}
                                    format="MM/dd/yyyy hh:mm aaaa"
                                />
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
