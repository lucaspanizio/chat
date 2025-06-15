import { useEffect, useRef, useState } from 'react';
import background from '@/assets/bg-messages.png';
import { MessageBubble } from '@/components/message-bubble';
import { Editor } from '@/components/editor';
import { Navbar } from '@/pages/main/navbar';

type Message = {
  text: string;
  user: string;
  time: string;
};

export function Main() {
  const [messages, setMessages] = useState<Message[]>([]);
  const containerRef = useRef<HTMLElement>(null);

  function addMessage(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        text,
        user: 'Lucas Panizio',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth', // rolagem suave
    });
  }, [messages]);

  return (
    <div
      className="relative bg-bg bg-repeat text-text h-screen flex flex-col"
      style={{ backgroundImage: `url(${background})` }}>
      <div className="absolute inset-0 bg-zinc-950 opacity-[87.5%] pointer-events-none" />

      <Navbar />

      <main
        ref={containerRef}
        className="flex-grow overflow-y-auto px-4 flex flex-col items-end gap-5 mt-16 mb-14 py-8">
        {messages.map((msg, i) => (
          <MessageBubble key={i} text={msg.text} user={msg.user} time={msg.time} />
        ))}
      </main>

      <footer className="fixed bottom-0 left-0 w-full min-h-14 px-4 py-2 bg-foreground text-white shadow-md z-40 flex items-center overflow-hidden">
        <Editor onSend={addMessage} />
      </footer>
    </div>
  );
}
