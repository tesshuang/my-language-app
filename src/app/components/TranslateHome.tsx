"use client";
import { VStack, Heading } from "@chakra-ui/react";
import { Translation } from "./Translation";
import { useState } from "react";
import { Favorites } from "./Favorites";

export type Favorite = {
  id: string;
  userInput: string;
  inputLang: string;
  result: string;
  resultLang: string;
};

export const TranslateHome = () => {
  const [allFavs, setAllFavs] = useState<Favorite[]>([]);

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
