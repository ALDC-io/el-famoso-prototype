import { config } from "@/config/prospect";
import ChatPanel from "@/components/ChatPanel";

export const metadata = {
  title: `Zeus Chat — ${config.name}`,
  description: `Conversational commerce intelligence for ${config.name}.`,
};

export default function ChatPage() {
  return (
    <div className="-m-6 h-[calc(100vh-3.5rem)] md:h-screen">
      <ChatPanel />
    </div>
  );
}
