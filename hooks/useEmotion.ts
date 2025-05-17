import { OpenAIService } from "@/services/openai.service";
import { useEffect, useState } from "react";

export const useEmotion = (message: string) => {
    const [emotion, setEmotion] = useState<string | null>(null);
    const getEmotion = async (message: string) => {
        const data = await OpenAIService.generateEmotion(
            {
                message: message,
                max: 'min',
            }
        );


        if (data.data) {
            setEmotion(data?.data?.message ?? '');
        }
    }


    useEffect(() => {
        getEmotion(message);
    }, [message]);


    return emotion;
}