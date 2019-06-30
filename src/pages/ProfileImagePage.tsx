import React, {FC, useCallback, useEffect} from 'react';
import {connect} from 'react-redux';
import {deleteImage, getCurrentUserDetails, getProfileDetails, uploadImage} from '../actions/talentActions';
import {Button, Header, Icon, Image, Segment} from 'semantic-ui-react';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import GoBackButton from '../components/shared/GoBackButton';

const StyleDropzone = styled.div`
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
    }, [props.readOnly]);

    return (
        <div>
            <GoBackButton/>
            {!props.readOnly && <MyDropzone {...props}/>}
            <Image.Group>
                {props.user.profileImages && props.user.profileImages.map((img: any) => (
                    <div key={img.s3key}>
                        <Image rounded bordered size={'medium'} src={img.url}/>
                        {!props.readOnly && (
                            <Button
                                onClick={() => props.deleteImage(img.s3Key)}
                                color={'red'}
                            >
                                Delete Image
                            </Button>
                        )}
                    </div>
                ))}
            </Image.Group>
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
    deleteImage
})(ProfileImagePage);
