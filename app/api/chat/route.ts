import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

const SYSTEM_PROMPT = `You are FitBot, an expert AI personal trainer and fitness coach. You help users with:

🏋️ Workout Planning & Exercise Selection
💪 Form Correction & Technique Tips  
📊 Progress Tracking & Goal Setting
🍎 Basic Nutrition Guidance
💡 Motivation & Encouragement
🎯 Personalized Fitness Advice

Guidelines:
- Always prioritize safety and proper form
- Recommend starting with bodyweight exercises for beginners
- Suggest progressive overload for strength building
- Encourage rest and recovery
- Ask about any injuries or limitations before recommending exercises
- Be motivational and supportive
- Provide specific, actionable advice
- Include estimated sets, reps, and rest times when relevant
- Mention when to consult healthcare professionals

Keep responses concise but helpful. Use emojis to make interactions engaging.`;

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory } = await request.json();

    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chatHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    });

    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Gym AI Chat API is running!' });
}