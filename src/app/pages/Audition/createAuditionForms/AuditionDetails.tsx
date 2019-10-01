import React, { FC } from 'react';
import { TextField, Checkbox } from '@material-ui/core';
import AddressInput from 'app/components/shared/AddressInput';
import { DateTimePicker } from '@material-ui/pickers';

interface IAuditionDetails {
  name: string;
  handleChange: () => void;
  privateAudition: boolean;
  setPrivate: (p: boolean) => void;
  handleAddressChange: (a: string) => void;
  selectedDate: Date;
  setNewDate: (d: Date) => void
}

const AuditionDetails: FC<IAuditionDetails> = (props) => {
  return (
    <div>
      <TextField
        className="mb-16"
        label="Audition Name"
        autoFocus
        type="name"
        name="name"
        value={props.name}
        onChange={props.handleChange}
        variant="outlined"
        required
        fullWidth
      />
      <div className="flex justify-start mr-12">
        <Checkbox
          checked={props.privateAudition}
          onChange={() => props.setPrivate(!props.privateAudition)}
          value="checkedB"
          color="primary"
        />
        <p>Private Audition</p>
      </div>
      {/* Address  */}
      <div>
        <AddressInput handleChange={props.handleAddressChange} />
      </div>
      <div>
        <DateTimePicker
          label="DateTimePicker"
          variant="inline"
          value={props.selectedDate}
          onChange={(date) => { props.setNewDate(date as any) }}
        />
      </div>

    </div>
  );
};

export default AuditionDetails;