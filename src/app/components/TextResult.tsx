import { Text, Box, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { Favorite } from "./TranslateHome";
import { useEffect, useState } from "react";
import { handleSpeechSynthesis } from "../utils/helpers";
import type { Content } from "./Translation";

let id = 0;

export const TextResult = (props: {
  content: Content;
  setContent: (content: Content) => void;
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
  isTranslating: boolean;
}) => {
  const { content, setContent, setAllWords, words, isTranslating } = props;
  const { input, output } = content;
  const { name: inputLang, text: userInput } = input;
  const { name, code: outputCode, text: result } = output;
  const [loader, setLoader] = useState(".");
  const [isPlaying, setIsPlaying] = useState(false);

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
    setContent({
      input: {
        ...content.input,
        text: "",
      },
      output: {
        ...content.output,
        text: "",
      },
    });
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

        <Box mt={2}>
          {Boolean(result) && (
            <PlayIcon
              isPlaying={isPlaying}
              onClick={() =>
                handleSpeechSynthesis(result, outputCode, setIsPlaying)
              }
            />
          )}
        </Box>
      </Flex>
      <StarIcon
        color="gray.500"
        aria-label="add this word to favorite collection"
        onClick={addToFavorties}
      />
    </Box>
  );
};
