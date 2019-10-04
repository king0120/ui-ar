import React, { FC } from 'react'
import { Checkbox, Typography, FormControlLabel, Tooltip } from '@material-ui/core'

interface IAuditionRoles {
  roles: any[];
  forRoles: any[];
  setForRoles: any;
}

const AuditionRoles: FC<IAuditionRoles> = ({ roles, forRoles, setForRoles }) => {
  return (
    <div className="flex-grow-1 flex flex-col justify-between">
      <Typography variant="body1">Which Roles Are You Auditioning For?</Typography>
      <div className="flex-grow-1 flex flex-wrap justify-start mr-12 mb-4">
        {roles.map((role: any) => (
          <Tooltip title={role.castTo ? `Cast to ${role.castTo.displayName}` : ''} aria-label="cast to">
          <FormControlLabel
            className='w-1/3'
            key={role.id}
            disabled={role.castTo}
            control={
                <Checkbox
                  color="primary"
                  value={role.id}
                  onClick={(e: any) => {
                    if (e.target.checked) {
                      setForRoles([...forRoles, role.id])
                    } else {
                      const filtered = forRoles.filter((r: any) => r === role.id)
                      setForRoles([...filtered])
                    }
                  }}
                  checked={forRoles.includes(role.id)}
                />
            }
            label={role.characterName} />
            </Tooltip>
        ))}
      </div>
    </div >
  )
}

export default AuditionRoles