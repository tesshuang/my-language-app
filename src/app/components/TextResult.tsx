import { Text, Box, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { Favorite } from "../page";

let id = 0;

export const TextResult = (props: {
  name: string;
  inputLang: string;
  result: string;
  userInput: string;
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
  setText: (text: string) => void;
}) => {
  const { name, inputLang, result, userInput, setAllWords, words, setText } =
    props;

  const TEMP_RESULT = "Translation1";

  const addToFavorties = () => {
    id = id + 1;

    setAllWords([
      {
        id: `${id}`,
        userInput: userInput,
        inputLang: inputLang,
        result: TEMP_RESULT,
        resultLang: name,
      },
      ...words,
    ]);
    setText("");
    console.log("id", id);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
      <Text fontSize="xl" fontWeight="medium">
        {name}
      </Text>
      <Flex>
        <Text fontSize="md" color="gray.500" py={2} minHeight={16} flex="1">
          {Boolean(result) || "Translation"}
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
