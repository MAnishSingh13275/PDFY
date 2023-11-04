"use client";
import { uploadToS3 } from "@/lib/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      try {
        const data = await uploadToS3(file);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="bg-white rounded-xl p-2">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 border-gray-400 rounded-xl cursor-pointer p-2 py-10 ",
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
