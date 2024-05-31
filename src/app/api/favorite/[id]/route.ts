import prisma from '../../../utils/prisma'

// DELETE /api/favorite/:id
// Required fields in body: id

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