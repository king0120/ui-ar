import {
    Avatar,
    Button,
    Chip,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    List,
    Typography
} from "@material-ui/core";
import gql from "graphql-tag";
import React, {FC, useContext, useState} from "react";
import {GlobalContext} from "../../../context/globalContext";
import {useMutation} from "@apollo/react-hooks";
import {useHistory} from "react-router";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {GET_TAGS_FOR_OWNER} from "./MyTags";
import ConfirmationModal from "../../components/shared/ConfirmationModal";


const TagSection: FC<any> = ({tagName, users}) => {
    const {userEmail} = useContext(GlobalContext);
  const DELETE_TAG = gql`
      mutation deleteTag($input: CreateTagDTO!) {
          deleteTag(input: $input)
      }
  `;
    const [deleteTag] = useMutation(DELETE_TAG, {
        refetchQueries: [{query: GET_TAGS_FOR_OWNER}]
    });
    const [open, setOpen] = useState(false);
    const {push} = useHistory();
    let emails = users?.map((user: any) => user.email).reduce((acc: string, val: string) => acc + val + ", ", "");
    emails = emails?.substring(0, emails.length - 1);
    return (
        <ExpansionPanel
            className="w-full p-2"
            expanded={open}
            onChange={() => setOpen(!open)}
        >
            <ExpansionPanelSummary className="p-0" style={{paddingLeft: '5px', paddingRight: '5px'}} expandIcon={<ExpandMoreIcon/>}>
                <div className="p-0 flex items-baseline justify-between items-center w-full">
                    <div onClick={() => push(`/tag/${tagName}`)}>
                        <Typography variant={"h6"}>{tagName}</Typography>
                        <Typography variant={"subtitle2"}>{users.length} actors</Typography>
                    </div>
                    <div className={'flex align-end '}>
                        {tagName !== "My Talent" && (
                            <ConfirmationModal
                                onConfirm={() => deleteTag({
                                    variables: {input: {tag: tagName, for: "all"}}
                                })}
                                trigger={
                                <Button size={"small"} variant={"contained"} color={'default'}>Delete Tag</Button>
                            }/>
                        )}
                        <Button size={"small"} variant={"contained"} color={'primary'}
                                href={`mailto:${userEmail}?bcc=${emails}`}>Email All</Button>
                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="pl-0">
                <List>
                    {!users && <Typography variant={"body1"}>No Tags Found</Typography>}
                    {users &&
                    users.map((user: any) => {
                        return (
                            <Chip
                                key={user.id}
                                // avatar={<Avatar src={user.profilePicture?.url}/>}
                                onClick={() => push(`/profile/${user.id}`)}
                                label={`${user.firstName} ${user.lastName}`}
                                onDelete={() => {
                                    deleteTag({
                                        variables: {input: {tag: tagName, for: user.id}}
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

export default TagSection
