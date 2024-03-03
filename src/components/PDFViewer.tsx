"use client";
import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import packageJson from "../../package.json";

const pdfjsVersion = packageJson.dependencies["pdfjs-dist"];

type Props = { pdf_url: string };

const PDFViewer = ({ pdf_url }: Props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="h-full w-full">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdf_url} plugins={[defaultLayoutPluginInstance]} />{" "}
        {/*This is with plugins */}
        <Viewer fileUrl={pdf_url} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
