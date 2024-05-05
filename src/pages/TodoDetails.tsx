import { Button, Chip, Image, Input, Textarea } from '@nextui-org/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { getFileApi, uploadFileApi } from '../api/file';

const FileCard = (props: { id: string }) => {
  const [file, setFile] = useState<Blob | null>(null);

  // getFileApi
  useEffect(() => {
    getFileApi(props.id).then((_file: any) => {
      if (_file) {
        // const blob = new Blob([_file], { type: 'image/jpeg' });
        setFile(_file);
      }
    });
  }, []);

  if (!file) return null;

  console.log({ file: URL.createObjectURL(file) });

  return (
    <>
      {/* <pre>{file}</pre> */}
      <img src={URL.createObjectURL(file)} className="w-16 h-16" />
      <Image src={URL.createObjectURL(file)} className="w-16 h-16" />
    </>
  );
};

type Props = {};

export const TodoDetails = (props: Props) => {
  const { id } = useParams<{ id?: string }>();

  const [files, setFiles] = useState<File[]>([]);

  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    '663751250df40ec70ab9771d',
  ]);

  const todoDetails = {
    title: 'Frontend webapp',
    description: 'frontend app description something to be done',
    updatedAt: new Date(),
    completed: false,
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadFile = (file: File) => {
    uploadFileApi(file).then((data) => console.log(data));
  };

  return (
    <div className="p-4 flex justify-center w-full">
      <div className="flex items-center flex-col w-full max-w-xl gap-4">
        <div className="flex justify-between w-full items-center">
          <pre>{todoDetails.updatedAt.toDateString()}</pre>
          <Chip
            variant="flat"
            color={todoDetails.completed ? 'success' : 'warning'}
          >
            {todoDetails.completed ? 'Completed' : 'In-Progress'}
          </Chip>
        </div>
        <Input value={todoDetails.title} label="Title" />
        <Textarea value={todoDetails.description} label="Description" />

        <div
          {...getRootProps()}
          className="bg-white p-4 w-full border-dashed border border-default-400 hover:border-black"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <div className="flex gap-8 flex-wrap">
          <h1>Attachments</h1>
          {uploadedFiles.map((fileId) => (
            <FileCard id={fileId} key={fileId} />
          ))}
        </div>
        <div className="flex gap-8 flex-wrap">
          {files.map((file: File) => (
            <>
              <pre>{file.name}</pre>
              <Image src={URL.createObjectURL(file)} className="w-16 h-16" />
              <Button
                onClick={() => {
                  uploadFile(file);
                }}
              >
                Upload
              </Button>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
