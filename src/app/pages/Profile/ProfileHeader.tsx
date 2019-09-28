import React from 'react'
import { Animate } from '../Auth/SharedAuth';
import { Avatar, Typography, Button, makeStyles, Tabs, Tab } from '@material-ui/core';
import { transformPhoneNumber } from '../../../utils';

const ProfileHeader = ({ user }: any) => {
  return (
      <div className={"flex flex-1 flex-col items-center justify-center md:flex-row md:items-between"}>
          <div className="flex flex-1 flex-col items-between justify-start">
              <Animate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="h2" color="inherit">{user.displayName}</Typography>
              </Animate>
              <Animate animation="transition.expandIn" delay={300}>
                  <Typography variant="h4" color="inherit">{user.city}, {user.state}</Typography>
              </Animate>
          </div>

          <div className="flex flex-col items-between justify-end">
              <Animate animation="transition.expandIn" delay={300}>
                  <Typography variant="h6" color="inherit">{user.email}</Typography>
              </Animate>
              <Animate animation="transition.expandIn" delay={300}>
                  <Typography variant="h6" color="inherit">{transformPhoneNumber(user.phoneNumber)}</Typography>
              </Animate>
          </div>
      </div>
  )
}

export default ProfileHeader