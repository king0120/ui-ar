import {Button, ButtonGroup, Chip, Divider, List, makeStyles, Theme, Typography} from "@material-ui/core";
import React, {FC} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GET_TAGS_FOR_ACTOR} from "../../../components/audition/TagsOnActor";
import AddTags from "../../../components/profile/AddTags";
import AddNotes from "../../../components/profile/AddNotes";

interface SingleResultProps {
    actor: Record<string, any>,
    handleClickTalent: (id: string) => void
    includeEmail: boolean
}

function findUnion(actor: Record<string, any>) {
    let unions = 'Union Status Unknown'
    if (actor.breakdown.length) {
        const unionArray = actor.breakdown.filter((breakdown: Record<string, any>) => {
            return breakdown.category === 0
        })
        if (unionArray.length === 1) {
            unions = unionArray[0].value
        } else {
            unions = unionArray.map((u: any) => u.value).sort().join(', ')
        }
    }
    return unions
}

const useStyles = makeStyles((theme: Theme) => ({
    bigAvatar: {
        width: 'auto',
        maxWidth: 80,
        height: 'auto',
        maxHeight: 100,
        borderRadius: 5
    }
}));


const SingleResult: FC<SingleResultProps> = ({actor, handleClickTalent, includeEmail}) => {
    const classes = useStyles();
    const {data} = useQuery(GET_TAGS_FOR_ACTOR, {
        variables: {id: actor.id}
    });
    const tags = data?.getTagsForActor?.tags

    return (
        <div
            className="w-full flex content-between  mt-3 mb-3"
            key={actor.id}
        >
            <div style={{margin: '2px', width: '80px', height: '100px'}} className="flex justify-center items-center pl-8 pr-0" onClick={() => handleClickTalent(actor.id)}>
                <img
                    src={actor.profilePicture}
                    className={classes.bigAvatar}
                />
            </div>
            <div
                onClick={() => handleClickTalent(actor.id)}
                className="pl-1 w-1/2 flex flex-col align-center truncate font-600">
                <div className={"flex justify-between"}>
                    <Typography variant="h6">
                        {actor.firstName} {actor.lastName}
                    </Typography>

                </div>
                {actor.city && actor.state && (
                    <Typography variant="body1">
                        {actor.city}, {actor.state}
                    </Typography>
                )}
                <Typography variant="body1">
                    {findUnion(actor)}
                </Typography>
                <div style={{marginTop: 'auto'}}>
                    {tags?.length ? (
                        <Typography variant="body1">Tags:
                            {tags?.map((tagName: string) => (
                                <Chip
                                    key={tagName}
                                    className={'ml-1 mr-1'}
                                    size={'small'}
                                    label={tagName}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))}
                        </Typography>
                    ) : ''}
                </div>
            </div>
            <div className={'w-1/2 flex flex-col text-right mr-16'}>
                {includeEmail && (
                    <Typography variant="body1">
                        Email:{'  '}
                        <a style={{color: '#2196f3'}}
                           href={`mailto://${actor.email}}`}>{actor.email}</a>
                    </Typography>
                )}
                <div className={'w-3/8'}>
                    <AddTags user={actor}
                             trigger={(props: any) => <Button style={{marginRight: '.4rem'}} variant={"outlined"}
                                                              color={'primary'} onClick={props.onClick}>Add
                                 Tag</Button>}/>
                    <AddNotes user={actor} trigger={(props: any) => <Button variant={"outlined"} color={'secondary'}
                                                                            onClick={props.onClick}>Add
                        Notes</Button>}/>
                </div>

            </div>
        </div>
    )
}

export default SingleResult
