import { Text, Box, Flex } from "@chakra-ui/react";
import { StarIcon, CopyIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { Favorite } from "./TranslateHome";
import { useEffect, useState } from "react";
import { handleEnterKey, handleSpeechSynthesis } from "../utils/helpers";
import type { Content } from "./Translation";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

let id = 3;

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

  const toast = useToast();
  const router = useRouter();

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

  const addToFavorties = async () => {
    id = id + 1;
    try {
      console.log("call /api/favorite");
      const body = {
        id: id,
        createdAt: new Date(),
        userInput,
        inputLang,
        translation: result,
        translationLang: name,
      };

      await fetch(`/api/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      router.refresh(); // TODO: Investigate why it's not refreshing
    } catch (error) {
      console.error(error);
    }

    // setAllWords([
    //   {
    //     id: id,
    //     createdAt: new Date(),
    //     userInput,
    //     inputLang,
    //     translation: result,
    //     translationLang: name,
    //   },
    //   ...words,
    // ]);
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.output.text);
      toast({
        description: "Translation copied successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        description: "Translation copied failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
              onKeyDown={(e) => {
                handleEnterKey(e, () =>
                  handleSpeechSynthesis(result, outputCode, setIsPlaying)
                );
              }}
            />
          )}
        </Box>
      </Flex>
      {Boolean(userInput) && (
        <>
          <StarIcon
            color="gray.500"
            aria-label="add this word to favorite collection"
            onClick={addToFavorties}
            onKeyDown={(e) => {
              handleEnterKey(e, addToFavorties);
            }}
            tabIndex={0}
            mr="2"
          />
          <CopyIcon
            color="gray.500"
            aria-label="copy this word to clipboard"
            tabIndex={0}
            onClick={handleCopy}
            onKeyDown={(e) => {
              handleEnterKey(e, handleCopy);
            }}
          />
        </>
      )}
    </Box>
  );
};
