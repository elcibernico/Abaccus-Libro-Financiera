import { NextRequest, NextResponse } from 'next/server';
// @ts-ignore
import { EdgeTTS } from 'node-edge-tts';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const tts = new EdgeTTS({
      voice: 'es-AR-ElenaNeural',
      lang: 'es-AR',
      outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
    });

    const tempDir = os.tmpdir();
    const fileName = `tts-${uuidv4()}.mp3`;
    const filePath = path.join(tempDir, fileName);

    await tts.ttsPromise(text, filePath);

    const buffer = fs.readFileSync(filePath);

    // Clean up file asynchronously
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('[TTS] Failed to delete temp file:', err);
      }
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('[TTS] Error generating speech:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
