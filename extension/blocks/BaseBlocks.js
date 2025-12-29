/**
 * BaseBlocks.js - The Core Pang AI Blockset
 * Contains Bot Management, AI Actions, Config, and Data blocks.
 */

export const install = (handler) => {
    const Scratch = handler.runtime;

    handler.runtime.extensions.register({
        id: 'PangAI',
        name: 'Pang AI',
        color1: '#2c3e50',
        color2: '#1a252f',
        menuIconURI: 'https://raw.githubusercontent.com/Seigh-sword/PangAI-GithubPage/refs/heads/main/assets/PangAI-Icon.png',
        blockIconURI: 'https://raw.githubusercontent.com/Seigh-sword/PangAI-GithubPage/refs/heads/main/assets/PangAI-Icon.png',
        
        blocks: [
            // 🤖 BOT MANAGEMENT
            { opcode: 'createBot', blockType: Scratch.BlockType.COMMAND, text: 'create bot [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }}},
            { opcode: 'deleteBot', blockType: Scratch.BlockType.COMMAND, text: 'delete bot [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }}},
            { opcode: 'renameBot', blockType: Scratch.BlockType.COMMAND, text: 'rename bot [N1] to [N2]', arguments: { N1: { type: Scratch.ArgumentType.STRING, defaultValue: 'Bot1' }, N2: { type: Scratch.ArgumentType.STRING, defaultValue: 'Bot2' }}},
            { opcode: 'switchBot', blockType: Scratch.BlockType.COMMAND, text: 'switch to bot [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }}},
            { opcode: 'botExists', blockType: Scratch.BlockType.BOOLEAN, text: 'bot [NAME] exists?', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }}},
            { opcode: 'activeBotName', blockType: Scratch.BlockType.REPORTER, text: 'active bot name' },

            '---', // 📡 AI COMMUNICATION
            { opcode: 'askActiveBot', blockType: Scratch.BlockType.REPORTER, text: 'ask active bot [TEXT]', arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello!' }}},
            { opcode: 'getImage', blockType: Scratch.BlockType.REPORTER, text: 'get image URL for [PROMPT]', arguments: { PROMPT: { type: Scratch.ArgumentType.STRING, defaultValue: 'a blue penguin' }}},
            { opcode: 'aiReady', blockType: Scratch.BlockType.BOOLEAN, text: 'AI ready?' },

            '---', // ⚙️ BOT CONFIGURATION
            { opcode: 'setSystem', blockType: Scratch.BlockType.COMMAND, text: 'set [NAME] system log to [TEXT]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }, TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'You are a helpful AI.' }}},
            { opcode: 'setModel', blockType: Scratch.BlockType.COMMAND, text: 'set [NAME] model to [MODEL]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }, MODEL: { type: Scratch.ArgumentType.STRING, menu: 'models', defaultValue: 'openai' }}},
            { opcode: 'setTemp', blockType: Scratch.BlockType.COMMAND, text: 'set [NAME] temperature to [NUM]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }, NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }}},
            { opcode: 'setSeed', blockType: Scratch.BlockType.COMMAND, text: 'set [NAME] seed to [NUM]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }, NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 42 }}},

            '---', // 📊 DATA & ARRAYS
            { opcode: 'exportBot', blockType: Scratch.BlockType.REPORTER, text: 'export bot [NAME] as array', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'Assistant' }}},
            { opcode: 'charCount', blockType: Scratch.BlockType.REPORTER, text: 'character count of [TEXT]', arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Pang AI' }}}
        ],
        menus: {
            models: { acceptReporters: true, items: ['openai', 'mistral', 'qwen', 'p1'] }
        }
    });

    // BLOCK LOGIC MAPPING
    // These functions call the handler's compiler and loader
    const ext = Scratch.extensions.get('PangAI');

    ext.createBot = (args) => handler.compiler.engine.createBot(args.NAME);
    ext.switchBot = (args) => handler.compiler.engine.switchBot(args.NAME);
    ext.askActiveBot = async (args) => await handler.compiler.run(`txt.prompt("${args.TEXT}")send;`);
    ext.getImage = (args) => handler.compiler.engine.fetchImageURL(args.PROMPT);
    ext.charCount = (args) => args.TEXT.length;
    // ... and so on for all blocks
};
