import React, { FC } from 'react';
import { Radio, InputLabel, Select, MenuItem, Theme, Input, useTheme, FormControlLabel } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';

const GET_AUDITIONS_FOR_PROJECT = require('graphql/queries/auditions/GET_AUDITIONS_FOR_PROJECT.gql')
interface IAuditionType {
  selectedValue: string;
  setSelectedValue: (s: string) => void;
  projectId: string;
  cloneAuditions: any;
  setCloneAuditions: any
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, clonedAuditions: string[], theme: Theme) {
  return {
    fontWeight:
      clonedAuditions.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AuditionType: FC<IAuditionType> = ({ selectedValue, setSelectedValue, projectId, cloneAuditions, setCloneAuditions }) => {

  const { loading, data } = useQuery(GET_AUDITIONS_FOR_PROJECT, { variables: { projectId } })
  const theme = useTheme();

  return (
    <>
      <div className="flex justify-start mr-12">
        <div className="flex items-center">
          <FormControlLabel
            control={
              <Radio
                checked={selectedValue === 'general'}
                onChange={() => setSelectedValue('general')}
                value="general"
                name="auditionType"
              />
            }
            label="General" />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            control={
              <Radio
                checked={selectedValue === 'callback'}
                onChange={() => setSelectedValue('callback')}
                value="callback"
                name="auditionType"
              />
            }
            label="Callback" />
        </div>
        <div className="flex items-center">
          <FormControlLabel
            control={
              <Radio
                disabled={true}
                checked={selectedValue === 'callForSubmissions'}
                onChange={() => setSelectedValue('callForSubmissions')}
                value="callForSubmissions"
                name="auditionType"
              />
            }
            label="Call For Submissions" />
        </div>
      </div>
      {selectedValue === 'callback' && (
        <div>
          <InputLabel htmlFor="select-multiple">Import Actors from Audition(s)</InputLabel>
          <Select
            multiple
            fullWidth
            value={cloneAuditions}
            onChange={(e: any) => setCloneAuditions(e.target.value)}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {loading ? <></> :
              data.getAuditionsForProject.map((audition: any) => (
                <MenuItem key={audition.id} value={audition.id} style={getStyles(audition.id, cloneAuditions, theme)}>
                  {audition.name}
                </MenuItem>
              ))
            }
          </Select>
        </div>
      )}
    </>
  )
};

export default AuditionType;