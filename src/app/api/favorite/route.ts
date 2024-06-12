import prisma from '../../utils/prisma'

// POST /api/favorite
// Required fields in body: id,userInput,inputLang,translation,translationLang

export async function POST(request: Request) {
  const data  = await request.json()

  const { id, userInput, inputLang, translation, translationLang } = data
  await prisma.favorite.create({
    data: {
      id,
      userInput,
      inputLang,
      translation,
      translationLang,
      categories: {
        create: [
          {
            assignedAt: new Date(),
            category: {
              //TODO: fix constant id value
              // create new category if favorites is not found
              connectOrCreate: {
                where: {
                  id: 2
                },
                create: {
                  name: 'Favorites',
                  id: 2,
                },
              },
            },
          },
        ],
      },
    },
  })

  return new Response('Success!', {
    status: 200,
  })
 
}