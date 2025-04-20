// https://env.t3.gg/docs/nextjs#create-your-schema
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const serverEnv = createEnv({
  server: {
    XAI_API_KEY: z.string().min(1).optional(),
    MISTRAL_API_KEY: z.string().min(1).optional(),
    COHERE_API_KEY: z.string().min(1).optional(),
    CEREBRAS_API_KEY: z.string().min(1).optional(),
    GROQ_API_KEY: z.string().min(1).optional(), // Optional: Base key if still used
    GROQ_API_KEY_DEEPSEEK_R1_DISTILL_LLAMA_70B: z.string().min(1).optional(),
    GROQ_API_KEY_LLAMA_3_70B: z.string().min(1).optional(),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1).optional(),
    GOOGLE_GENERATIVE_AI_API_BASE_URL: z.string().url().optional(),
    OPENAI_API_KEY: z.string().min(1).optional(),
    OPENAI_API_BASE_URL: z.string().url().optional(),
    E2B_API_KEY: z.string().min(1).optional(),
    ELEVENLABS_API_KEY: z.string().min(1).optional(),
    TAVILY_API_KEY: z.string().min(1).optional(),
    EXA_API_KEY: z.string().min(1).optional(),
    DEEPSEEK_API_KEY: z.string().min(1).optional(),
    DEEPSEEK_BASE_URL: z.string().url().optional(),
    TMDB_API_KEY: z.string().min(1).optional(),
    YT_ENDPOINT: z.string().min(1).optional(),
    FIRECRAWL_API_KEY: z.string().min(1).optional(),
    OPENWEATHER_API_KEY: z.string().min(1).optional(),
    SANDBOX_TEMPLATE_ID: z.string().min(1).optional(),
    GOOGLE_MAPS_API_KEY: z.string().min(1).optional(),
    MAPBOX_ACCESS_TOKEN: z.string().min(1).optional(),
    TRIPADVISOR_API_KEY: z.string().min(1).optional(),
    AVIATION_STACK_API_KEY: z.string().min(1).optional(),
    CRON_SECRET: z.string().min(1).optional(),
    BLOB_READ_WRITE_TOKEN: z.string().min(1).optional(),
    MEM0_API_KEY: z.string().min(1).optional(),
    MEM0_ORG_ID: z.string().min(1).optional(),
    MEM0_PROJECT_ID: z.string().min(1).optional(),

    // OpenAI Compatible - Provider 01 (e.g., OpenRouter Default)
    OPENAI_COMPATIBLE_API_KEY: z.string().min(1).optional(),
    OPENAI_COMPATIBLE_API_BASE_URL: z.string().url().optional(),
    // OpenAI Compatible - Provider 02 (e.g., GLHF)
    OPENAI_COMPATIBLE_API_KEY_GLHF: z.string().min(1).optional(),
    OPENAI_COMPATIBLE_API_BASE_URL_GLHF: z.string().url().optional(),
    // OpenAI Compatible - Provider 03 (e.g., Kluster) - Assuming key from .env line 127 is for this
    OPENAI_COMPATIBLE_API_KEY_KLUSTER: z.string().min(1).optional(), // Renamed for clarity
    OPENAI_COMPATIBLE_API_BASE_URL_KLUSTER: z.string().url().optional(), // Renamed for clarity
    OPENROUTER_API_KEY: z.string().optional(), // Added for dedicated OpenRouter provider
    
    // Tragon Provider
    TARGON_API_KEY: z.string().min(1).optional(),
    TARGON_BASE_URL: z.string().url().optional(),
    
    // Together AI Provider
    TOGETHER_API_KEY: z.string().min(1).optional(),
    
    // Requesty Router Provider
    REQUESTY_API_KEY: z.string().min(1).optional(),
    REQUESTY_BASE_URL: z.string().url().optional(),

    SMITHERY_API_KEY: z.string().min(1).optional(),
  },
  experimental__runtimeEnv: process.env,
})
