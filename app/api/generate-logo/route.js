import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const response = await hf.textToImage({
      model: 'prompthero/openjourney',
      inputs: prompt,
      parameters: {
        width: 512,
        height: 512,
      },
    });

    // Convert blob to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating logo:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate logo' }, { status: 500 });
  }
}