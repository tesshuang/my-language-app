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

    // find exist categories
    const existedCategories = await prisma.categoriesOnFavorites.findMany({
      where: {
        favoriteId: id
      },
      select: {
        categoryId: true
      }
    })
    const existedCategoryIds = existedCategories.map(category => category.categoryId);
    const addCategoryIds = categoryIds.filter(number => !existedCategoryIds.includes(number));
    const removeCategoryIds = existedCategoryIds.filter(number => !categoryIds.includes(number));

    // create new records
    const createCategories = addCategoryIds.map(categoryId => ({
      favoriteId: id, 
      categoryId: categoryId,
      assignedAt: new Date(),
    }));
    await prisma.categoriesOnFavorites.createMany({
      data: createCategories,
    });

    // delete records
    const deleteCategories = removeCategoryIds.map(categoryId => ({
      favoriteId: id,
      categoryId: categoryId,
    }))
    await prisma.categoriesOnFavorites.deleteMany({
      where: {
        OR: deleteCategories,
      },
    });

    return new Response("Success")

  } catch(e: any) {
    return new Response(`Delete favorite error: ${e.message}`, {
      status: 400,
    })
  }
}