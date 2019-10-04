import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { Header, Icon, Segment  } from 'semantic-ui-react';

export default function MyDropzone(props: any) {
  const { uploadImage, refetch } = props;
  const onDrop = useCallback((acceptedFiles: any) => {
      uploadImage(acceptedFiles).then(refetch);
  }, [uploadImage, refetch]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
      <div {...getRootProps()}>
          <Segment placeholder style={{ width: '100%' }}>
              <Header icon>
                  <Icon name='file image outline' />
                  {
                      isDragActive ?
                          <p>Drop the files here ...</p> :
                          <p>Drag 'n' drop some files here, or click to select files</p>
                  }
              </Header>
              <input {...getInputProps()} />
          </Segment>
      </div>
  );
}