import React, {FC, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {
    deleteImage,
    getCurrentUserDetails,
    getProfileDetails,
    setProfilePic,
    uploadImage
} from '../actions/talentActions';
import {Button, Header, Icon, Image, Segment} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Flex from 'styled-flex-component'
import GoBackButton from '../components/shared/GoBackButton';

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
    const onDrop = useCallback(acceptedFiles => {
        props.uploadImage(acceptedFiles);
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

const ProfileImagePage: FC<any> = (props) => {

    useEffect(() => {
        if (props.readOnly) {
            props.getProfileDetails(props.match.params.userId);
        } else {
            props.getCurrentUserDetails(props.user.id);
        }
    }, [props.readOnly, props.match.params.userId]);

    return (
        <div>
            <GoBackButton/>
            {!props.readOnly && <MyDropzone {...props}/>}
            <Flex spaceBetween>
                {props.user.profileImages && props.user.profileImages.map((img: any) => (
                    <div key={img.s3key}>
                        <Image rounded bordered size={'medium'} src={img.url}/>
                        {!props.readOnly && (
                            <div>
                                {(props.user.profilePicture && props.user.profilePicture.s3Key === img.s3Key) && <p>Current Profile Pic</p>}
                                <Button
                                    onClick={() => props.setProfilePic(img.s3Key)}
                                    color={'green'}
                                >
                                    Set Profile Pic
                                </Button>
                            <Button
                                onClick={() => props.deleteImage(img.s3Key)}
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

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user,
    };
};
export default connect(mapStateToProps, {
    getProfileDetails,
    getCurrentUserDetails,
    uploadImage,
    deleteImage,
    setProfilePic
})(ProfileImagePage);
