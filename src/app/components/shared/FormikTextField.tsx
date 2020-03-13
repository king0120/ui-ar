import React, { FC } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";

const WithStyle = (props: any) => <TextField className={'mb-16'} {...props}/>
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
      type={props.type || "text"}
      name={props.name}
      label={props.label}
      component={WithStyle}
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
    type={props.type || "text"}
    name={props.name}
    label={props.label}
    component={WithStyle}
    autoFocus
    required
    variant="outlined"
    {...props}
  />
);
