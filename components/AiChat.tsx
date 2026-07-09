'use client';

import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Halo, saya AI portfolio Kinar. Tanya tentang Kinar, skill, atau project.',
    },
  ]);

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;

    setInput('');
    setIsLoading(true);
    setMessages((current) => [...current, { role: 'user', content: message }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.reply ?? data.error ?? 'Maaf, AI belum merespons.' },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: 'AI belum bisa dihubungi. Cek Ollama di VPS.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hidden md:mt-auto md:block">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white text-xs font-bold text-black transition-transform hover:scale-105"
        aria-label="Open AI chat"
      >
        AI
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed right-4 bottom-20 left-4 z-40 grid max-h-[70vh] gap-3 border border-white/15 bg-black p-4 text-white shadow-2xl shadow-black/50 md:bottom-6 md:left-52 md:w-80"
        >
          <div>
            <p className="font-serif text-xl">Kinar AI</p>
            <p className="mt-1 text-xs leading-5 text-white/45">Powered by Ollama qwen2.5:1.5b</p>
          </div>

          <div className="grid max-h-64 gap-3 overflow-y-auto pr-1 text-sm leading-5">
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'text-white' : 'text-white/60'}
              >
                {message.content}
              </p>
            ))}
            {isLoading && <p className="text-white/40">Sedang menjawab...</p>}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tanya tentang Kinar..."
              className="min-w-0 flex-1 border border-white/15 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-white/35"
            />
            <button
              type="submit"
              className="bg-white px-3 py-2 text-xs font-bold text-black disabled:opacity-50"
              disabled={isLoading}
            >
              Send
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
