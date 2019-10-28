import React, { FC, SyntheticEvent, useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { editProject } from '../../../redux/actions/projectActions';
import { withRouter } from "react-router";
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import EditIcon from '@material-ui/icons/Edit';
import { Fab, Tooltip } from '@material-ui/core'

const AddProjectModal: FC<any> = (props) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(props.project.name);
    const [shortName, setShortName] = useState(props.project.shortName);
    const [director, setDirector] = useState(props.project.director);
    const [writer, setWriter] = useState(props.project.writer);
    const [auditionDate, setAuditionDate] = useState(new Date());
    const [callbackDate, setCallbackDate] = useState(new Date());
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const updatedProject = {
            id: props.project.id,
            name,
            shortName,
            director,
            writer,
            auditionDate: auditionDate.toString(),
            callbackDate: callbackDate.toString(),
            projectSummary: props.project.projectSummary,
            projectNotes: props.project.projectNotes,
        };
        try {
            await props.editProject(props.project.id, updatedProject);
            setOpen(false);
        } catch (err) {
            console.log('ERROR');
        }

    };

    return (
        <Modal
            closeOnDimmerClick
            closeIcon
            open={open}
            trigger={
                <Tooltip placement="bottom" title="Edit Project">
                    <Fab onClick={() => setOpen(true)} color='secondary' size="small">
                        <EditIcon />
                    </Fab>
                </Tooltip>
            }
            onClose={() => {
                setOpen(false);
            }}
        >
            <Modal.Header>Update {props.project.name}</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Form>
                        <Form.Field onSubmit={handleSubmit}>
                            <label>Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Short Name</label>
                            <input value={shortName} onChange={e => setShortName(e.target.value)}
                                placeholder='Short Name' />
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
                            <KeyboardDateTimePicker
                                label="Audition Date"
                                variant="inline"
                                value={auditionDate}
                                disablePast={true}
                                onChange={(data: any) => setAuditionDate(data)}
                                ampm={true}
                                format="MM/dd/yyyy hh:mm aaaa"
                            />
                        </Form.Field>
                        <Form.Field>
                            <KeyboardDateTimePicker
                                label="Callback Date"
                                variant="inline"
                                value={callbackDate}
                                disablePast={true}
                                onChange={(data: any) => setCallbackDate(data)}
                                ampm={true}
                                format="MM/dd/yyyy hh:mm aaaa"
                            />
                        </Form.Field>
                        <Button type='submit' onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default connect(null, { editProject })(withRouter(AddProjectModal));
