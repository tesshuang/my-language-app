import prisma from '../../utils/prisma'

// POST /api/favorite
// Required fields in body: id,userInput,inputLang,translation,translationLang

export async function POST(request: Request) {
  const data  = await request.json()

  const { id, userInput, inputLang,translation,translationLang } = data
  await prisma.favorite.create({
    data: {
      id,
      userInput,
      inputLang,
      translation,
      translationLang,
    },
  })

  return new Response('Success!', {
    status: 200,
  })
 
}