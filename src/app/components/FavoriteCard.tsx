import { Box, Text, Divider, Flex, IconButton } from "@chakra-ui/react";
import { Category, Favorite } from "./TranslateHome";
import { PlayIcon } from "./PlayIcon";
import { StarIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { handleSpeechSynthesis } from "../utils/helpers";
import { useRouter } from "next/navigation";
import { CategoryModal } from "./CategoryModal";

const WordContent = (props: { lang: string; word: string }) => {
  const { lang, word } = props;
  const [isPlaying, setIsPlaying] = useState(false);
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
      <IconButton
        isRound={true}
        minW={"min-content"}
        height={"fit-content"}
        colorScheme={"white"}
        aria-label={
          isPlaying ? "pause the speaking" : "play the sound of the word"
        }
        icon={<PlayIcon isPlaying={isPlaying} />}
        onClick={() => handleSpeechSynthesis(word, lang, setIsPlaying)}
      />
    </Flex>
  );
};

export const FavoriteCard = (props: {
  word: Favorite;
  category: Category[];
  setCategory: (category: Category[]) => void;
}) => {
  const { word, category, setCategory } = props;
  const { id, inputLang, userInput, translationLang, translation } = word;
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/favorite/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      router.refresh();
    } catch (e) {
      console.error("Error occurs when handleDelete", e);
    }
  };
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md" mt={2}>
      <WordContent lang={inputLang} word={userInput} />
      <Divider borderColor="gray.500" my={2} />
      <WordContent lang={translationLang} word={translation} />
      <IconButton
        isRound={true}
        minW={"min-content"}
        height={"fit-content"}
        mr={"2"}
        colorScheme={"white"}
        aria-label="remove this word from favorite collection"
        icon={<StarIcon color="blue.500" />}
        onClick={() => handleDelete(id)}
      />
      <CategoryModal
        category={category}
        setCategory={setCategory}
        word={word}
      />
    </Box>
  );
};
