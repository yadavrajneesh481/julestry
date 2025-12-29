import { NextRequest, NextResponse } from 'next/server';
import { generateLearningGuide } from '@/lib/ai-service';

export async function POST(request: NextRequest) {
  try {
    const { content, type } = await request.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // In a real app, we might handle 'file' or 'url' types differently (e.g., scrape the URL or parse the file).
    // For this mock, we just pass the content string/metadata to the service.

    console.log(`Processing content of type: ${type}`);

    const guide = await generateLearningGuide(content);

    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error generating guide:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning guide' },
      { status: 500 }
    );
  }
}
