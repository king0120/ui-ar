import React, { useEffect, useRef, useState } from 'react';
import { Icon, Typography, Paper, IconButton, Select, MenuItem, Button } from '@material-ui/core';
import { decisionOptions } from './AuditionPage'

function CastingDecision(props: any) {
  const { currentTalentId, changeDecision, decisionValue, setDecisionValue } = props


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
          {decisionOptions.map((option: any) => (
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
