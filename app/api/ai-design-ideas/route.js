import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.1',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
      },
    });

    const ideas = response.generated_text
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^\d+\.\s*/, ''));

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}