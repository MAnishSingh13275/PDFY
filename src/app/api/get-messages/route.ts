import { db } from "@/lib/DB";
import { messages } from "@/lib/DB/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
export const runtime = "edge";

export const POST = async (req: Request, res: Response) => {
  const { chatId } = await req.json();
  const _messages = await db
    .select()
    .from(messages)
    .where(eq(messages.ChatId, chatId));
  return NextResponse.json(_messages);
};
