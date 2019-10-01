import React, { FC } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number'
import { TextField } from '@material-ui/core';

interface IAdditionalDetails {
  setPhone: (p: any) => void;
  description: string;
  prep: string;
  handleChange: (p: any) => void;
}

const AdditionalDetails: FC<IAdditionalDetails> = ({setPhone, description, prep, handleChange}) => {
  return (
    <div>
      <div>
        <MuiPhoneNumber defaultCountry={'us'} onChange={setPhone} />
      </div>
      <div>
        <TextField
          className="mb-16"
          label="Description"
          autoFocus
          type="description"
          name="description"
          value={description}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
        />
      </div>
      {/* Audition Prep */}
      <div>
        <TextField
          className="mb-16"
          label="Audition Prep"
          autoFocus
          type="prep"
          name="prep"
          value={prep}
          onChange={handleChange}
          variant="outlined"
          multiline
          fullWidth
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;