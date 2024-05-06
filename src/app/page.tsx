"use client";
import { VStack, Heading, Box } from "@chakra-ui/react";
import { Translation } from "./components/Translation";
import { useState } from "react";
import { Favorites } from "./components/Favorites";

export type Favorite = {
  id: string;
  userInput: string;
  inputLang: string;
  result: string;
  resultLang: string;
};

export default function Home() {
  const [allFavs, setAllFavs] = useState<Favorite[]>([]);

  return (
    <VStack as="main" align="stretch" p={4}>
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
    </VStack>
  );
}
