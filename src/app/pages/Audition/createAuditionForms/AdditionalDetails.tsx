import React, { FC } from 'react';
import { FormikTextField } from 'app/components/shared/FormikTextField';

const AdditionalDetails: FC = () => {
  return (
    <div>
      <div>
        <FormikTextField
          name={'description'}
          label={"Description"}
          data-cy="audition-desctiption"
          className="mb-16"
          variant="outlined"
          rows="5"
          multiline
          fullWidth
        />
      </div>
      {/* Audition Prep */}
      <div>
      <FormikTextField
          name={'prep'}
          label={"Audition Prep"}
          data-cy="audition-prep"
          className="mb-16"
          variant="outlined"
          rows="5"
          multiline
          fullWidth
        />
      </div>
    </div>
  );
};

export default AdditionalDetails;