import React, { FC } from 'react';
import { TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import AddressInput from 'app/components/shared/AddressInput';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import AuditionType from './AuditionType';

interface IAuditionDetails {
  name: string;
  handleChange: () => void;
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
}

const AuditionDetails: FC<IAuditionDetails> = (props) => {
  return (
    <>
      <div className="flex justify-between align-baseline">
        <TextField
          className="mb-16 w-8/12"
          label="Audition Name"
          autoFocus
          type="name"
          name="name"
          value={props.name}
          onChange={props.handleChange}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.privateAudition}
              onChange={() => props.setPrivate(!props.privateAudition)}
              value="checkedB"
              color="primary"
            />
          }
          label="Private Audition" />
      </div>
      <div className="flex justify-between">
        <AddressInput handleChange={props.handleAddressChange} variant={'standard'} type="address" />
      </div>
      <div className="flex justify-between">
        <KeyboardDateTimePicker
          label="Start Date and Time"
          variant="inline"
          value={props.selectedDate}
          disablePast={true}
          fullWidth
          onChange={(date) => { props.setNewDate(date as any) }}
          ampm={true}
          format="MM/dd/yyyy hh:mm aaaa"
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