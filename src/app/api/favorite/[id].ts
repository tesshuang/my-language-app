import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../utils/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const favoriteId = req.query.id

  switch (req.method) {
    case 'DELETE':
      return handleDELETE(favoriteId, res)

    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`,
      )
  }
}

// DELETE /api/favorite/:id
async function handleDELETE(favoriteId: unknown, res: NextApiResponse<any>) {
  const favorite = await prisma.favorite.delete({
    where: { id: Number(favoriteId) },
  })
  return res.json(favorite)
}