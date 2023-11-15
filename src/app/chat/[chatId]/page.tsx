import ChatComponent from "@/components/ui/ChatComponent";
import ChatSideBar from "@/components/ui/ChatSideBar";
import PDFViewer from "@/components/ui/PDFViewer";
import { db } from "@/lib/DB";
import { chats } from "@/lib/DB/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));

  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  return (
    <div className="flex max-h-screen overflow-scroll no-scrollbar">
      <div className="flex w-full max-h-screen overflow-scroll no-scrollbar">
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} />
        </div>

        <div className="max-h-screen overflow-scroll p-4 flex-[5] no-scrollbar">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>

        <div className="flex-[3] border-l-4 border-slate-300 ">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default page;
