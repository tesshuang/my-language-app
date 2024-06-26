import { Text, Box, Flex, IconButton } from "@chakra-ui/react";
import { StarIcon, CopyIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { useEffect, useState } from "react";
import { handleSpeechSynthesis } from "../utils/helpers";
import type { Content } from "./Translation";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const TextResult = (props: {
  content: Content;
  setContent: (content: Content) => void;
  isTranslating: boolean;
}) => {
  const { content, setContent, isTranslating } = props;
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
    try {
      const body = {
        id: uuidv4(),
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

      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        description: "There is an error while saving. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content.output.text);
      toast({
        description: "Translation copied successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        description: "Translation copied failed.",
        status: "error",
        duration: 3000,
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
            <IconButton
              isRound={true}
              minW={"min-content"}
              height={"fit-content"}
              colorScheme={"white"}
              aria-label={
                isPlaying ? "pause the speaking" : "play the sound of the word"
              }
              icon={<PlayIcon isPlaying={isPlaying} />}
              onClick={() =>
                handleSpeechSynthesis(result, outputCode, setIsPlaying)
              }
            />
          )}
        </Box>
      </Flex>
      {Boolean(userInput) && (
        <>
          <IconButton
            isRound={true}
            minW={"min-content"}
            height={"fit-content"}
            mr={"2"}
            colorScheme={"white"}
            aria-label="add this word to favorite collection"
            icon={<StarIcon color="gray.500" />}
            onClick={addToFavorties}
          />
          <IconButton
            isRound={true}
            minW={"min-content"}
            height={"fit-content"}
            colorScheme={"white"}
            aria-label="copy this word to clipboard"
            icon={<CopyIcon color="gray.500" />}
            onClick={handleCopy}
          />
        </>
      )}
    </Box>
  );
};
