"use client";
import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Favorites } from "./Favorites";
import type { Favorite } from "./TranslateHome";

export const FavoritesHome = (props: { data: Favorite[] }) => {
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
        <Favorites words={allFavs} />
      </VStack>
    </>
  );
};
