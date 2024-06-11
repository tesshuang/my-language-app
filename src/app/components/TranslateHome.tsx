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

export const TranslateHome = (props: { data: Favorite[] }) => {
  const { data } = props;
  const [allFavs, setAllFavs] = useState<Favorite[]>(data);

  useEffect(() => {
    if (data.length !== allFavs.length) {
      setAllFavs(data);
    }
  }, [allFavs.length, data]);

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
        <Favorites words={allFavs} />
      </section>
    </>
  );
};
