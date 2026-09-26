"use client";

import { ChatPanel } from "@/components/chat/chat-panel";

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100dvh-7.75rem)] flex-col md:h-dvh">
      <ChatPanel />
    </div>
  );
}
