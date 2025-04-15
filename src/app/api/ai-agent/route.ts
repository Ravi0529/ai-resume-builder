import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant. Always respond only in pure JSON format, no markdown or HTML.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const rawContent = response.choices[0]?.message?.content ?? "{}";
    const parsedResponse = JSON.parse(rawContent);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error in OpenAI request:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
