import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export const getPineconeClient = () => {
  return new Pinecone({
    environment: process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};


export async function loadS3IntoPinecone(filekey: string) {
  // Obtain PDF
  console.log("Obtaining PDF");
  const file_name = await downloadFromS3(filekey);
  if (!file_name) {
    throw new Error("Could not obtain PDF");
  }
  const loader = new PDFLoader(file_name);
  const pages = await loader.load();
  return pages;
}
