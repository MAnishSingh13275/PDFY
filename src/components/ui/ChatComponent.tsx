"use client";
import React from "react";
import { useChat } from "ai/react";
import { Input } from "./input";
import MessageList from "./MessageList";
import { Button } from "./button";
import { Send } from "lucide-react";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat(
    {
      api: "/api/chat"
    }
  );
  return (
    <div className="max-h-screen overflow-scroll no-scrollbar">
      <MessageList messages={messages} />
      <form className="" onSubmit={handleSubmit}>
        <div className="flex">
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
