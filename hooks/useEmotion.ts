import { OpenAIService } from "@/services/openai.service";
import { useEffect, useState } from "react";

export const useEmotion = (message: string, isLazy= false,locale ='fr') => {
  const [emotion, setEmotion] = useState<string | null>(null);

  const getEmotion = async (message: string) => {
    const data = await OpenAIService.generateEmotion({
      message,
      max: "min",
      language: locale,
    });

    if (data?.data) {
      setEmotion(data.data.message ?? "");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !isLazy) {
      getEmotion(message);
    }
  }, [message, isLazy]);

  return {
    emotion,
    getEmotion,
  };
};
