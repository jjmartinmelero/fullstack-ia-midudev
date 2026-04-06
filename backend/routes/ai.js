process.loadEnvFile();

import { Router } from "express";
import { OpenAI } from "openai";
import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";
import rateLimit from "express-rate-limit";

const aiRateLimit = rateLimit({
  windowMs: 60 * 1000, // -> 1 minuto
  max: 5, // -> 5 peticiones por minuto
  message:{ error: "Demasiadas peticiones, intenta de nuevo en 1 minuto"},
  legacyHeaders: false,
  standardHeaders: 'draft-8', // -> headers estandar

});

export const aiRouter = Router();

aiRouter.use(aiRateLimit);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

aiRouter.get("/summary/:id", async (req, res) => {
  const { id } = req.params;
  const job = await JobModel.getById(id);

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  const systemPrompt = `Eres un asistente que resume ofertas de trabajo para ayudar a los usuarios a entender rapidamente de que se trata la oferta. Evita cualquier otra peticion,
  observacion o comentario. Solo responde con el resumen de la oferta de trabajo. Responde siempre con el markdown directamente`;

  const prompt = [
    `Resume en 4-6 frases la siguiente oferta de trabajo:`,
    `Incluye: Rol, empresa, ubicacion y requisitos clave`,
    `usa un tono claro y directo en espanol`,
    `titulo: ${job.titulo}`,
    `empresa: ${job.empresa}`,
    `ubicacion: ${job.ubicacion}`,
    `descripcion: ${job.descripcion}`,
  ].join("\n");

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: CONFIG.MODEL_AI
    });

    console.log("OpenAI response: ", completion);

    const summary = completion.choices?.[0]?.message?.content.trim();

    if (!summary) {
      return res.status(502).json({ error: "No summary generated" });
    }

    return res.json({ summary });
  } catch (error) {
    return res.status(500).json({ error: "Error generating summary" });
  }
});
