import { Text, Box, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { Favorite } from "./TranslateHome";
import { useEffect, useState } from "react";

let id = 0;

export const TextResult = (props: {
  name: string;
  inputLang: string;
  result: string;
  userInput: string;
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
  setText: (text: string) => void;
  isTranslating: boolean;
  setResult: (result: string) => void;
}) => {
  const {
    name,
    inputLang,
    result,
    userInput,
    setAllWords,
    words,
    setText,
    isTranslating,
    setResult,
  } = props;
  const [loader, setLoader] = useState(".");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTranslating) {
      interval = setInterval(() => {
        if (loader.length < 3) {
          setLoader(loader + ".");
        } else {
          setLoader(".");
        }
      }, 400);
    }

    //Clearing the interval
    return () => clearInterval(interval);
  }, [isTranslating, loader]);

  const addToFavorties = () => {
    id = id + 1;

    setAllWords([
      {
        id: `${id}`,
        userInput,
        inputLang,
        result,
        resultLang: name,
      },
      ...words,
    ]);
    setText("");
    setResult("");
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
      <Text fontSize="xl" fontWeight="medium">
        {name}
      </Text>
      <Flex>
        <Text
          fontSize="md"
          color={Boolean(result) ? "black" : "gray.500"}
          py={2}
          minHeight={16}
          flex="1"
        >
          {Boolean(result) ? result : "Translation"}
          {isTranslating && <span>{loader}</span>}
        </Text>

        <Box mt={2}>{Boolean(result) && <PlayIcon />}</Box>
      </Flex>
      <StarIcon
        color="gray.500"
        aria-label="add this word to favorite collection"
        onClick={addToFavorties}
      />
    </Box>
  );
};
