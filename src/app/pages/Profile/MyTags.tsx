import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {Container, List, makeStyles, Paper, Typography} from "@material-ui/core";
import clsx from "clsx";
import TagSection from "./TagSection";
import {gql} from "apollo-boost";

export const GET_TAGS_FOR_OWNER = gql`
    {
        getTagsForOwner {
            id
            tag
            for {
                id
                firstName
                lastName
                email
                profilePicture {
                    url
                }
            }
        }
    }
`;
const useStyles = makeStyles(() => ({
    root: {
        minHeight: "80%"
    }
}));
const MyTags = () => {
    const [tags, setTags] = useState({} as any);
    const classes = useStyles();
    const {loading, data} = useQuery(GET_TAGS_FOR_OWNER);
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
    const tal = tags["My Talent"] ? [...tags["My Talent"]] : [];
    delete tags["My Talent"];
    return (
        <Container className="h-full">
            <Paper className={clsx(classes.root, "p-16 mt-36")}>
                <Typography variant="h5">My Tags</Typography>
                <List>
                    <TagSection tagName={"My Talent"} users={tal}/>
                    {Object.entries(tags).map(([tagName, users]: [any, any]) => {
                        return <TagSection key={tagName} tagName={tagName} users={users}/>;
                    })}
                </List>
            </Paper>
        </Container>
    );
};
export default MyTags;
