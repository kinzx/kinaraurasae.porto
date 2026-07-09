import { NextResponse } from 'next/server';

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen2.5:1.5b';

const systemPrompt = `
Kamu adalah AI guide untuk portfolio Kinar Aurasae.
Jawab singkat, ramah, dan dalam bahasa Indonesia.
Jelaskan Kinar sebagai DevOps, Web Developer, dan Designer yang fokus pada frontend,
motion, deployment Docker/CI-CD, dan tampilan web minimalis monokrom.
Kalau pengunjung bertanya soal project, arahkan ke section work dan jelaskan contoh project portfolio.
`;

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      stream: false,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message.slice(0, 800) },
      ],
    }),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Ollama is unavailable' }, { status: 502 });
  }

  const data = (await response.json()) as { message?: { content?: string } };
  return NextResponse.json({ reply: data.message?.content ?? 'Maaf, belum ada jawaban.' });
}
