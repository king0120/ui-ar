import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  height: 150px;
  border: 3px dashed grey;
  border-radius: 5px;
  flex-direction: column;
  margin: 0 auto;
`;

export default function MyDropzone(props: any) {
  const { uploadImage, refetch } = props;
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      uploadImage(acceptedFiles).then(refetch);
    },
    [uploadImage, refetch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <StyledBox>
        <CloudUploadIcon />
        <Typography variant={'h6'}>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </Typography>
        <input {...getInputProps()} />
      </StyledBox>
    </div>
  );
}
