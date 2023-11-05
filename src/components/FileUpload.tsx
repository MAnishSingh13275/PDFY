"use client";
import { uploadToS3 } from "@/lib/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const res = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });
      return res.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      try {
        setUploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something went wrong");
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log(data);
            // toast.success("File uploaded successfully");
          },
          onError: (error) => {
            console.log(error);
            toast.error("Something went wrong");
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setUploading(false);
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
        {uploading ? (
          <>
            <Loader2 size={34} className="mx-auto animate-spin text-teal-400" />
            <p className="text-center font-bold mx-auto text-gray-400">
              PDFying...
            </p>
          </>
        ) : (
          <>
            <Inbox size={34} className="mx-auto" />
            <p className="text-center font-bold text-gray-400">PDFy your PDF</p>
          </>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
