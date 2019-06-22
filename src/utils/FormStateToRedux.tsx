import React, {FC} from 'react';
import {connect} from 'react-redux';
import {FormSpy} from 'react-final-form';
import {updateFormState} from '../reducers/finalFormReducer';

const FormStateToRedux: FC<any> = ({form, updateFormState}) => (
    <FormSpy onChange={state => updateFormState(form, state)}/>
);

export default connect(undefined, {updateFormState})(FormStateToRedux);
