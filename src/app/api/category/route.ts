import prisma from '../../utils/prisma'

// POST /api/category
// Required fields in body: name

export async function POST(request: Request) {
  const data  = await request.json()
  console.log("data", data)

  const { name } = data
  
  const category = await prisma.category.create({
    data: {
      name,
    }
  })  

  return Response.json({data: category}, {status: 200})
}

export async function DELETE(request: Request) {
  try{

    // Delete all related record in category table
    await prisma.category.deleteMany({
      where: {
        name: {
          not: 'Favorites',
        },
      },
    });

    return new Response("Successfully delete all categories.");

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    });
  }
}