// app/api/search/lib/providers/meladai.ts this is the only place where the core models and registry are loaded
/**
 * Must follow instructions, all IDs are verified, never assume them wrong or change Model IDs
 * All openAI compatible APIs are compatible with their API specifications (baseURL, and other parameters).
 */
import { serverEnv } from '@/env/server';
// import { xai } from '@ai-sdk/xai';
import { cohere } from '@ai-sdk/cohere';
import { mistral } from '@ai-sdk/mistral';
import { google } from '@ai-sdk/google'; 
import { createOpenAI } from '@ai-sdk/openai';
import { groq, createGroq } from '@ai-sdk/groq';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { customProvider, LanguageModelV1 } from 'ai';
import { FormModel, models as configuredModels } from '@/config/form-models'; // Use alias
// import { Model } from '@/lib/types/index'; // Model type not used directly here

export const providerConfigs: Record<string, { apiKey?: string; baseURL?: string; [key: string]: any }> = {};

// Helper function for logging configuration status
const logConfigStatus = (providerName: string, config: { apiKey?: string; baseURL?: string; [key: string]: any }, required: ('apiKey' | 'baseURL')[]) => {
    let logMsg = `Configuring ${providerName}:`;
    let isConfigured = true;
    if (required.includes('apiKey')) {
        logMsg += ` API Key ${config.apiKey ? 'SET' : 'MISSING'}.`;
        if (!config.apiKey) isConfigured = false;
    }
    if (required.includes('baseURL')) {
        logMsg += ` Base URL ${config.baseURL ? `SET (${config.baseURL})` : 'MISSING'}.`;
        if (!config.baseURL) isConfigured = false;
    }
    console.log(logMsg);
    return isConfigured;
};

// --- Configure Providers ---

// DeepSeek (via OpenRouter - uses specific DEEPSEEK_ keys)
const deepseekConfig = {
    apiKey: serverEnv.DEEPSEEK_API_KEY,
    baseURL: serverEnv.DEEPSEEK_BASE_URL,
};
if (logConfigStatus('DeepSeek (Direct/OpenRouter)', deepseekConfig, ['apiKey', 'baseURL'])) {
    providerConfigs['deepseek'] = deepseekConfig;
}
const deepseekOpenRouterClient = (deepseekConfig.apiKey && deepseekConfig.baseURL)
    ? createOpenAI(deepseekConfig)
    : null;
console.log(`DeepSeek Client (via OpenRouter) Initialized: ${!!deepseekOpenRouterClient}`);

// OpenRouter
const openRouterConfig = { apiKey: serverEnv.OPENROUTER_API_KEY };
if (logConfigStatus('OpenRouter', openRouterConfig, ['apiKey'])) {
    providerConfigs['openrouter'] = openRouterConfig;
}
const openRouterClient = openRouterConfig.apiKey
    ? createOpenRouter(openRouterConfig)
    : null;
console.log(`OpenRouter Client Initialized: ${!!openRouterClient}`);

// GLHF
const glhfConfig = {
    apiKey: serverEnv.OPENAI_COMPATIBLE_API_KEY_GLHF,
    baseURL: serverEnv.OPENAI_COMPATIBLE_API_BASE_URL_GLHF
        ? `${serverEnv.OPENAI_COMPATIBLE_API_BASE_URL_GLHF.replace(/\/v1\/?$/, '').replace(/\/$/, '')}/v1`
        : undefined,
    // Add standard SSE headers which might be required by some OpenAI-compatible APIs
    headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
    }
};
if (logConfigStatus('GLHF', glhfConfig, ['apiKey', 'baseURL'])) {
    providerConfigs['glhf'] = glhfConfig;
}
const glhfClient = (glhfConfig.apiKey && glhfConfig.baseURL)
    ? createOpenAI(glhfConfig)
    : null;
console.log(`GLHF Client Initialized: ${!!glhfClient}`);

// Kluster
const klusterConfig = {
    apiKey: serverEnv.OPENAI_COMPATIBLE_API_KEY_KLUSTER,
    // Ensure baseURL ends with /v1. Handle cases where it might already have it or be missing.
    baseURL: serverEnv.OPENAI_COMPATIBLE_API_BASE_URL_KLUSTER
        ? `${serverEnv.OPENAI_COMPATIBLE_API_BASE_URL_KLUSTER.replace(/\/v1\/?$/, '').replace(/\/$/, '')}/v1`
        : undefined,
};
if (logConfigStatus('Kluster', klusterConfig, ['apiKey', 'baseURL'])) {
    providerConfigs['kluster'] = klusterConfig;
}
const klusterClient = (klusterConfig.apiKey && klusterConfig.baseURL)
    ? createOpenAI(klusterConfig)
    : null;
console.log(`Kluster Client Initialized: ${!!klusterClient}`);
// Base URL is now normalized, removing the need for the note.


// Tragon (Assuming this is Targon)
const tragonConfig = {
    apiKey: serverEnv.TARGON_API_KEY,
    baseURL: serverEnv.TARGON_BASE_URL,
    dangerouslyAllowBrowser: true, // Keep this if needed, but be aware of security implications
};
if (logConfigStatus('Tragon/Targon', tragonConfig, ['apiKey', 'baseURL'])) {
    providerConfigs['tragon'] = tragonConfig;
}
const tragonClient = (tragonConfig.apiKey && tragonConfig.baseURL)
    ? createOpenAI(tragonConfig)
    : null;
console.log(`Tragon/Targon Client Initialized: ${!!tragonClient}`);

// Together AI
const togetherConfig = {
    apiKey: serverEnv.TOGETHER_API_KEY,
    baseURL: "https://api.together.xyz/v1", // Base URL already includes /v1
};
if (logConfigStatus('Together AI', togetherConfig, ['apiKey'])) { // Base URL is hardcoded
    providerConfigs['together'] = togetherConfig;
}
const togetherClient = togetherConfig.apiKey
    ? createOpenAI(togetherConfig)
    : null;
console.log(`Together AI Client Initialized: ${!!togetherClient}`);

// Requesty Router
const requestyConfig = {
    apiKey: serverEnv.REQUESTY_API_KEY,
    // Ensure baseURL ends with /v1. Handle cases where it might already have it or be missing.
    baseURL: serverEnv.REQUESTY_BASE_URL
        ? `${serverEnv.REQUESTY_BASE_URL.replace(/\/v1\/?$/, '').replace(/\/$/, '')}/v1`
        : undefined,
};
if (logConfigStatus('Requesty', requestyConfig, ['apiKey', 'baseURL'])) {
    providerConfigs['requesty'] = requestyConfig; // Store the potentially modified baseURL
}
const requestyClient = (requestyConfig.apiKey && requestyConfig.baseURL)
    ? createOpenAI(requestyConfig)
    : null;
console.log(`Requesty Client Initialized: ${!!requestyClient}`); // Added specific log

// Groq
const groqConfig = { apiKey: serverEnv.GROQ_API_KEY };
if (logConfigStatus('Groq', groqConfig, ['apiKey'])) {
    providerConfigs['groq'] = groqConfig;
}
const groqClient = groqConfig.apiKey
    ? createGroq(groqConfig) // Use createGroq
    : null;
console.log(`Groq Client Initialized: ${!!groqClient}`); // Added specific log


// --- Model Provider Mapping ---
// Helper map to link model IDs to their provider config key
export const modelProviderMap: Record<string, keyof typeof providerConfigs | 'google' | 'cohere' | 'mistral' | 'groq'> = {};

// --- Define Language Models Configuration Separately ---
const languageModelsConfig: Record<string, LanguageModelV1> = {
    'raycast-melad': google('models/gemini-1.5-flash-latest'),
    'melad-default': cohere('command-r7b-12-2024'),
    'melad-vision': cohere('c4ai-aya-vision-32b'),
    'melad-follow': cohere('command-a-03-2025'),
    'melad-cmd-a': cohere('command-a-03-2025'),
    'melad-mistral': mistral('mistral-small-latest'),
    'melad-mistral-vision': mistral('mistral-small-vision-latest'),
    // Google Gemini Models
    'google-gemini-pro': google('models/gemini-2.0-flash-001'),
    'google-gemini-1.5-pro': google('models/gemini-1.5-pro-latest'),
    'google-gemini-1.5-flash': google('models/gemini-1.5-flash-latest'),
    'google-gemini-2.0-flash': google('models/gemini-2.0-flash-latest'),
    'google-gemini-2.5-pro': google('models/gemini-2.5-pro-experimental'),
    'google-gemini-2.0-flash-lite': google('models/gemini-2.0-flash-lite'),
    'google-gemini-2.0-pro': google('models/gemini-2.0-pro-experimental'),

    // Groq Models
    ...(groqClient ? {
        'compound-beta': groqClient('compound-beta'), 
        'groq-deepseek-r1-distill-llama-70b': groqClient('deepseek-r1-distill-llama-70b-chat'),
        // 'whisper-large-v3-turbo': groqClient('whisper-large-v3-turbo'),
        // 'playai-tts': groqClient('playai-tts'),
        // 'playai-tts-arabic': groqClient('playai-tts-arabic')
    } : {}),

    // Other Direct Integrations
    'command-r-plus': cohere('command-r-plus'),
    'mistral-01': mistral('mistral-large-latest'),
    ...(openRouterClient ? {
        'openrouter-claude-3-opus': openRouterClient('anthropic/claude-3-opus'),
        'openrouter-llama-4-maverick': openRouterClient('meta-llama/llama-4-maverick:free'),
    } : {}),

    // DeepSeek via Direct OpenAI Compatible Client (using deepseekOpenRouterClient)
    ...(deepseekOpenRouterClient ? {
        'deepseek-via-openrouter': deepseekOpenRouterClient('deepseek/deepseek-chat-v3-0324:free'),
    } : {}),

    // GLHF Model
    ...(glhfClient ? {
        'compatible-glhf-mistral': glhfClient('hf:mistralai/Mixtral-8x22B-Instruct-v0.1'), 
        'compatible-glhf-maverick': glhfClient('hf:meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8'), 
    } : {}),

    // Kluster Model
    ...(klusterClient ? {
        'compatible-kluster-deepseek': klusterClient('deepseek-ai/DeepSeek-V3-0324'),
    } : {}),

    // Tragon Model
    ...(tragonClient ? {
        // *** VERIFY THIS MODEL ID WITH TRAGON/TARGON DOCS ***
        'tragon-free': tragonClient('deepseek-ai/DeepSeek-V3-0324'), 
    } : {}),

    // Together AI Models
    ...(togetherClient ? {
        'together-llama-3.3-70b-turbo': togetherClient('meta-llama/Llama-3.3-70B-Instruct-Turbo-Free'),
        'together-deepseek-r1-distill-llama-70b': togetherClient('deepseek-ai/DeepSeek-R1-Distill-Llama-70B-free'),
    } : {}),

    // Requesty Router Models
    ...(requestyClient ? {
        'requesty-gpt-4o-mini': requestyClient('openai/gpt-4o-mini'),
        'requesty-gpt-4.1-nano-2025-04-14': requestyClient('openai/gpt-4.1-nano-2025-04-14'),
    } : {}),
};

// Define the core AI provider registry using the config object
export const meladai = customProvider({
    languageModels: languageModelsConfig, // Pass the config object here
});

// --- Populate Model Provider Map --- (Uses languageModelsConfig keys)
const addModelMapping = (modelId: string, providerKey: keyof typeof providerConfigs | 'google' | 'cohere' | 'mistral' | 'groq') => {
  if (modelId in languageModelsConfig) {
    modelProviderMap[modelId] = providerKey;
  }
};

// Map models based on prefixes or specific IDs present in languageModelsConfig
Object.keys(languageModelsConfig).forEach(id => {
  if (id.startsWith('google-') || id === 'raycast-melad') addModelMapping(id, 'google');
  else if (id.startsWith('melad-') || id.startsWith('command-')) {
      // Refine Cohere/Mistral mapping based on actual model used in config
      const modelInstance = languageModelsConfig[id];
      if (modelInstance?.provider?.includes('mistral')) { // Check provider if possible (AI SDK structure might vary)
          addModelMapping(id, 'mistral');
      } else {
          addModelMapping(id, 'cohere'); // Default melad-* and command-* to Cohere unless specified otherwise
      }
  }
  else if (id.startsWith('mistral-')) addModelMapping(id, 'mistral'); 
  else if (id.startsWith('groq-') || ['compound-beta'].includes(id)) addModelMapping(id, 'groq'); // Only map Groq models present
  else if (id.startsWith('openrouter-')) addModelMapping(id, 'openrouter');
  else if (id.startsWith('deepseek-via-openrouter')) addModelMapping(id, 'deepseek');
  else if (id.startsWith('compatible-glhf-')) addModelMapping(id, 'glhf');
  else if (id.startsWith('compatible-kluster-')) addModelMapping(id, 'kluster');
  else if (id.startsWith('tragon-')) addModelMapping(id, 'tragon');
  else if (id.startsWith('together-')) addModelMapping(id, 'together');
  else if (id.startsWith('requesty-')) addModelMapping(id, 'requesty');
  
});


// Function to verify model existence within this registry
export function verifyModelExists(modelId: string): boolean {
    console.log(`Verifying model existence for ID: "${modelId}"`);
    try {
        const modelInstance = meladai.languageModel(modelId as any); // Cast needed due to dynamic nature
        if (!modelInstance) {
             console.warn(`WARN (Registry): Model ID "${modelId}" resolved to null/undefined instance.`);
             return false;
        }
        console.log(`Successfully retrieved model instance for "${modelId}"`);
        return true;
    } catch (error: any) { // Catch specific error
        console.error(`ERROR (Registry): Failed to get languageModel for "${modelId}". Is the client initialized and ID correct? Error: ${error.message}`);
        return false;
    }
}

/* --- Log Final Registry and Debugging --- */
console.log("--- MeladAI Provider Registry Initialized ---");
console.log("Available Language Model IDs:", Object.keys(languageModelsConfig ?? {}));
console.log("---------------------------------------------");
console.log("ENV Checks:");
console.log(`  REQUESTY_API_KEY: ${serverEnv.REQUESTY_API_KEY ? 'SET' : 'NOT SET'}, BaseURL: ${serverEnv.REQUESTY_BASE_URL}`);
console.log(`  GROQ_API_KEY: ${serverEnv.GROQ_API_KEY ? 'SET' : 'NOT SET'}`);
console.log(`  KLUSTER_API_KEY: ${serverEnv.OPENAI_COMPATIBLE_API_KEY_KLUSTER ? 'SET' : 'NOT SET'}, BaseURL: ${serverEnv.OPENAI_COMPATIBLE_API_BASE_URL_KLUSTER}`);
console.log("---------------------------------------------");
console.log("Initialized Client Status:");
console.log(`  requestyClient: ${!!requestyClient}`);
console.log(`  groqClient: ${!!groqClient}`);
console.log(`  klusterClient: ${!!klusterClient}`);
console.log("---------------------------------------------");
console.log("Model Provider Map:", modelProviderMap); // Log the generated map
console.log("Provider Configs Stored:", providerConfigs); // Log the stored configs
console.log("---------------------------------------------");