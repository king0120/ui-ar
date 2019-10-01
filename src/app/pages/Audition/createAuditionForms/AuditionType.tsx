import React, { FC } from 'react';
import { Radio } from '@material-ui/core';

interface IAuditionType {
  selectedValue: string;
  setSelectedValue: (s: string) => void;
}

const AuditionType: FC<IAuditionType> = ({selectedValue, setSelectedValue}) => {
  return (
      <div className="flex justify-start mr-12">
        <div className="flex items-center">
          <Radio
            checked={selectedValue === 'general'}
            onChange={() => setSelectedValue('general')}
            value="general"
            name="auditionType"
          />
          <p>General</p>
        </div>
        <div className="flex items-center">
          <Radio
            checked={selectedValue === 'callback'}
            onChange={() => setSelectedValue('callback')}
            value="callback"
            name="auditionType"
          />
          <p>Callback</p>
        </div>
        <div className="flex items-center">
          <Radio
            checked={selectedValue === 'callForSubmissions'}
            onChange={() => setSelectedValue('callForSubmissions')}
            value="callForSubmissions"
            name="auditionType"
          />
          <p>Call For Submissions</p>
        </div>
      </div>
  );
};

export default AuditionType;