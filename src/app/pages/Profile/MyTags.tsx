import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {
  Avatar,
  Chip,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  makeStyles,
  Paper,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '80%'
  }
}));

export const GET_TAGS_FOR_OWNER = gql`
  {
    getTagsForOwner {
      id
      tag
      for {
        id
        firstName
        lastName
        profilePicture {
          url
        }
      }
    }
  }
`;

const TagSection: FC<any> = ({ tagName, users }) => {
  const DELETE_TAG = gql`
    mutation deleteTag($input: CreateTagDTO!) {
      deleteTag(input: $input)
    }
  `;
  const [deleteTag] = useMutation(DELETE_TAG, {
    refetchQueries: [{ query: GET_TAGS_FOR_OWNER }]
  });
  const [open, setOpen] = useState(true);
  const { push } = useHistory();
  return (
    <ExpansionPanel
      className="w-full p-2"
      expanded={open}
      onChange={() => setOpen(!open)}
    >
      <ExpansionPanelSummary className="p-0" expandIcon={<ExpandMoreIcon />}>
        <div className="p-0 flex items-baseline justify-between">
          <Typography variant={'h5'}>{tagName}</Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className="pl-0 flex-col">
        <List>
          {!users && <Typography variant={'body1'}>No Tags Found</Typography>}
          {users &&
            users.map((user: any) => {
              return (
                <Chip
                  key={user.id}
                  avatar={<Avatar src={user.profilePicture?.url} />}
                  onClick={() => push(`/profile/${user.id}`)}
                  label={`${user.firstName} ${user.lastName}`}
                  onDelete={() => {
                    deleteTag({
                      variables: { input: { tag: tagName, for: user.id } }
                    });
                  }}
                  variant="outlined"
                />
              );
            })}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

const MyTags = () => {
  const [tags, setTags] = useState({} as any);
  const classes = useStyles();
  const { loading, data } = useQuery(GET_TAGS_FOR_OWNER);
  useEffect(() => {
    if (data?.getTagsForOwner) {
      const tagsObject = data.getTagsForOwner.reduce((acc: any, val: any) => {
        if (acc[val.tag]) {
          acc[val.tag].push(val.for);
        } else {
          acc[val.tag] = [val.for];
        }
        return acc;
      }, {});
      setTags(tagsObject);
    }
  }, [data, data?.getTagsForOwner]);
  if (loading) {
    return <h1>Loading</h1>;
  }
  const tal = tags['My Talent'] ? [...tags['My Talent']] : [];
  delete tags['My Talent'];
  return (
    <Container className="h-full">
      <Paper className={clsx(classes.root, 'p-16 mt-36')}>
        <Typography variant="h4">My Tags</Typography>
        <List>
          <TagSection tagName={'My Talent'} users={tal} />
          {Object.entries(tags).map(([tagName, users]: [any, any]) => {
            return <TagSection key={tagName} tagName={tagName} users={users} />;
          })}
        </List>
      </Paper>
    </Container>
  );
};

export default MyTags;
