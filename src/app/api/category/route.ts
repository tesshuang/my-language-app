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
