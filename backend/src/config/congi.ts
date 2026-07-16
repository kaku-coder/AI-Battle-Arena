import "dotenv/config";

type ConfigType = {
    readonly GOOGLE_API_KEY: string;
    readonly MISTRAL_API_KEY: string;
    readonly COHERE_API_KEY: string;
    readonly GROW_API_KEY: string;
}

const config: ConfigType = {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
    COHERE_API_KEY: process.env.COHERE_API_KEY || "",
    GROW_API_KEY: process.env.GROW_API_KEY || ""
}

export default config;