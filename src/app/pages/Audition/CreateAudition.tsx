import React, {FC} from 'react';
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Button, makeStyles, Paper, Step, StepLabel, Stepper, Theme, Typography} from '@material-ui/core';
import AuditionDetails from './createAuditionForms/AuditionDetails';
import AdditionalDetails from './createAuditionForms/AdditionalDetails';
import AuditionRoles from './createAuditionForms/AuditionRoles';
import {ActorSearch} from '../Search/ActorSearchPage';
import ActorQuestions from './createAuditionForms/ActorQuestions';
import {Form, Formik, useFormikContext} from 'formik';
import * as Yup from 'yup';

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

const initialValues = {
    name: '',
    description: '',
    latLong: {},
    address: '',
    selectedDate: new Date(),
    selectedValues: 'general',
    privateAudition: false,
    cloneAuditions: [],
    forRoles: [],
    questions: ['Please list conflicts, leave blank if none.']
};


const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
});

const CreateAudition: FC<any> = (props) => {
    const {match} = props;
    const classes = useStyles();
    const {projectId} = match.params;
    const {data, loading} = useQuery(GET_ALL_ROLES, {variables: {projectId}});

    const handleAddressChange = (addressObject: any, setFieldValue: any) => {
        setFieldValue('latLong', {
            lat: addressObject.latlng.lat,
            long: addressObject.latlng.lng
        });
        setFieldValue('address', addressObject.value);
    };

    const steps = ['Audition Details', 'More Details', 'Choose Roles', 'Actor Questions',];
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            return props.handleSubmit();
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
                    handleAddressChange={(val: any) => handleAddressChange(val, props.setFieldValue)}
                    selectedDate={props.values.selectedDate}
                    selectedValue={props.values.selectedValue}
                    setSelectedValue={(val: any) => props.setFieldValue('selectedValue', val as any)}
                    projectId={projectId}
                    cloneAuditions={props.values.cloneAuditions}
                    setCloneAuditions={(val: any) => props.setFieldValue('cloneAuditions', val as any)}
                    {...props}
                />;
            case 1:
                return <AdditionalDetails/>;
            case 2:
                return <AuditionRoles
                    roles={roles}
                    forRoles={props.values.forRoles}
                    setForRoles={(val: any) => props.setFieldValue('forRoles', val as any)}
                />;
            case 3:
                return <ActorQuestions
                    questions={props.values.questions}
                    setQuestions={(val: any) => props.setFieldValue('questions', val as any)}
                />;
            case 4:
                // TODO ONE CLICK INVITE
                return <ActorSearch/>;
            default:
                throw new Error('Unknown step');
        }
    }

    if (loading) {
        return <h1>Loading</h1>;
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

                <Form
                    name="registerForm"
                    className="flex flex-col justify-center w-full"
                >
                    {getStepContent(activeStep)}
                </Form>
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

const FormikWrapper = (props: any) => {
    const {history} = props;
    const {projectId, organizationId} = props.match.params;
    const refetchQueries = [{
        query: GET_AUDITIONS_FOR_PROJECT,
        variables: {projectId}
    }];
    const [createAudition] = useMutation(CREATE_AUDITION, {refetchQueries});

    const onSubmit = async (values: any) => {
        const {
            name, address, selectedDate,
            selectedValue, privateAudition, forRoles,
            questions, cloneAuditions
        } = values;
        const newAudition = {
            name,
            ...values.latLong,
            address,
            startDate: selectedDate,
            auditionType: selectedValue,
            private: privateAudition,
            description: values.description,
            prep: values.prep,
            forRoles: forRoles,
            questions,
            cloneAuditions
        };
        await createAudition({
            variables: {
                projectId: projectId,
                audition: newAudition
            }
        });
        history.push(`/organization/${organizationId}/projects/${projectId}/auditions`);
    };


    return <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(fProps: any) => (
            <CreateAudition
                {...props}
                {...fProps}
            />
        )}
    </Formik>;
};

export default FormikWrapper;
