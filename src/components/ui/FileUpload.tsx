"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";


const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {"application/pdf": [".pdf"]},
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  return (
    <div className="bg-white rounded-xl p-2">
      <div
        {...getRootProps({
          className: "border-dashed border-2 border-gray-400 rounded-xl cursor-pointer p-2 py-10 ",
        })}
      >
        <input {...getInputProps()} />
        <>
        <Inbox size={34} className="mx-auto" />
        <p className="text-center font-bold">PDFy your PDF</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
