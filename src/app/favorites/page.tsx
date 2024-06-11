import prisma from "../utils/prisma";
import { VStack } from "@chakra-ui/react";
import { FavoritesHome } from "../components/FavoritesHome";

export default async function Favorite() {
  const allFavourites = await prisma.favorite.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <VStack as="main" align="stretch" p={4}>
      <h1>Favorite page</h1>
      <FavoritesHome data={allFavourites} />
    </VStack>
  );
}
