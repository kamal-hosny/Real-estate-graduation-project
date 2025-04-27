import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosConfig } from "../../../services/axiosConfig";
import { axiosErrorHandler } from "../../../utils";

export const sendMessageToDeepSeek = createAsyncThunk(
    "deepSeek/sendMessage",
    async (messageContent: string, { rejectWithValue }) => {
        const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
        const model = import.meta.env.VITE_DEEPSEEK_MODEL || "deepseek/deepseek-chat-v3-0324:free";

        console.log(messageContent);
        

        if (!apiKey) {
            console.error("OpenRouter API key is missing.");
            return rejectWithValue("Missing OpenRouter API key.");
        }
        try {
            const res = await axiosConfig.post(
                `https://openrouter.ai/api/v1/chat/completions`,
                {
                    model,
                    messages: [{ role: "user", content: messageContent }],
                    temperature: 1
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                        "HTTP-Referer": window.location.origin,
                        "X-Title": "Aqarek"
                    }
                }
            );

            const responseContent = res.data?.choices?.[0]?.message?.content;
            if (!responseContent) {
                console.error("Invalid response format from DeepSeek API:", res.data);
                return rejectWithValue("Invalid response format from DeepSeek API.");
            }

            let parsedContent;
            try {
                parsedContent = JSON.parse(responseContent);
            } catch (err) {
                console.error("Response content is not valid JSON:", responseContent);
                return rejectWithValue("Response content is not valid JSON.");
            }

            if (import.meta.env.DEV) {
                console.log("DeepSeek API Response Content:", parsedContent);
            }
            return responseContent;
        } catch (error) {
            const errorMessage = axiosErrorHandler(error);
            console.error("DeepSeek API Error:", errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);