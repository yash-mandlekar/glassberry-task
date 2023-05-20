import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ index, setfile, file, edit }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].type.split("/")[0] === "image") {
      setfile((prev) => {
        let temp = [...prev];
        temp[index] = acceptedFiles[0];
        return temp;
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="dropzone"
      style={{ border: file ? "none" : "1px dashed rgb(48, 45, 45)" }}
    >
      {file ? (
        <img
          src={edit ? file : URL.createObjectURL(file)}
          alt="product"
          className="preview-img"
        />
      ) : (
        !edit && (
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>+ Upload Product Image</p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default MyDropzone;
