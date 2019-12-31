import React, { FC } from 'react';
import AddressInput from 'app/components/shared/AddressInput';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import AuditionType from './AuditionType';
import { FormikTextField } from 'app/components/shared/FormikTextField';
import { CheckboxWithLabel } from 'formik-material-ui';
import { Field } from 'formik';

interface IAuditionDetails {
  privateAudition: boolean;
  setPrivate: (p: boolean) => void;
  handleAddressChange: (a: string) => void;
  selectedDate: Date | null;
  setNewDate: (d: any) => void;
  selectedValue: any
  setSelectedValue: any;
  projectId: string;
  cloneAuditions: any;
  setCloneAuditions: any;
  setFieldValue: any
}

const AuditionDetails: FC<IAuditionDetails> = (props) => {
  return (
    <>
      <div className="flex justify-between align-baseline">
        <FormikTextField
          name={'name'}
          label={"Audition Name"}
          data-cy="audition-name"
          className="w-8/12"
        />
        <Field
          data-cy="private-audition"
          Label={{ label: 'Private Audition' }}
          name="privateAudition"
          id="privateAudition"
          component={CheckboxWithLabel}
        />
      </div>
      <div className="flex justify-between">
        <AddressInput
          data-cy="audition-address"
          handleChange={props.handleAddressChange}
          label="Address"
          type="address"
        />
      </div>
      <div className="flex justify-between">
        <KeyboardDateTimePicker
          label="Start Date and Time"
          variant="inline"
          value={props.selectedDate}
          disablePast={true}
          fullWidth
          onChange={(date) => { props.setFieldValue('selectedDate', date as any) }}
          ampm={true}
          format="MM/dd/yyyy hh:mm a"
          data-cy="audition-start-date"
        />
      </div>
      <div>
        <AuditionType
          projectId={props.projectId}
          selectedValue={props.selectedValue}
          setSelectedValue={props.setSelectedValue}
          cloneAuditions={props.cloneAuditions}
          setCloneAuditions={props.setCloneAuditions}
        />
      </div>
    </>
  );
};

export default AuditionDetails;
