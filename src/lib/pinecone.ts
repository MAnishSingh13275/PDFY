import { PineconeClient } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";

let pinecone: PineconeClient | null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

export async function loadS3IntoPinecone(filekey: string){
    // Obtain PDF
    console.log("Obtaining PDF");
    const file_name = await downloadFromS3(filekey);
}