// controllers/ollamaController.js
export const ollamaController = async (req, res) => {
  const { prompt, max_tokens = 256 } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen2.5:7b-instruct",
        prompt,
        max_tokens,
        stream: false   // <--- disable streaming
      })
    });

    const data = await response.json();

    // Ollama returns a `response` array of strings if streaming=false
    // If not, sometimes `data.response` contains the text
    let text = data.response || "";

    res.json({ text });
  } catch (err) {
    console.error("Ollama API error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
