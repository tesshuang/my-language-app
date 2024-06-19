import prisma from '../../../utils/prisma'

// DELETE /api/favorite/:id
// delete the item in favorite table

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try{
    const id = params.id

    // Delete all related record in relation table
    await prisma.categoriesOnFavorites.deleteMany({
      where: {
        favoriteId: id, // ID of the favorite whose relations you want to delete
      },
    });

    // Delete the record in favorite table
   await prisma.favorite.delete({
      where: { id: id },
    })

    return new Response("Success")

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

    // find all addedIds and removeIds
    const unchangedIds: number[] = [];
    const removeIds = [];
    const existedIds = await prisma.categoriesOnFavorites.findMany({
      where: {
        favoriteId: id
      },
      select: {
        categoryId: true
      }
    })

    for (let i = 0; i < existedIds.length; i++) {
      if (categoryIds.includes(existedIds[i].categoryId)) {
        unchangedIds.push(existedIds[i].categoryId);
      } else {
        removeIds.push(existedIds[i].categoryId);
      }
    }

    const addIds = categoryIds.filter((number) => !unchangedIds.includes(number));

    // create new records
    const createCategories = addIds.map(categoryId => ({
      favoriteId: id, 
      categoryId: categoryId,
      assignedAt: new Date(),
    }));
    await prisma.categoriesOnFavorites.createMany({
      data: createCategories,
    });

    // deletes the records
    const idsToDelete = removeIds.map(categoryId => ({
      favoriteId: id,
      categoryId: categoryId,
    }))
    await prisma.categoriesOnFavorites.deleteMany({
      where: {
        OR: idsToDelete,
      },
    });

    return new Response("Success")

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    })
  }
}