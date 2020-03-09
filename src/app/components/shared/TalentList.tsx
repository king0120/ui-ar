import React, { FC, useState } from 'react';
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItem,
  ListItemText,
  Tabs,
  Tab
} from '@material-ui/core';
import TabPanel from './TabPanel';

interface ITalentList {
  talent: any[];
}

const TalentList: FC<ITalentList> = ({ talent = [] }) => {
  const [value, setValue] = useState(0);
  const confirmed = talent.filter(a => a.status === 'confirmed');
  const denied = talent.filter(a => a.status === 'denied');
  const unconfirmed = talent.filter(a => a.status === 'unconfirmed');
  return (
    <div>
      <Tabs
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
        aria-label="simple tabs example"
      >
        <Tab label={`Confirmed (${confirmed.length})`} />
        <Tab label={`Denied (${denied.length})`} />
        <Tab label={`Unconfirmed (${unconfirmed.length})`} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <List>
          {confirmed.map(actor => {
            return (
              <ListItem key={actor.id}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      actor.user.profilePicture && actor.user.profilePicture.url
                    }
                  />
                </ListItemAvatar>
                <ListItemText primary={actor.user.displayName} />
              </ListItem>
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List>
          {denied.map(actor => {
            return (
              <ListItem key={actor.id}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      actor.user.profilePicture && actor.user.profilePicture.url
                    }
                  />
                </ListItemAvatar>
                <ListItemText primary={actor.user.displayName} />
              </ListItem>
            );
          })}
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List>
          {unconfirmed.map(actor => {
            return (
              <ListItem key={actor.id}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      actor.user.profilePicture && actor.user.profilePicture.url
                    }
                  />
                </ListItemAvatar>
                <ListItemText primary={actor.user.displayName} />
              </ListItem>
            );
          })}
        </List>
      </TabPanel>
    </div>
  );
};

export default TalentList;
