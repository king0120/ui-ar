import * as Yup from "yup";
import {
    Button, createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel, ListItem, ListItemText, makeStyles,
    MenuItem, Theme,
    Typography,
} from "@material-ui/core";
import React from "react";
import {Field, Form, Formik} from "formik";
import {FormikTextField} from "../shared/FormikTextField";
import AddressInput from "../shared/AddressInput";
import {Select} from "formik-material-ui";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    city: Yup.string(),
    state: Yup.string(),
    website: Yup.string()
});

const UPDATE_USER = gql`
    mutation updateUser($data: UserDataDTO!){
        updateUser(data: $data)
    }
`

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        text: {
            color: theme.palette.secondary.light
        }
    })
});

function EditUserModal({user}: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [updateUser] = useMutation(UPDATE_USER, {
        refetchQueries: [{query: GET_USER, variables: {id: user.id}}]
    });
    if (!user) {
        return <p>loading</p>
    }
    console.log(user)
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        city: user.city,
        state: user.state,
        website: user.website,
        gender: user.gender,
        phoneNumber: user.phoneNumber,
        heightInches: user.heightInches,
        eyeColor: user.eyeColor,
        hairColor: user.hairColor
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (values: any, {resetForm, setErrors}: any) => {
        console.log('hello')
        console.log(values)
        try {
            await updateUser({variables: {data: values}});
            resetForm()
            handleClose()
        } catch (error) {
            setErrors({submit: error.messages})
        }

    };

    return (
        <div>
            <ListItem onClick={handleOpen}>
                <ListItemText
                    classes={{ secondary: classes.text }}
                    primary="Update User"
                    secondary="Update General Attributes"
                />
            </ListItem>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {props => (
                    <Dialog
                        fullWidth
                        maxWidth="xs"
                        aria-labelledby="update-user-modal"
                        open={open}
                        onClose={handleClose}
                    >
                        <DialogTitle>Update User</DialogTitle>
                        <DialogContent className="flex flex-col items-center justify-center">
                            <Typography variant="h6" className="md:w-full mb-32"></Typography>
                            <Form
                                name="registerForm"
                                className="flex flex-col justify-center w-full"
                            >
                                <FormikTextField
                                    type="text"
                                    name="firstName"
                                    label="First Name"
                                />
                                <FormikTextField
                                    type="text"
                                    name="lastName"
                                    label="Last Name"
                                />
                                <AddressInput
                                    required={false}
                                    placeholder={`${user.city}, ${user.state}`}
                                    handleChange={(city: string, state: string) => {
                                        props.setFieldValue('city', city)
                                        props.setFieldValue('state', state)
                                    }}
                                />
                                <FormikTextField
                                    required={false}
                                    type="website"
                                    name="website"
                                    label="Website"
                                />
                                <FormikTextField
                                    type="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                />
                                <FormikTextField
                                    type="text"
                                    name="heightInches"
                                    label="Height (in Inches)"
                                />
                                <FormControl>
                                    <InputLabel shrink={true} htmlFor="gender">
                                        Gender
                                    </InputLabel>
                                    <Field
                                        name="gender"
                                        select
                                        label="Gender"
                                        id="gender"
                                        component={Select}
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                        <MenuItem value={"nonbinary"}>Non-Binary</MenuItem>
                                        <MenuItem value={"private"}>Private</MenuItem>
                                    </Field>
                                </FormControl>
                                <FormControl>
                                    <InputLabel shrink={true} htmlFor="eyeColor">
                                        Eye Color
                                    </InputLabel>
                                    <Field
                                        name="eyeColor"
                                        select
                                        label="Eye Color"
                                        id="eyeColor"
                                        component={Select}
                                    >
                                        <MenuItem value={"brown"}>Brown</MenuItem>
                                        <MenuItem value={"hazel"}>Hazel</MenuItem>
                                        <MenuItem value={"blue"}>Blue</MenuItem>
                                        <MenuItem value={"green"}>Green</MenuItem>
                                        <MenuItem value={"gray"}>Gray</MenuItem>
                                        <MenuItem value={"amber"}>Amber</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Field>
                                </FormControl>
                                <FormControl>
                                    <InputLabel shrink={true} htmlFor="eyeColor">
                                        Hair Color
                                    </InputLabel>
                                    <Field
                                        label={"Hair Color"}
                                        name="hairColor"
                                        id="hairColor"
                                        component={Select}
                                    >
                                        <MenuItem value={"black"}>Black</MenuItem>
                                        <MenuItem value={"brown"}>Brown</MenuItem>
                                        <MenuItem value={"red"}>Red</MenuItem>
                                        <MenuItem value={"blonde"}>Blonde</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                        <MenuItem value={"unknown"}>Unknown</MenuItem>
                                    </Field>
                                </FormControl>
                                <DialogActions>
                                    <Button onClick={handleClose} color="secondary">
                                        Cancel
                                    </Button>
                                    <Button
                                        id="createAccount"
                                        variant="contained"
                                        color="primary"
                                        className="w-full mx-auto mt-16"
                                        aria-label="Register"
                                        disabled={!props.isValid}
                                        type="submit"
                                    >
                                        Update User
                                    </Button>
                                </DialogActions>
                            </Form>
                        </DialogContent>
                    </Dialog>
                )}
            </Formik>

        </div>
    )
}

export default EditUserModal
