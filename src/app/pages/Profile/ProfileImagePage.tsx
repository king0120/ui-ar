import React, {FC, useCallback, useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {
    deleteImage,
    uploadImage
} from '../../../redux/actions/talentActions';
import {Button, Header, Icon, Image, Segment} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Flex from 'styled-flex-component'
import GoBackButton from '../../components/shared/GoBackButton';
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import {GlobalContext} from "../../../context/globalContext";

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');
const SET_PROFILE = require('../../../graphql/mutations/profile/SET_PROFILE.gql');
const DELETE_IMAGE = require('../../../graphql/mutations/profile/DELETE_IMAGE.gql');

export const StyleDropzone = styled.div`
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder.segment {
        display: flex;
        flex-direction: column;
        align-items: center
    }
`;

function MyDropzone(props: any) {
    const {uploadImage} = props;
    const onDrop = useCallback(acceptedFiles => {
        uploadImage(acceptedFiles);
    }, [uploadImage]);
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

const ProfileImagePage: FC<any> = (props) => {
    const {readOnly} = props;
    const [getUser, {data, loading}] = useLazyQuery(GET_USER);
    const {userId} = useContext(GlobalContext);

    const refetch = {
        refetchQueries: [{
            query: GET_USER,
            variables: {id: readOnly ? props.match.params.userId : userId}
        }]
    }
    const [setProfile] = useMutation(SET_PROFILE, refetch)
    const [deleteImage] = useMutation(DELETE_IMAGE, refetch )

    const user = data && data.getUser;

    useEffect(() => {
        const id = readOnly ? props.match.params.userId : userId;
        if (id) {
            getUser({variables: {id}})
        }
    }, [readOnly, userId, props.match.params.userId, getUser]);

    if (!data || loading) {
        return <h1>loading</h1>
    }
    return (
        <div>
            <GoBackButton/>
            {!props.readOnly && <MyDropzone {...props}/>}
            <Flex spaceBetween>
                {user.profileImages && user.profileImages.map((img: any) => (
                    <div key={img.s3key}>
                        <Image rounded bordered size={'medium'} src={img.url}/>
                        {!props.readOnly && (
                            <div>
                                {(user.profilePicture && user.profilePicture.s3Key === img.s3Key) &&
                                <p>Current Profile Pic</p>}
                                <Button
                                    onClick={() => setProfile({variables: {key: img.s3Key}})}
                                    color={'green'}
                                >
                                    Set Profile Pic
                                </Button>
                                <Button
                                    onClick={() => deleteImage({variables: {key: img.s3Key}})}
                                    color={'red'}
                                >
                                    Delete Image
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </Flex>
        </div>
    );
};

export default connect(null, {
    uploadImage,
    deleteImage,
})(ProfileImagePage);
