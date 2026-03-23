// import axios from "axios";

// export const askAI = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("API Key:", process.env.OPENROUTER_API_KEY);
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "mistralai/mistral-small-3.1-24b-instruct:free",
//         messages: [{ role: "user", content: prompt }],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
            
//         },
//       }
//     );

//     const answer = response.data.choices[0].message.content;

//     res.json({ answer });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "AI Error" , error: error.message});
//   }
// };


import axios from "axios";

const MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "mistralai/mistral-small-3.1-24b-instruct:free",
  "google/gemma-3-27b-it:free",
];

export const askAI = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required" });
  }

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);

      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model,
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5000",
          },
        }
      );

      const answer = response.data.choices[0].message.content;
      console.log(`Success with model: ${model}`);
      return res.json({ answer }); 

    } catch (error) {
      const status = error.response?.status;
      console.warn(`Model ${model} failed — status: ${status}`);

      if (status === 429 || status === 404) {
        continue; // rate limited or removed, try next model
      }

      // Unexpected error — don't try other models
      console.error(error);
      return res.status(500).json({ message: "AI Error", error: error.message });
    }
  }

  // All models exhausted
  return res.status(429).json({
    message: "All free models are currently rate limited. Please try again in a moment.",
  });
};