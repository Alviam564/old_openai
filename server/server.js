import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";


dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log("OpenAI response:", response.data);

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
  console.error("OpenAI error:", error.response?.data || error.message || error);
  res.status(500).send({
    error: error.response?.data || error.message || "Unknown error",
  });
}
})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))