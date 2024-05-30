import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'

// POST /api/favorite
// Required fields in body: id,userInput,inputLang,translation,translationLang

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, userInput, inputLang,translation,translationLang } = req.body
  const result = await prisma.favorite.create({
    data: {
      id: 1,
      userInput: 'Hello',
      inputLang:'en',
      translation: "Bonjour",
      translationLang: 'fr',
    },
  })
  return res.status(201).json(result)
}