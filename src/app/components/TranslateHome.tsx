"use client";
import { VStack, Heading, Button } from "@chakra-ui/react";
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
  categories: {
    category: {
      id: number;
      name: string;
      isDefault: boolean;
    };
  }[];
};

export type Category = {
  id: number;
  name: string;
  isDefault: boolean;
};

export const TranslateHome = (props: {
  favorites: Favorite[];
  categories: Category[];
}) => {
  const { favorites, categories } = props;
  const [allFavs, setAllFavs] = useState<Favorite[]>(favorites);
  const [category, setCategory] = useState(categories);

  useEffect(() => {
    setAllFavs(favorites);
  }, [favorites]);

  useEffect(() => {
    setCategory(categories);
  }, [categories]);

  return (
    <>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="2xl">
          Translation
        </Heading>
        <Translation />
      </VStack>
      <section>
        <Heading as="h1" size="2xl">
          Favorites
        </Heading>
        <Favorites words={allFavs} category={category} />
        {allFavs.length !== 0 && (
          <Link href="/favorites">
            <Button colorScheme="blue" margin="16px auto" display="block">
              See all
            </Button>
          </Link>
        )}
      </section>
    </>
  );
};
