import prisma from '../../../utils/prisma'

// DELETE /api/favorite/:id
// delete the item in favorite table

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try{
    const id = params.id

   const favorite = await prisma.favorite.delete({
      where: { id: id },
    })

    return Response.json(favorite)

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    })
  }
}

// PATCH /api/favorite/:id
// Required fields in body: categoryIds
// updates the resource with the request category payload 

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try{
    const id = params.id
    const data  = await request.json()
    const { categoryIds }: {categoryIds: number[]} = data

    const createCategories = categoryIds.map(id => ({
      assignedAt: new Date(),
      category: {
        connect: {
          id: id,
        },
      },
    }));

   const favorite = await prisma.favorite.update({
      where: { id: id },
      data: {
        categories: {
          create: createCategories,
        }
      }
    })

    return Response.json(favorite)

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    })
  }
}