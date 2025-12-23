// ai.js - HTTP-compatible AI bridge for PenguinMod
(async () => {
  if (!window.FreeAIForAll) {
    console.error("Free-AI-For-All.js is not loaded!");
    return;
  }

  const ai = new FreeAIForAll();

  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type') || 'text'; // "text" or "image"
  const prompt = params.get('prompt') || '';
  const model = params.get('model') || 'openai';
  const seed = parseInt(params.get('seed')) || undefined;
  const temperature = parseFloat(params.get('temperature')) || 0.7;
  const maxTokens = parseInt(params.get('maxTokens')) || 500;
  const width = parseInt(params.get('width')) || 1024;
  const height = parseInt(params.get('height')) || 1024;

  try {
    if (type === 'text') {
      const response = await ai.chat(prompt, { model, seed, temperature, maxTokens });
      // Output plain text for PenguinMod to read
      document.body.innerText = response;
    } else if (type === 'image') {
      const imageUrl = await ai.generateImage(prompt, { model, seed, width, height });
      // Output plain image URL
      document.body.innerText = imageUrl;
    } else {
      document.body.innerText = 'Error: unknown type';
    }
  } catch (err) {
    document.body.innerText = 'Error: ' + err.message;
  }
})();
