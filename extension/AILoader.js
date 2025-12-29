/**
 * AILoader.js - The Core Engine for Pang AI
 * Handles Pollinations.ai API and state management.
 */

export class AILoader {
    constructor() {
        // Internal state for AI settings
        this.config = {
            textBase: "https://text.pollinations.ai/",
            imageBase: "https://image.pollinations.ai/prompt/",
            defaultModel: "openai",
            defaultSeed: 42,
            defaultTemp: 1
        };
        
        // Attachment buffer
        this.currentAttachments = [];
    }

    /**
     * The core Text Request function (The "send" in your syntax)
     */
    async fetchText(prompt, system = "You are a helpful AI.", customSettings = {}) {
        const seed = customSettings.seed || this.config.defaultSeed;
        const model = customSettings.model || this.config.defaultModel;
        
        // Build the URL with the "AI Juice" logic
        let url = `${this.config.textBase}${encodeURIComponent(prompt)}?model=${model}&seed=${seed}&system=${encodeURIComponent(system)}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("API Offline");
            return await response.text();
        } catch (error) {
            console.error("PangAI Loader Error:", error);
            return "Error: Could not reach the AI brain.";
        }
    }

    /**
     * The core Image Request function (The "img.prompt" in your syntax)
     */
    fetchImageURL(prompt, seed = Math.floor(Math.random() * 99999)) {
        // We use the turbo model here for stability as we discussed
        return `${this.config.imageBase}${encodeURIComponent(prompt)}?seed=${seed}&nologo=true&model=turbo`;
    }

    /**
     * Logic for Context/Attachments
     */
    addAttachment(url) {
        this.currentAttachments.push(url);
        console.log("PangAI: Attachment added:", url);
    }

    clearAttachments() {
        this.currentAttachments = [];
    }
}
