(function(Scratch) {
  'use strict';

  class PangAI {
    constructor() {
      // Internal Settings
      this.temp = 1;
      this.seed = 42;
      this.model = 'openai';
      this.systemPrompt = "You are a helpful AI assistant.";
      
      // Connection Logic
      this.isConnected = true; 
      this._checkConnection();
    }

    getInfo() {
      return {
        id: 'PangAI',
        name: 'Pang AI',
        color1: '#2c3e50', // Deep Space Blue
        color2: '#1a252f', // Darker Shadow
        
        // --- YOUR ICONS HERE ---
        // This puts the icon in the sidebar menu
        menuIconURI: 'https://raw.githubusercontent.com/Seigh-sword/PangAI-GithubPage/refs/heads/main/assets/PangAI-Icon.png',
        
        // This puts the icon on the left side of every single block
        blockIconURI: 'https://raw.githubusercontent.com/Seigh-sword/PangAI-GithubPage/refs/heads/main/assets/PangAI-Icon.png',

        blocks: [
          // --- BOOLEAN SENSORS ---
          {
            opcode: 'isAIReady',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'AI ready?'
          },

          // --- HAT BLOCKS (EVENTS) ---
          {
            opcode: 'whenAIConnects',
            blockType: Scratch.BlockType.HAT,
            text: 'when AI connects',
            isEdgeActivated: false
          },
          {
            opcode: 'whenAIDisconnects',
            blockType: Scratch.BlockType.HAT,
            text: 'when AI disconnects',
            isEdgeActivated: false
          },

          '---', // Separator

          // --- COMMANDS ---
          {
            opcode: 'setSystemLog',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set system log to [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'You are a friendly robot.' }
            }
          },
          {
            opcode: 'setModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set model to [MODEL]',
            arguments: {
              MODEL: { type: Scratch.ArgumentType.STRING, menu: 'models', defaultValue: 'openai' }
            }
          },
          {
            opcode: 'setTemp',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set temperature to [VAL]',
            arguments: {
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'setSeed',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set seed to [VAL]',
            arguments: {
              VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 42 }
            }
          },

          '---', // Separator

          // --- REPORTERS (ACTIONS) ---
          {
            opcode: 'askPrompt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask prompt [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'What is code?' }
            }
          },
          {
            opcode: 'getImageURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get url of image prompt [TEXT]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'a futuristic city' }
            }
          },

          // --- REPORTERS (VALUES) ---
          {
            opcode: 'getTemp',
            blockType: Scratch.BlockType.REPORTER,
            text: 'temperature'
          },
          {
            opcode: 'getSeed',
            blockType: Scratch.BlockType.REPORTER,
            text: 'seed'
          }
        ],
        menus: {
          models: {
            acceptReporters: true,
            items: ['openai', 'mistral', 'qwen', 'p1']
          }
        }
      };
    }

    // --- FUNCTIONALITY ---

    isAIReady() {
      return this.isConnected;
    }

    async _checkConnection() {
      setInterval(async () => {
        try {
          await fetch('https://text.pollinations.ai/', { method: 'HEAD' });
          if (!this.isConnected) {
            this.isConnected = true;
            Scratch.vm.runtime.startHats('PangAI_whenAIConnects');
          }
        } catch (e) {
          if (this.isConnected) {
            this.isConnected = false;
            Scratch.vm.runtime.startHats('PangAI_whenAIDisconnects');
          }
        }
      }, 10000); 
    }

    setSystemLog(args) { this.systemPrompt = args.TEXT; }
    setModel(args) { this.model = args.MODEL; }
    setTemp(args) { this.temp = args.VAL; }
    setSeed(args) { this.seed = args.VAL; }

    getTemp() { return this.temp; }
    getSeed() { return this.seed; }

    async askPrompt(args) {
      const prompt = encodeURIComponent(args.TEXT);
      const sys = encodeURIComponent(this.systemPrompt);
      const url = `https://text.pollinations.ai/${prompt}?model=${this.model}&seed=${this.seed}&temperature=${this.temp}&system=${sys}`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API Error");
        return await response.text();
      } catch (e) {
        return "Error: " + e.message;
      }
    }

    getImageURL(args) {
      const prompt = encodeURIComponent(args.TEXT);
      const randomSeed = Math.floor(Math.random() * 99999); 
      // FIX: Forces 'turbo' model to fix the broken image generation
      return `https://image.pollinations.ai/prompt/${prompt}?seed=${randomSeed}&nologo=true&model=turbo`;
    }
  }

  Scratch.extensions.register(new PangAI());
})(Scratch);
