import React, { FC } from 'react';
import { TextField } from '@material-ui/core';

interface IAdditionalDetails {
  description: string;
  prep: string;
  handleChange: (p: any) => void;
}

const AdditionalDetails: FC<IAdditionalDetails> = ({description, prep, handleChange}) => {
  return (
    <div>
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
          rows="5"
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
          rows="5"
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