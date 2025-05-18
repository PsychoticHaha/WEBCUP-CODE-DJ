import openai from "@/lib/openai";
import { NextApiRequest, NextApiResponse } from "next";


export default async function generateEmotion(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    const message = req.body.message
    const language:string = req?.body?.language || "fr";
    if (!process.env.OPEN_AI_SECRET_KEY) {
        return res.status(500).json({ error: "OpenAI API key not configured",succes: false });
    }
    const result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "assistant",
                content: `Écris un message de départ avec style et audace, honnêteté et un orgueil incroyablement osé. Sois aléatoire entre un ton dramatique, ironique, triste, drôle, sérieux, et surpris ${message}, mettre dans 2 phrases max, et en ${language?.toUpperCase()}.`,
            },
        ],
    })
    if (!result.choices || result.choices.length === 0) {
        return res.status(500).json({ message: "No choices returned from OpenAI", code: 'not.message',success: true });
    }
    const responseContent = result.choices[0].message.content;
    if (!responseContent) {
        return res.status(500).json({ error: "No content in the response",success: false });
    }
    res.status(200).json({
        message: responseContent,
        success: true,
    });
}
