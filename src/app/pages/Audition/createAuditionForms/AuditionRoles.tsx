import React, { FC } from 'react'
import { Checkbox } from '@material-ui/core'

interface IAuditionRoles {
  roles: any[]
}

const AuditionRoles: FC<IAuditionRoles> = ({roles}) => {
  return (
    <div className="flex justify-start mr-12">
      {roles.map((role: any) => (
        <div>
          <Checkbox
            // checked={role.id}
            color="primary"
          />
          <p>{role.characterName}</p>
        </div>
      ))}
    </div>
  )
}

export default AuditionRoles