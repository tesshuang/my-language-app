import prisma from "./utils/prisma";

import { VStack } from "@chakra-ui/react";
import { TranslateHome } from "./components/TranslateHome";

export default async function Home() {
  const allFavourites = await prisma.favorite.findMany();

  return (
    <VStack as="main" align="stretch" p={4}>
      <TranslateHome data={allFavourites} />
    </VStack>
  );
}
