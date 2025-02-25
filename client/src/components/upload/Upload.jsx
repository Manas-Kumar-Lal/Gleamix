import React from "react";
import { Dropzone, FileMosaic } from "@files-ui/react";

const Header = () => {

  const [files, setFiles] = React.useState([]);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (fileId) => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
  };

  return (
    <div className="p-6 max-w-[70rem] m-auto">
      <Dropzone
        onChange={updateFiles}
        value={files}
        accept="image/*"
        maxFileSize={5 * 1024 * 1024}
        maxFiles={30}
        className="p-3"
      >
        <div className="flex gap-3 flex-wrap justify-center content-start h-screen max-h-[30rem] overflow-y-auto pt-4">
          {files.map((file) => (
            <FileMosaic {...file} preview onDelete={removeFile} />
          ))}
        </div>
      </Dropzone>
      <button className="w-full mt-5 btn btn-neutral">Upload Images</button>
    </div>
  );
};

export default Header