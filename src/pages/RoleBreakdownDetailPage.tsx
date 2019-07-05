import React, {FC, useCallback, useEffect} from 'react';
import {useDropzone} from "react-dropzone";
import {StyleDropzone} from "./ProfileImagePage";
import {Divider, Header, Icon, Loader, Segment, List} from "semantic-ui-react";
import {connect} from "react-redux";
import {fetchRoleForProject, uploadDocument} from "../actions/roleActions";

function MyDropzone(props: any) {
    const onDrop = useCallback(acceptedFiles => {
        props.uploadDocument(props.projectId, props.id, acceptedFiles);
    }, [props]);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <StyleDropzone {...getRootProps()}>
            <Segment placeholder style={{width: '100%'}}>
                <Header icon>
                    <Icon name='file image outline'/>
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                    }
                </Header>
                <input {...getInputProps()} />
            </Segment>
        </StyleDropzone>
    );
}


const RoleBreakdownDetailPage: FC<any> = ({role, match, fetchRoleForProject, uploadDocument}) => {
    useEffect(() => {
        const {projectId, roleId} = match.params;
        fetchRoleForProject(projectId, roleId)
    }, [fetchRoleForProject, match])

    if (!role) {
        return <Loader/>
    }
    return (
        <div>
            <h1>{role.characterName}</h1>
            <Divider/>
            <h3>Character Summary</h3>
            <div>
                {role.characterSummary}
            </div>
            <h3>Movement Requirements</h3>
            <div>
                {role.movementRequirements}
            </div>
            <Divider/>
            <h3>Upload Documents for Role</h3>
            <MyDropzone projectId={match.params.projectId} id={match.params.roleId} uploadDocument={uploadDocument}/>
            <List>
                {role.collateral.map((item: any) => (
                    <List.Item key={item.key}>
                        <a href={item.url}>{item.key}</a>
                    </List.Item>
                ))}
            </List>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        role: state.roles.role,
    };
};

export default connect(mapStateToProps, {fetchRoleForProject, uploadDocument})(RoleBreakdownDetailPage);

