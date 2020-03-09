import React, { FC } from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

export const FormikTextField: FC<{
  name: string;
  type?: string;
  label: string;
  required?: any;
  [a: string]: any;
}> = props => {
  const req = props.required === undefined ? true : props.required;
  return (
    <Field
      className="mb-16"
      type={props.type || 'text'}
      name={props.name}
      label={props.label}
      component={TextField}
      autoFocus
      required={req}
      variant="outlined"
      {...props}
    />
  );
};

export const FormikCheckbox: FC<{
  [a: string]: any;
}> = props => (
  <Field
    className="mb-16"
    type={props.type || 'text'}
    name={props.name}
    label={props.label}
    component={TextField}
    autoFocus
    required
    variant="outlined"
    {...props}
  />
);
