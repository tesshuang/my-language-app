import prisma from '../../utils/prisma'

// POST /api/category
// Required fields in body: name

export async function POST(request: Request) {
  const data  = await request.json()

  const { name } = data
  
  const category = await prisma.category.create({
    data: {
      name,
    }
  })  

  return Response.json({data: category}, {status: 200})
}

// DELETE /api/category
// Required fields in body: ids
export async function DELETE(request: Request) {
  try{
    const data  = await request.json();

    const { ids } = data;

    // Delete selected records in category table
    await prisma.category.deleteMany({
      where: {
        id: {
          in: ids
        }
      },
    });

    return new Response("Successfully categories by ids.");

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    });
  }
}