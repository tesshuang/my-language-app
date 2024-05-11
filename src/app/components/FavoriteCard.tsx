import { Box, Text, Divider, Flex } from "@chakra-ui/react";
import { Favorite } from "./TranslateHome";
import { PlayIcon } from "./PlayIcon";
import { StarIcon } from "@chakra-ui/icons";

const WordContent = (props: { lang: string; word: string }) => {
  const { lang, word } = props;
  return (
    <Flex alignItems="center">
      <Box flex={1}>
        <Text fontSize="xs" color="gray.500" fontWeight="medium">
          {lang}
        </Text>
        <Text fontSize="xl" fontWeight="medium">
          {word}
        </Text>
      </Box>
      <PlayIcon />
    </Flex>
  );
};

export const FavoriteCard = (props: {
  word: Favorite;
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
}) => {
  const { word, words, setAllWords } = props;
  const { id, inputLang, userInput, resultLang, result } = word;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" mt={2}>
      <WordContent lang={inputLang} word={userInput} />
      <Divider borderColor="gray.500" my={2} />
      <WordContent lang={resultLang} word={result} />
      <StarIcon
        color="blue.500"
        aria-label="remove this word from favorite collection"
        onClick={() => {
          setAllWords(words.filter((word) => word.id !== id));
        }}
      />
    </Box>
  );
};
