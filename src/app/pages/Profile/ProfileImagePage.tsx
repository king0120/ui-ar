import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import {
    deleteImage,
    uploadImage
} from '../../../redux/actions/talentActions';
import { Button } from 'semantic-ui-react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { withRouter } from 'react-router';
import LightboxModal from 'app/components/shared/LightboxModal';
import MyDropzone from 'app/components/shared/MyDropzone';
import { makeStyles } from '@material-ui/styles';

const GET_USER = require('../../../graphql/queries/user/GET_USER.gql');
const SET_PROFILE = require('../../../graphql/mutations/profile/SET_PROFILE.gql');
const DELETE_IMAGE = require('../../../graphql/mutations/profile/DELETE_IMAGE.gql');

const useStyles = makeStyles({
    imageList: {
        height: 300,
        width: 300,
        "object-fit": "scale-down"
    },
});

const ProfileImagePage: FC<any> = (props) => {
    const classes = useStyles();
    const { readOnly, userId } = props;
    const [open, setOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const { data, loading, refetch } = useQuery(GET_USER, { variables: { id: userId } });



    const refetchQuery = {
        refetchQueries: [{
            query: GET_USER,
            variables: { id: userId }
        }]
    }
    const [setProfile] = useMutation(SET_PROFILE, refetchQuery)
    const [deleteImage] = useMutation(DELETE_IMAGE, refetchQuery)

    const user = data && data.getUser;

    if (!data || loading) {
        return <h1>loading</h1>
    }

    return (
        <div>
            <LightboxModal
                open={open}
                handleClose={() => setOpen(false)}
                images={user.profileImages.map((p: any) => ({ src: p.url }))}
                currentIndex={currentIndex}
            />
            {!readOnly && <MyDropzone {...props} refetch={refetch} />}
            <div className="flex justify-start flex-wrap" >
                {user.profileImages && user.profileImages.map((img: any, index: number) => (
                    <div className="p-10" key={img.s3key}>
                        <img
                            className={classes.imageList}
                            src={img.url}
                            onClick={() => {
                                setOpen(true)
                                setCurrentIndex(index)
                            }}
                        />
                        {!readOnly && (
                            <div>
                                {(user.profilePicture && user.profilePicture.s3Key === img.s3Key) &&
                                    <p>Current Profile Pic</p>}
                                <Button
                                    onClick={() => setProfile({ variables: { key: img.s3Key } })}
                                    color={'green'}
                                >
                                    Set Profile Pic
                                </Button>
                                <Button
                                    onClick={() => deleteImage({ variables: { key: img.s3Key } })}
                                    color={'red'}
                                >
                                    Delete Image
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default connect(null, {
    uploadImage,
    deleteImage,
})(withRouter(ProfileImagePage));
