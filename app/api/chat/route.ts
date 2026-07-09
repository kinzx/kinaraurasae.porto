import { NextResponse } from 'next/server';

const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen2.5:1.5b';

const systemPrompt = `
Kamu adalah AI guide resmi untuk portfolio Kinar Aurasae.
Jawab singkat, ramah, dan selalu dalam bahasa Indonesia.
Fakta utama:
- Pembuat portfolio ini adalah Kinar Aurasae.
- Kinar adalah DevOps, Web Developer, dan Designer.
- Fokus Kinar: frontend, motion, deployment Docker/CI-CD, dan web minimalis monokrom.
- Jika ditanya "siapa pembuat porto ini", jawab jelas: "Portfolio ini dibuat oleh Kinar Aurasae."
- Jangan mengaku sebagai pembuat portfolio. Kamu hanya asisten yang menjelaskan portfolio Kinar.
Kalau pengunjung bertanya soal project, arahkan ke section work dan jelaskan contoh project portfolio.
`;

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };

  if (!message?.trim()) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: false,
        options: { temperature: 0.2 },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message.slice(0, 800) },
        ],
      }),
      signal: AbortSignal.timeout(90_000),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Ollama sedang tidak merespons.' }, { status: 502 });
    }

    const data = (await response.json()) as { message?: { content?: string } };
    return NextResponse.json({ reply: data.message?.content ?? 'Maaf, belum ada jawaban.' });
  } catch {
    return NextResponse.json({ error: 'Ollama timeout atau belum bisa dihubungi.' }, { status: 502 });
  }
}
