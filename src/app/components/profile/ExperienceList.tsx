import React, { FC, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { gql } from 'apollo-boost';

const REMOVE_EXPERIENCE = require('../../../graphql/mutations/profile/REMOVE_EXPERIENCE.gql');
const REORDER_EXPERIENCE = gql`
  mutation reorderExperience($data: ReorderExperienceDTO!) {
    reorderExperience(data: $data)
  }
`;

export const GET_EXPERIENCE = gql`
  query getExperience($data: ReorderExperienceDTO!) {
    getExperience(data: $data) {
      id
      role
      project
      company
      director
      index
    }
  }
`;

const ExperienceList: FC<any> = ({
  value,
  type,
  id,
  readOnly,
  draggable = false
}) => {
  const [, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [reorderExperienceItems, setReorderExperienceItems] = useState(false);
  const [removeExperience] = useMutation(REMOVE_EXPERIENCE, {
    refetchQueries: [
      {
        query: GET_EXPERIENCE,
        variables: {
          data: {
            userId: id,
            experienceType: value
          }
        }
      }
    ]
  });
  const { data } = useQuery(GET_EXPERIENCE, {
    variables: {
      data: {
        userId: id,
        experienceType: value
      }
    },
    skip: !id
  });
  const [reorderExperience] = useMutation(REORDER_EXPERIENCE);
  const [expItems, setExpItems] = useState([] as any);
  const experiences = data?.getExperience || [];
  useEffect(() => {
    const sorted = experiences.sort((a: any, b: any) => a.index - b.index);
    setExpItems(sorted);
  }, [experiences.length]);

  const onDragEnd = (result: any) => {
    const newOrder: any[] = [...expItems];
    newOrder.splice(
      result.destination.index,
      0,
      newOrder.splice(result.source.index, 1)[0]
    );
    setExpItems(newOrder as any[]);
  };

  const handleReorderItemsToggle = () => {
    setAnchorEl(null);
    if (reorderExperienceItems) {
      const indexedItems = expItems.map((item: any, index: number) => ({
        id: item.id,
        index
      }));
      reorderExperience({
        variables: {
          data: {
            experienceType: value,
            experienceOrder: indexedItems
          }
        }
      });
    }
    setReorderExperienceItems(!reorderExperienceItems);
  };

  if (!expItems) {
    return <h1>loading</h1>;
  }

  if (!expItems.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        title={
          <>
            {draggable && <DragIndicatorIcon />} {type}
          </>
        }
        action={
          !readOnly && (
            <Button onClick={handleReorderItemsToggle}>
              {reorderExperienceItems ? 'Save Items' : 'Reorder'}
            </Button>
          )
        }
        className={'pb-0'}
      />
      <CardContent className={'pt-0'}>
        <DragDropContext onDragEnd={onDragEnd}>
          {reorderExperienceItems ? (
            <Droppable droppableId="experienceItemsDroppable">
              {(provided: any, snapshot: any) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  <ListItem>
                    <ListItemText>
                      <div className={'flex'}>
                        <div className={'text-lg w-1/4'}>
                          <strong>Project: </strong>
                        </div>
                        <div className={'text-lg w-1/4'}>
                          <strong>Role:</strong>
                        </div>
                        <div className={'text-lg w-1/4'}>
                          <strong>Company: </strong>
                        </div>
                        <div className={'text-lg w-1/4'}>
                          <strong>Director: </strong>
                        </div>
                      </div>
                    </ListItemText>
                  </ListItem>
                  {expItems.map((exp: any, index: number) => (
                    <Draggable key={exp.id} draggableId={exp.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <ListItem
                            alignItems="flex-start"
                            className={'mt-12 mb-12'}
                          >
                            <ListItemIcon>
                              <DragIndicatorIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <div className={'flex'}>
                                  <div className={'w-1/4'}>{exp.project}</div>
                                  <div className={'w-1/4'}>{exp.role}</div>
                                  <div className={'w-1/4'}>{exp.company}</div>
                                  <div className={'w-1/4'}>{exp.director}</div>
                                </div>
                              }
                              secondary={exp.description}
                            />
                          </ListItem>
                          <Divider />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          ) : (
            <List>
              <ListItem>
                <ListItemText>
                  <div className={'flex'}>
                    <div className={'text-lg w-1/4'}>
                      <strong>Project: </strong>
                    </div>
                    <div className={'text-lg w-1/4'}>
                      <strong>Role:</strong>
                    </div>
                    <div className={'text-lg w-1/4'}>
                      <strong>Company: </strong>
                    </div>
                    <div className={'text-lg w-1/4'}>
                      <strong>Director: </strong>
                    </div>
                  </div>
                </ListItemText>
              </ListItem>
              {expItems.map((exp: any, i: number) => (
                <React.Fragment key={i}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <div className={'flex'}>
                          <div className={'w-1/4'}>{exp.project}</div>
                          <div className={'w-1/4'}>{exp.role}</div>
                          <div className={'w-1/4'}>{exp.company}</div>
                          <div className={'w-1/4'}>{exp.director}</div>
                        </div>
                      }
                      secondary={exp.description}
                    />
                    {!readOnly && (
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() =>
                            removeExperience({
                              variables: {
                                data: {
                                  experienceType: value,
                                  experienceId: exp.id
                                }
                              }
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}
        </DragDropContext>
      </CardContent>
    </Card>
  );
};

export default ExperienceList;
