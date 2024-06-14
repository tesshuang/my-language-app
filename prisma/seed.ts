import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const favortieCategory = await prisma.category.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      id: 1,
      name: 'Favorites',
      isDefault: true
    },
  })

  console.log({ favortieCategory })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })