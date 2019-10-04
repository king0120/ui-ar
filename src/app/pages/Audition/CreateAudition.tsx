import React, { FC, useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useForm } from '@fuse/hooks';
import { Button, Paper, makeStyles, Theme, Typography, Stepper, StepLabel, Step } from '@material-ui/core';
import AuditionDetails from './createAuditionForms/AuditionDetails';
import AdditionalDetails from './createAuditionForms/AdditionalDetails';
import AuditionRoles from './createAuditionForms/AuditionRoles';
import { ActorSearch } from '../Search/ActorSearchPage';
const CREATE_AUDITION = require('../../../graphql/mutations/CREATE_AUDITION.gql');
const GET_AUDITIONS_FOR_PROJECT = require('../../../graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql');
const GET_ALL_ROLES = require('../../../graphql/queries/roles/GET_ALL_ROLES.gql');

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const CreateAudition: FC<any> = ({ match, history }) => {
    const classes = useStyles()
    const { projectId, organizationId } = match.params;
    const refetchQueries = [{
        query: GET_AUDITIONS_FOR_PROJECT,
        variables: { projectId }
    }];
    const [latLong, changeLatLong] = useState({} as any);
    const [address, changeAddress] = useState('');
    const [selectedDate, setNewDate] = React.useState(new Date());
    const [createAudition] = useMutation(CREATE_AUDITION, { refetchQueries });
    const { data, loading } = useQuery(GET_ALL_ROLES, { variables: { projectId } });
    const [selectedValue, setSelectedValue] = React.useState('general');
    const [phone, setPhone] = React.useState(undefined);
    const [privateAudition, setPrivate] = React.useState(false);
    const [cloneAuditions, setCloneAuditions] = useState([])
    const [forRoles, setForRoles] = useState([])
    const { form, handleChange, resetForm } = useForm({
        name: '',
        description: '',
        prep: ''
    })
    const onSubmit = async () => {
        const newAudition = {
            name: form.name,
            ...latLong,
            address,
            startDate: selectedDate,
            auditionType: selectedValue,
            private: privateAudition,
            phoneNumber: "1111111111", //TODO use phone
            description: form.description,
            prep: form.prep,
            forRoles: forRoles,
            questions: [], //TODO ADD THIS,
            cloneAuditions
        }
        // const { status, question1, question2, question3, question4, question5, ...cleaned } = data;
        await createAudition({
            variables: {
                projectId: projectId,
                audition: newAudition
            }
        });
        history.push(`/organization/${organizationId}/projects/${projectId}/auditions`)
    };

    const handleAddressChange = (addressObject: any) => {
        changeLatLong({
            lat: addressObject.latlng.lat,
            long: addressObject.latlng.lng
        });
        changeAddress(addressObject.value);
    };

    function handleSubmit(ev: any) {
        ev.preventDefault();
        resetForm();
    }

    const steps = ['Audition Details', 'More Details', 'Choose Roles']
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            return onSubmit()
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step: any) {
        switch (step) {
            case 0:
                return <AuditionDetails
                    name={form.name}
                    handleChange={handleChange}
                    privateAudition={privateAudition}
                    setPrivate={setPrivate}
                    handleAddressChange={handleAddressChange}
                    selectedDate={selectedDate}
                    setNewDate={setNewDate}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                    projectId={projectId}
                    cloneAuditions={cloneAuditions}
                    setCloneAuditions={setCloneAuditions}
                />;
            case 1:
                return <AdditionalDetails
                    setPhone={setPhone}
                    description={form.description}
                    prep={form.prep}
                    handleChange={handleChange}
                />
            case 2:
                return <AuditionRoles
                    roles={roles}
                    forRoles={forRoles}
                    setForRoles={setForRoles}
                />;
            case 3:
                return <ActorSearch />;
            default:
                throw new Error('Unknown step');
        }
    }

    if (loading) {
        return <h1>Loading</h1>
    }
    const roles = data.getAllRoles;

    return (
        <main className={classes.layout}>
            <Paper className={classes.paper + " flex flex-col jusitify-between min-h-half"}>
                <Typography variant="h6">Create A New Audition</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form
                    name="createAuditionForm"
                    noValidate
                    className="flex flex-col w-full flex-grow"
                    onSubmit={handleSubmit}
                >
                    {getStepContent(activeStep)}
                </form>
                <div className={classes.buttons}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                            Back
                    </Button>
                    )}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Create Audition' : 'Next'}
                    </Button>
                </div>
            </Paper>
        </main>
    );
};


export default CreateAudition;
