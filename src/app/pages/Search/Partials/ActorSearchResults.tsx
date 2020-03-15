import React, {useState} from "react";
import {
    Divider,
    Paper,
    Typography
} from "@material-ui/core";
import FuseAnimateGroup from "vendor/@fuse/components/FuseAnimateGroup/FuseAnimateGroup";
import Pagination from "../../../components/shared/Pagination";
import SingleResult from "./SingleResult";

export const AnimateGroup: any = FuseAnimateGroup;

function ActorSearchResults(props: any) {
    const [selected, setSelectedPage] = useState(0);
    const changePage = (data: any) => setSelectedPage(data.selected);
    const sliceToShow =
        props.actors && props.actors.slice(selected * 10, selected * 10 + 10);
    return (
        <Paper
            style={{minHeight: "60vh"}}
            className="w-full shadow-none flex flex-col justify-between"
        >
            <div className="flex items-center justify-between px-16 h-64">
                <Typography className="text-16">Found Actors</Typography>
                <Typography className="text-11 font-500 rounded-4 text-white bg-blue px-8 py-4">
                    {props.actors.length + " Actors"}
                </Typography>
            </div>
            <div className="w-full min-w-full table-responsive flex-grow">
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
                            <SingleResult actor={actor} handleClickTalent={props.handleClickTalent}
                                          includeEmail={props.includeEmail}/>
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
