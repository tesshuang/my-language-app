import prisma from "./utils/prisma";

import { VStack } from "@chakra-ui/react";
import { TranslateHome } from "./components/TranslateHome";

export default async function Home() {
  const allFavourites = await prisma.favorite.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
    where: {
      categories: {
        some: {
          category: {
            name: "Favorites",
          },
        },
      },
    },
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany();

  return (
    <VStack as="main" align="stretch" p={4}>
      <TranslateHome favorites={allFavourites} categories={categories} />
    </VStack>
  );
}
