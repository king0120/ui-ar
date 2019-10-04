import React from 'react';
import { Typography, Paper, Select, MenuItem, Button } from '@material-ui/core';

export let decisionOptions = [
  { key: 'pending', text: 'None', value: 'pending' },
  { key: 'no_thanks', text: 'No Thanks', value: 'no_thanks' },
  { key: 'on_hold', text: 'On Hold', value: 'on_hold' },
  { key: 'callback', text: 'Add To Callback', value: 'callback' },
];

function CastingDecision(props: any) {
  const { currentTalentId, changeDecision, decisionValue, setDecisionValue, forRoles } = props

  const roleOptions = forRoles.map((role: any) => {
    return {
      key: role.id, text: `Cast To ${role.characterName}`, value: role.id
    }
  })

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between pr-4 pl-16 pt-4">
        <Typography className="text-16">
          Casting Decision
                </Typography>
      </div>
      <div className="px-24 py-32">
        <Select
          className="w-full"
          autoWidth={true}
          value={decisionValue}
          onChange={(e: any) => setDecisionValue(e.target.value as string)}
        >
          {[...decisionOptions, ...roleOptions].map((option: any) => (
            <MenuItem key={option.key} value={option.value}>{option.text}</MenuItem>
          ))}
        </Select>
        <div className="flex justify-end">
          <Button className="mt-6" variant="contained" size="small" color="primary" onClick={() => (changeDecision(currentTalentId))}>Submit Decision</Button>
        </div>
      </div>
    </Paper>
  );
}

export default React.memo(CastingDecision);
