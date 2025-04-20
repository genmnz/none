// config/form-models.ts
import React from "react";
import { MistralIcon } from "@/components/icons/mistral-icon"; // Import your SVG icons
import { XAIIcon} from "@/components/icons/xai-icon";

// Define a type for the model structure
export interface FormModel {
    value: string;
    label: string;
    // DO NOT Change icon type to string
    icon: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    iconClass: string;
    description: string;
    color: string;
    vision: boolean;
    experimental: boolean;
    category: string;
    thinking: boolean; // property
    streaming: boolean; // Note: This flag is informational for UI, backend controls actual streaming
}


export const models: FormModel[] = [
    // Melad Models (Mapped to Cohere/Mistral/Google in provider config)
    { value: "melad-default", label: "Melad", icon: "/logicon.png", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Cohere Command R (Fast)", color: "blue", vision: false, experimental: false, category: "Stable", thinking: false, streaming: true },
    { value: "melad-vision", label: "Melad Vision", icon: "/logicon.png" , iconClass: "!text-neutral-300",
        description: "Cohere Aya Vision", color: "steel", vision: true, experimental: false, category: "Stable", thinking: false, streaming: true },
    { value: "melad-cmd-a", label: "Command A", icon: "/cohere.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Cohere's Command A model", color: "purple", vision: false, experimental: false, category: "Stable", thinking: false, streaming: true },
    // { value: "melad-mistral", label: "Melad Mistral", icon: MistralIcon, iconClass: "!text-neutral-300", // Example if you wanted a specific alias
    //     description: "Mistral Small Latest", color: "orange", vision: false, experimental: false, category: "Stable", thinking: false, streaming: true },

    // Google Models
    { value: "google-gemini-pro", label: "Gemini Pro", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Google's Gemini Pro model", color: "blue", vision: false, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-1.5-pro", label: "Gemini 1.5 Pro", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Google's Gemini 1.5 Pro model", color: "blue", vision: true, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-1.5-flash", label: "Gemini 1.5 Flash", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Fast Gemini 1.5 model", color: "blue", vision: false, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-2.0-flash", label: "Gemini 2.0 Flash", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Fast Gemini 2.0 model", color: "blue", vision: false, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-2.5-pro", label: "Gemini 2.5 Pro", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Experimental Gemini 2.5", color: "blue", vision: true, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Lightweight Gemini 2.0", color: "blue", vision: false, experimental: false, category: "Google", thinking: false, streaming: true },
    { value: "google-gemini-2.0-pro", label: "Gemini 2.0 Pro", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Experimental Gemini 2.0 Pro", color: "blue", vision: true, experimental: false, category: "Google", thinking: false, streaming: true },

    // Requesty Router Model
    { value: "requesty-gpt-4o-mini", label: "GPT-4o Mini", icon: "/openai.svg", iconClass: "",
        description: "GPT-4o Mini suitable for everyday's", color: "cyan", vision: true, experimental: false, category: "OpenAI", thinking: false, streaming: true }, 
    { value: "requesty-gpt-4.1-nano-2025-04-14", label: "GPT-4.1 Nano", icon: "/openai.svg", iconClass: "",
        description: "GPT-4.1 Nano latest OpenAI model", color: "pink", vision: true, experimental: false, category: "OpenAI", thinking: false, streaming: true }, 

    // Groq Models
    { value: "compound-beta", label: "Compound Beta", icon: "/groq.svg", iconClass: "",
        description: "Groq Compound Beta", color: "green", vision: false, experimental: false, category: "Groq", thinking: false, streaming: true },
    // Uncommented and updated description
    { value: "groq-deepseek-r1-distill-llama-70b", label: "DeepSeek Llama 70B", icon: "/groq.svg", iconClass: "",
        description: "DeepSeek R1 Distill Llama 70B via Groq", color: "green", vision: false, experimental: false, category: "Groq", thinking: false, streaming: true },

    // Other Models
    { value: "command-r-plus", label: "Cohere R+", icon: "/cohere.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Cohere Command R+ model", color: "purple", vision: false, experimental: false, category: "Cohere", thinking: false, streaming: true },
    // *** ALIGNED VALUE ***
    { value: "mistral-01", label: "Mistral Large", icon: MistralIcon, iconClass: "!text-neutral-300",
        description: "Mistral Large Latest model", color: "orange", vision: false, experimental: false, category: "Mistral", thinking: false, streaming: true }, // Changed value from mistral-01

    // OpenRouter Models
    { value: "openrouter-llama-4-maverick", label: "Llama 4 Maverick", icon: "/ollama.svg", iconClass: "!text-neutral-900 dark:!text-white",
        description: "Meta's Llama 4 Maverick via OpenRouter", color: "sapphire", vision: true, experimental: false, category: "OpenRouter", thinking: false, streaming: true },

    // DeepSeek via OpenRouter (using DEEPSEEK_ keys but OpenRouter URL)
    { value: "deepseek-via-openrouter", label: "DeepSeek (OpenRouter)", icon: "/deepseek.svg", iconClass: "",
        description: "DeepSeek Chat via OpenRouter", color: "blue", vision: false, experimental: false, category: "OpenRouter", thinking: true, streaming: true }, // Assuming DeepSeek icon exists

    // OpenAI Compatible Models (Specific Providers)
    // Provider: GLHF
    { value: "compatible-glhf-mistral", label: "Mixtral 8x22B (GLHF)", icon: MistralIcon, iconClass: "!text-neutral-300",
        description: "Mixtral 8x22B via GLHF", color: "orange", vision: false, experimental: false, category: "Compatible", thinking: false, streaming: true },
    { value: "compatible-glhf-maverick", label: "Llama Maverick", icon: MistralIcon, iconClass: "!text-neutral-300",
        description: "Llama Maverick via GLHF", color: "blue", vision: false, experimental: false, category: "Compatible", thinking: false, streaming: true },
    // Provider: Kluster
    { value: "compatible-kluster-deepseek", label: "DeepSeek V3 (Kluster)", icon: "/deepseek.svg", iconClass: "", // Updated label
        description: "DeepSeek V3 via Kluster", color: "gray", vision: false, experimental: false, category: "Compatible", thinking: false, streaming: true }, // Assuming DeepSeek icon exists

    // Together AI Models
    { value: "together-deepseek-r1-distill-llama-70b", label: "DeepSeek R1 70B (T)", icon: "/deepseek.svg", iconClass: "", // Added (T) for Together
        description: "Distill Llama 70B via Together AI", color: "teal", vision: false, experimental: false, category: "Compatible", thinking: true, streaming: true },
    { value: "together-llama-3.3-70b-turbo", label: "Llama 3.3 70B (T)", icon: "/meta-color.svg", iconClass: "", // Added (T) for Together
        description: "Llama 3.3 70B Instruct Turbo via Together AI", color: "teal", vision: false, experimental: false, category: "Compatible", thinking: true, streaming: true },

    // Image Generation Model (using the multimodal Gemini 1.5 Pro) - Keep if UI differentiates
    // { value: "google-gemini-1.5-pro-image", label: "Gemini 1.5 Pro (Image)", icon: "/gemini-color.svg", iconClass: "!text-neutral-900 dark:!text-white",
    //     description: "Google's Gemini 1.5 Pro for Image Generation", color: "blue", vision: true, experimental: false, category: "Image Generation", thinking: false, streaming: true },
    // Note: Using the same value "google-gemini-1.5-pro" might be confusing. Consider a distinct value if needed, or rely on category filtering.
];

// Keep this helper function
export const hasVisionSupport = (modelValue: string): boolean => {
    const selectedModel = models.find(model => model.value === modelValue);
    return selectedModel?.vision === true;
};
