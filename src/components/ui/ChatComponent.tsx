"use client";
import React from "react";
import { useChat } from "ai/react";
import { Input } from "./input";
import MessageList from "./MessageList";
import { Button } from "./button";
import { Send } from "lucide-react";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
  });
  return (
    <div className="max-h-screen overflow-scroll no-scrollbar">
      <div className="m-2">
        <h2 className="font-bold text-xl">Chats</h2>
      </div>
      <div className="mx-3">
        <MessageList messages={messages} />
      </div>
      <form className="sticky bottom-0" onSubmit={handleSubmit}>
        <div className="flex gap-2 mx-1 mt-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Your PDF"
          />
          <Button>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
