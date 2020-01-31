import React, {useState} from 'react';
import {Avatar, Divider, makeStyles, Paper, Theme, Typography} from '@material-ui/core';
import FuseAnimateGroup from '@fuse/components/FuseAnimateGroup/FuseAnimateGroup';
import Pagination from "../../../components/shared/Pagination";

const useStyles = makeStyles((theme: Theme) => ({
    bigAvatar: {
        margin: 10,
        width: 40,
        height: 40,
    }
}));

export const AnimateGroup: any = FuseAnimateGroup;

function ActorSearchResults(props: any) {
    const classes = useStyles();
    const [selected, setSelectedPage] = useState(0);
    const changePage = (data: any) => setSelectedPage(data.selected);
    const sliceToShow = props.actors && props.actors.slice(selected * 10, (selected * 10) + 10);
    return (
        <Paper className="w-full shadow-none">
            <div className="flex items-center justify-between px-16 h-64">
                <Typography className="text-16">Found Actors</Typography>
                <Typography
                    className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">{props.actors.length + " Actors"}</Typography>
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
                    {sliceToShow.map((actor: any) => (
                        <>
                            <div className='w-full flex content-between' key={actor.id}
                                 onClick={() => props.handleClickTalent(actor.id)}>
                                <div className="pl-16 pr-0">
                                    <Avatar src={actor.profilePicture} className={classes.bigAvatar}/>
                                </div>
                                <div
                                    className="pl-16 w-full flex flex-col justify-center align-center truncate font-600">
                                    <div className={"flex justify-between w-full"}>
                                        <Typography variant="body2">{actor.firstName} {actor.lastName}</Typography>
                                        <Typography variant="subtitle2">{actor.city}, {actor.state}</Typography>
                                    </div>
                                    {props.includeEmail && <Typography variant="subtitle1"><a
                                        href={`mailto://${actor.email}}`}>{actor.email}</a></Typography>}
                                </div>
                            </div>
                            <Divider/>
                        </>
                    ))}
                </AnimateGroup>
            </div>
            <Pagination
                itemCount={props.actors.length}
                handlePageChange={changePage}
            />
        </Paper>
    );
}

export default React.memo(ActorSearchResults);
