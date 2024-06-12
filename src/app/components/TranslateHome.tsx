"use client";
import { VStack, Heading } from "@chakra-ui/react";
import { Translation } from "./Translation";
import { useEffect, useState } from "react";
import { Favorites } from "./Favorites";
import Link from "next/link";

export type Favorite = {
  id: string;
  createdAt: Date;
  userInput: string;
  inputLang: string;
  translation: string;
  translationLang: string;
};

export type Category = {
  id: number;
  name: string;
};

export const TranslateHome = (props: {
  favorites: Favorite[];
  categories: Category[];
}) => {
  const { favorites, categories } = props;
  const [allFavs, setAllFavs] = useState<Favorite[]>(favorites);
  const [category, setCategory] = useState(categories);

  useEffect(() => {
    if (favorites.length !== allFavs.length) {
      setAllFavs(favorites);
    }
  }, [allFavs.length, favorites]);

  return (
    <>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="2xl">
          Translation
        </Heading>
        <Translation />
      </VStack>
      <section>
        <Link href="/favorites">
          <Heading as="h1" size="2xl" textDecoration="underline">
            Favorites
          </Heading>
        </Link>
        <Favorites
          words={allFavs}
          category={category}
          setCategory={setCategory}
        />
      </section>
    </>
  );
};
