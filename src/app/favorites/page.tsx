import prisma from "../utils/prisma";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import { FavoritesHome } from "../components/FavoritesHome";
import Link from "next/link";

export default async function Favorite() {
  const allFavourites = await prisma.favorite.findMany({
    orderBy: {
      createdAt: "desc",
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
      <HStack justifyContent="space-between" alignItems="end">
        <Heading as="h1" size="2xl">
          Saved
        </Heading>
        <Link href="/">
          <Heading as="h2" size="lg" textDecoration="underline">
            Home
          </Heading>
        </Link>
      </HStack>

      <FavoritesHome favorites={allFavourites} categories={categories} />
    </VStack>
  );
}
