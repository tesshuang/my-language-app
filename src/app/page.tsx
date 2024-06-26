import prisma from "./utils/prisma";

import { VStack } from "@chakra-ui/react";
import { TranslateHome } from "./components/TranslateHome";

export default async function Home() {
  const allFavourites = await prisma.favorite.findMany({
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
  console.log("allFavourites from prisma, ", allFavourites);

  return (
    <VStack as="main" align="stretch" p={4}>
      <TranslateHome favorites={allFavourites} categories={categories} />
    </VStack>
  );
}
