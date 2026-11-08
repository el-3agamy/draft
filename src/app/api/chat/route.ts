import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";


const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

const SYSTEM_INSTRUCTION = `
You are the virtual assistant for Dr. Yasser Dental Clinic. Your job is to assist visitors with information about dental services, office hours, pricing estimates, location, and general pre-appointment queries.

CLINIC INFORMATION:
- Location: Gharbayia, Egypt (Bassyon /  Tanta )
- Working Hours: Daily from 2:00 PM to 10:00 PM (Closed Fridays)
- Emergency Services: Available via WhatsApp request.
- Key Services: Dental Implants, Cosmetic Dentistry (Veneers, Teeth Whitening), Root Canal Therapy, Orthodontics, Routine Cleanings.

RULES & BOUNDARIES:
1. Always maintain a polite, professional, and reassuring tone.
2. Provide general dental educational information, but NEVER provide a definitive medical diagnosis or prescribe medication.
3. If a user asks a highly specific medical question, asks about complex symptoms (e.g., severe acute infection, trauma), asks for specific direct doctor confirmation, or explicitly wants to book an appointment/consultation, instruct them to speak directly with the clinic staff on WhatsApp.
4. If you do NOT know the answer to a specific question, respond gracefully and suggest transferring to WhatsApp.
5. Whenever you suggest transfer to WhatsApp, end your answer with the marker tag: [ACTION:WHATSAPP_TRANSFER].
6. Always respond in max 15 words.
Keep answers clear, concise, and easy to read.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid message payload" },
        { status: 400 }
      );
    }

    // Map conversation history to Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   model: "gemini-1.5-flash",
     model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Lower temperature keeps answers grounded in facts
      },
    });

    const replyText = response.text || "I'm sorry, I couldn't process that. Please connect with us directly on WhatsApp.";

    return NextResponse.json({ reply: replyText });
  } catch (error) {
    console.error("Chatbot API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}