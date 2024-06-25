"use client";
import { HStack, Tag, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Favorites } from "./Favorites";
import type { Category, Favorite } from "./TranslateHome";

export const FavoritesHome = (props: {
  favorites: Favorite[];
  categories: Category[];
}) => {
  const { favorites, categories } = props;

  const [category, setCategory] = useState(categories);
  const [selectedId, setSelectedId] = useState<null | number>(null);

  const selectedWords = favorites.filter((word) =>
    Boolean(
      word.categories.find((category) => category.category.id === selectedId)
    )
  );

  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={2}>
        {category.map((item) => (
          <Tag
            size="md"
            key={item.id}
            variant="solid"
            colorScheme="blue"
            borderRadius="full"
          >
            <button onClick={() => setSelectedId(item.id)}>{item.name}</button>
          </Tag>
        ))}
      </HStack>
      <Favorites
        words={selectedId ? selectedWords : favorites}
        category={category}
        setCategory={setCategory}
      />
    </VStack>
  );
};
