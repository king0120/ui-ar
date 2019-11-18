import React, { FC, SyntheticEvent, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Button, TextField, DialogActions, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import gql from 'graphql-tag';
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/react-hooks';
const GET_PROJECTS_FOR_ORG = require('graphql/queries/projects/GET_PROJECTS_FOR_ORG.gql')
const CREATE_PROJECT = gql`
    mutation createProject($data: CreateProjectDTO!) {
        createProject(data: $data) {
            id
        }
    }
`

const AddProjectModal: FC<{ organizationId: string, handleSubmit: (val: any) => void }> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [shortName] = useState('');
    const [director, setDirector] = useState('');
    const [writer, setWriter] = useState('');
    const [rehearsalStart, setRehearsalStart] = useState(new Date());
    const [rehearsalEnd, setRehearsalEnd] = useState(new Date());
    const [performanceStart, setPerformanceStart] = useState(new Date());
    const [performanceEnd, setPerformanceEnd] = useState(new Date());
    const [createProject] = useMutation(CREATE_PROJECT, {
        onCompleted: () => {
            enqueueSnackbar("Successfully Saved New Project", {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            setOpen(false);
        },
        onError: (e) => {
            console.log(e.graphQLErrors)
            enqueueSnackbar(e.message, {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
        },
        refetchQueries: [{
            query: GET_PROJECTS_FOR_ORG,
            variables: { organizationId: props.organizationId }
        }]
    })
    const [summary, setSummary] = useState('')
    const [notes, setNotes] = useState('')

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        createProject({
            variables: {
                data: {
                    name,
                    shortName,
                    director,
                    writer,
                    summary,
                    notes,
                    organizationId: props.organizationId,
                    rehearsalDateStart: rehearsalStart.toString(),
                    rehearsalDateEnd: rehearsalEnd.toString(),
                    performanceDateStart: performanceStart.toString(),
                    performanceDateEnd: performanceEnd.toString(),
                }
            },
        });
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="contained" color="primary">Add New Project</Button>
            <Dialog
                open={open}
                fullWidth={true}
                onClose={() => {
                    setOpen(false);
                }}>
                <DialogTitle>Create a New Project</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            className="mb-16"
                            label="Name"
                            type="name"
                            name="name"
                            fullWidth={true}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <div className="w-full flex justify-between">
                            <TextField
                                className="mb-16 w-5/12"
                                label="Director"
                                type="director"
                                name="director"
                                value={director}
                                onChange={e => setDirector(e.target.value)}
                            />
                            <TextField
                                className="mb-16 w-6/12"
                                label="Writer"
                                type="writer"
                                name="writer"
                                value={writer}
                                onChange={e => setWriter(e.target.value)}
                            />
                        </div>
                        <TextField
                            className="mb-16"
                            label="Project Summary"
                            type="summary"
                            name="summary"
                            multiline={true}
                            fullWidth={true}
                            rows={3}
                            value={summary}
                            onChange={e => setSummary(e.target.value)}
                        />
                        <TextField
                            className="mb-16"
                            label="Project Notes (Rehearsal plan, location, days off, etc.)"
                            type="projectNotes"
                            name="projectNotes"
                            multiline={true}
                            fullWidth={true}
                            rows={3}
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                        <div className="mb-16 w-full flex justify-between">
                            <KeyboardDatePicker
                                label="Rehearsal Start Date"
                                variant="inline"
                                value={rehearsalStart}
                                disablePast={true}
                                onChange={(data: any) => { setRehearsalStart(data) }}
                                format="MM/dd/yyyy"
                            />
                            <KeyboardDatePicker
                                label="Rehearsal End Date"
                                variant="inline"
                                value={rehearsalEnd}
                                disablePast={true}
                                onChange={(data: any) => setRehearsalEnd(data)}
                                format="MM/dd/yyyy"
                            />
                        </div>
                        <div className="mb-16 w-full flex justify-between">
                            <KeyboardDatePicker
                                label="Performance Start Date"
                                variant="inline"
                                value={performanceStart}
                                disablePast={true}
                                onChange={(data: any) => setPerformanceStart(data)}
                                format="MM/dd/yyyy"
                            />
                            <KeyboardDatePicker
                                label="Performance End Date"
                                variant="inline"
                                value={performanceEnd}
                                disablePast={true}
                                onChange={(data: any) => setPerformanceEnd(data)}
                                format="MM/dd/yyyy"
                            />
                        </div>
                        <DialogActions>
                            <Button variant='contained' color="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button variant="contained" color="primary" type='submit' onClick={handleSubmit}>Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddProjectModal;
