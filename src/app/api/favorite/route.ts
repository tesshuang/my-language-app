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
              connect: {
                // TODO: Replace constance value
                id: 1,
              },
            },
          },
        ],
      },
    },
  })

  return new Response('Success!', {
    status: 200,
  });
}

// DELETE /api/favorite
// delete all items in favorite table

export async function DELETE(request: Request) {
  try{

    // Delete all related record in favorite table
    await prisma.favorite.deleteMany({});

    return new Response("Success delete all words.");

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    });
  }
}