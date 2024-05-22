import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";
import { useState } from "react";
import { handleSpeechSynthesis } from "../utils/helpers";

export const TextInput = (props: {
  lang: {
    name: string;
    code: string;
  };
  text: string;
  setText: (text: string) => void;
  handleTextInput: (value: string) => void;
  setResult: (result: string) => void;
}) => {
  const {
    lang: { name, code },
    text,
    setText,
    handleTextInput,
    setResult,
  } = props;
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <FormControl borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
        <FormLabel fontSize="xl" m={0}>
          {name}
        </FormLabel>
        <Flex>
          <Textarea
            placeholder="Enter your text"
            border="none"
            py={2}
            px={0}
            flex="1"
            resize="none"
            value={text}
            onChange={(e) => {
              handleTextInput(e.target.value);
            }}
          />
          {Boolean(text) && (
            <HStack mt={2} spacing="8px" alignItems="flex-start">
              <CloseIcon
                boxSize={5}
                focusable={true}
                bgColor="gray.500"
                color="gray.100"
                borderRadius="50%"
                p={1}
                aria-label="reset text input"
                onClick={() => {
                  setText("");
                  setResult("");
                }}
              />
              <PlayIcon
                isPlaying={isPlaying}
                onClick={() => handleSpeechSynthesis(text, code, setIsPlaying)}
              />
            </HStack>
          )}
        </Flex>
      </FormControl>
    </div>
  );
};
