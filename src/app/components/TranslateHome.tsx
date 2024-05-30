"use client";
import { VStack, Heading } from "@chakra-ui/react";
import { Translation } from "./Translation";
import { useState } from "react";
import { Favorites } from "./Favorites";

export type Favorite = {
  id: number;
  createdAt: Date;
  userInput: string;
  inputLang: string;
  translation: string;
  translationLang: string;
};

export const TranslateHome = (props: { data: Favorite[] }) => {
  const { data } = props;
  const [allFavs, setAllFavs] = useState<Favorite[]>(data);

  return (
    <>
      <VStack spacing={4} align="stretch">
        <Heading as="h1" size="2xl">
          Translation
        </Heading>
        <Translation setAllWords={setAllFavs} words={allFavs} />
      </VStack>
      <section>
        <Heading as="h1" size="2xl">
          Favorites
        </Heading>
        <Favorites words={allFavs} setAllWords={setAllFavs} />
      </section>
    </>
  );
};
