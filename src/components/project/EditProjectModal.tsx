import React, {FC, SyntheticEvent, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import {IProject} from '../../types/IProject';
import {connect} from 'react-redux';
import {editProject} from '../../actions/projectActions';
import {fetchOrganization} from '../../actions/organizationActions';

const AddProjectModal: FC<{
    project: IProject;
    fetchOrganization: (id: number) => void
    editProject: (id: number, project: IProject) => void,
    organizationId: number
}> = (props) => {
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
            await props.fetchOrganization(props.organizationId);
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
                <Button onClick={() => setOpen(true)} circular color="yellow" icon='edit'/>
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
                            <input value={name} onChange={e => setName(e.target.value)} placeholder='Name'/>
                        </Form.Field>
                        <Form.Field>
                            <label>Short Name</label>
                            <input value={shortName} onChange={e => setShortName(e.target.value)} placeholder='Short Name'/>
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

const mapStateToProps = (state: any) => {
    return {
        organizationId: state.organization.organization.id,
    };
}
export default connect(mapStateToProps, {editProject, fetchOrganization})(AddProjectModal);
