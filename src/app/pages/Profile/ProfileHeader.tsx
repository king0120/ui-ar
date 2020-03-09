import React from 'react';
import { Animate } from '../Auth/SharedAuth';
import { Typography } from '@material-ui/core';
import { transformPhoneNumber } from '../../../utils';
import capitalize from '../../../utils/stringUtils';

const ProfileHeader = ({ user }: any) => {
  const feet = Math.floor(user.heightInches / 12);
  const inches = user.heightInches % 12;
  return (
    <div
      className={
        'flex flex-1 flex-col items-center justify-center md:flex-row md:items-between'
      }
    >
      <div className="flex flex-1 flex-col items-between justify-start">
        <Animate animation="transition.slideLeftIn" delay={300}>
          <Typography
            data-cy="profile-display-name"
            variant="h2"
            color="inherit"
          >
            {user.firstName} {user.lastName}
          </Typography>
        </Animate>
        <Animate animation="transition.expandIn" delay={300}>
          <Typography data-cy="profile-address" variant="h6" color="inherit">
            {user.city}, {user.state}
          </Typography>
        </Animate>
        <Animate animation="transition.expandIn" delay={300}>
          <Typography data-cy="profile-address" variant="h6" color="inherit">
            Height: {feet} Feet, {inches} Inches
          </Typography>
        </Animate>
        <Animate animation="transition.expandIn" delay={300}>
          <Typography data-cy="profile-address" variant="h6" color="inherit">
            Eye: {capitalize(user.eyeColor)}, Hair: {capitalize(user.hairColor)}
          </Typography>
        </Animate>
      </div>

      <div className="flex flex-col items-between justify-end">
        {user.representation && (
          <Animate animation="transition.expandIn" delay={300}>
            <Typography
              data-cy="profile-representation"
              variant="h6"
              color="inherit"
            >
              Representation: {user.representation}
            </Typography>
          </Animate>
        )}
        <Animate animation="transition.expandIn" delay={300}>
          <Typography data-cy="profile-email" variant="h6" color="inherit">
            Email: <a href={`mailto://${user.email}`}>{user.email}</a>
          </Typography>
        </Animate>
        <Animate animation="transition.expandIn" delay={300}>
          <Typography data-cy="profile-phone" variant="h6" color="inherit">
            Phone:{' '}
            <a href={`tel://${user.phoneNumber}`}>
              {transformPhoneNumber(user.phoneNumber)}
            </a>
          </Typography>
        </Animate>
        {user.website && (
          <Animate animation="transition.expandIn" delay={300}>
            <Typography data-cy="profile-website" variant="h6" color="inherit">
              <a
                target={'_blank'}
                rel="noopener noreferrer"
                href={user.website}
              >
                Personal Site
              </a>
            </Typography>
          </Animate>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
