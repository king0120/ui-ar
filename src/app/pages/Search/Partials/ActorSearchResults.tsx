import React from 'react'
import { Avatar, Table, TableHead, TableCell, TableRow, Typography, Paper, TableBody, makeStyles, Divider } from '@material-ui/core';
import FuseAnimateGroup from '@fuse/components/FuseAnimateGroup/FuseAnimateGroup';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
  },
});

const AnimateGroup: any = FuseAnimateGroup
function ActorSearchResults(props: any) {
  const classes = useStyles();
  return (
    <Paper className="w-full shadow-none">
      <div className="flex items-center justify-between px-16 h-64">
        <Typography className="text-16">Found Actors</Typography>
        <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">{props.actors.length + " Actors"}</Typography>
      </div>
      <div className="w-full min-w-full table-responsive">
        <AnimateGroup
          className="w-full"
          enter={{
            animation: "transition.slideUpBigIn"
          }}
          leave={{
            animation: "transition.slideUpBigOut"
          }}
        >
          {props.actors && props.actors.map((actor: any) => (
            <>
              <div className='w-full flex content-between' key={actor.id} onClick={() => props.handleClickTalent(actor.id)}>
                <div className="pl-16 pr-0">
                  <Avatar src={actor.profilePicture} className={classes.bigAvatar} />
                </div>
                <div className="pl-64 flex flex-col justify-center align-center truncate font-600">
                  <Typography variant="body2">{actor.displayName}</Typography>
                  <Typography variant="subtitle2">{actor.city}, {actor.state}</Typography>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </AnimateGroup>
      </div>
    </Paper>
  );
}

export default React.memo(ActorSearchResults)