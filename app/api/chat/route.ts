import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// GitHub Models client as per official documentation
const client = process.env.GITHUB_TOKEN ? new OpenAI({
  baseURL: "https://models.github.ai/inference",
  apiKey: process.env.GITHUB_TOKEN,
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

    if (!client) {
      return NextResponse.json(
        { 
          error: 'GitHub token not configured',
          message: 'Please add your GitHub token to the .env.local file',
          instructions: [
            '1. Generate a GitHub PAT from: https://github.com/settings/tokens',
            '2. Add to .env.local: GITHUB_TOKEN=ghp_your-token-here',
            '3. Restart the dev server: npm run dev'
          ],
          note: 'Using GitHub Models for free access to OpenAI GPT-4o'
        },
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

    // Use GitHub Models; attempt preferred model then fallback(s)
    console.log('Using GitHub Models client');

    const candidateModels = ["openai/gpt-4o", "openai/gpt-4o-mini"];
    let completion: any = null;
    let lastError: any = null;
    for (const modelName of candidateModels) {
      try {
        console.log(`Attempting model: ${modelName}`);
        completion = await client.chat.completions.create({
          messages: messages,
          model: modelName,
          temperature: 1,
          max_tokens: 4096,
          top_p: 1
        });
        if (completion) {
          break;
        }
      } catch (err: any) {
        lastError = err;
        // Continue on 403/404 to try next model; otherwise rethrow
        if (err?.status !== 403 && err?.status !== 404) {
          throw err;
        }
      }
    }

    if (!completion) {
      if (lastError) {
        throw lastError;
      }
      return NextResponse.json(
        { error: 'No available GitHub Models responded' },
        { status: 502 }
      );
    }

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

  } catch (error: any) {
    console.error('GitHub Models API error:', error);
    
    let errorMessage = 'Failed to process chat request';
    let statusCode = 500;
    let suggestion = '';

    if (error.status === 401) {
      errorMessage = 'Invalid GitHub token';
      statusCode = 401;
      suggestion = 'Check your GitHub token at https://github.com/settings/tokens';
    } else if (error.status === 403) {
      errorMessage = 'GitHub token does not have access to GitHub Models';
      statusCode = 403;
      suggestion = 'Ensure your GitHub token has the correct permissions for GitHub Models';
    } else if (error.status === 429) {
      errorMessage = 'Rate limit exceeded';
      statusCode = 429;
      suggestion = 'Wait a moment and try again';
    } else if (error.status === 400) {
      errorMessage = 'Bad request - check your input';
      statusCode = 400;
      suggestion = 'Verify your message format and try again';
    } else if (error.status === 404) {
      errorMessage = 'GitHub Models service or model not found';
      statusCode = 404;
      suggestion = 'GitHub Models may not be available in your region or account';
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message,
        service: 'GitHub Models',
        suggestion: suggestion || 'Please check your GitHub token configuration',
        model: 'openai/gpt-4o'
      },
      { status: statusCode }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Gym AI Chat API is running!' });
}