import axios from "axios";

export class OpenAIService {
    public static async generateEmotion(
       data: { message: string; language?: string, max:'min' | 'max' } = { message: "",language: "fr", max:'min' },
    ){
       return await axios.post('/api/openai/emotion', {
           ...data
        })
    }
}