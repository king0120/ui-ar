import React, { FC, useContext, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GlobalContext } from '../../../context/globalContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { Form, Formik } from 'formik';
import { FormikTextField } from '../shared/FormikTextField';
import * as Yup from 'yup';
import { gql } from 'apollo-boost';

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');

export const ADD_SKILL = gql`
  mutation addSkillOrTraining($type: String!, $text: String!) {
    addSkillOrTraining(type: $type, text: $text)
  }
`;

const initialValues = {
  text: ''
};

const validationSchema = Yup.object({
  text: Yup.string()
});

const AddSkillModal: FC<any> = props => {
  const [open, toggleOpen] = useState(false);
  const { userId } = useContext(GlobalContext);
  const [addSkill] = useMutation(ADD_SKILL, {
    refetchQueries: [
      {
        query: GET_USER,
        variables: { id: userId }
      }
    ]
  });
  const onSubmit = (data: any) => {
    addSkill({
      variables: {
        type: props.type,
        text: data.text
      }
    });
    toggleOpen(false);
  };
  return (
    <>
      <Button
        onClick={() => toggleOpen(true)}
        variant={'contained'}
        color="primary"
      >
        {props.type === 'skill' ? 'Add Skill' : 'Add Training'}
      </Button>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        fullWidth={true}
        open={open}
        onClose={() => toggleOpen(false)}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {fProps => (
            <>
              <DialogTitle>
                {props.type === 'skill'
                  ? 'Add A Special Skill'
                  : 'Add Training'}
              </DialogTitle>
              <DialogContent>
                <Form
                  name="addSkill"
                  className="flex flex-col justify-center w-full"
                >
                  <FormikTextField type={'text'} name={'text'} label={'Text'} />
                </Form>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => toggleOpen(false)} color="secondary">
                  Cancel
                </Button>
                <Button onClick={fProps.submitForm} color="primary" autoFocus>
                  {props.type === 'skill' ? 'Add Skill' : 'Add Training'}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default AddSkillModal;
