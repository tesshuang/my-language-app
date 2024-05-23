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
import { handleEnterKey, handleSpeechSynthesis } from "../utils/helpers";
import type { Content } from "./Translation";

export const TextInput = (props: {
  content: Content;
  setContent: (content: Content) => void;
  handleTextInput: (value: string) => void;
}) => {
  const { content, setContent, handleTextInput } = props;
  const { input } = content;
  const { name, code, text } = input;
  const [isPlaying, setIsPlaying] = useState(false);

  const handleRest = () => {
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
                onClick={handleRest}
                onKeyDown={(e) => {
                  handleEnterKey(e, handleRest);
                }}
                tabIndex={0}
              />
              <PlayIcon
                isPlaying={isPlaying}
                onClick={() => handleSpeechSynthesis(text, code, setIsPlaying)}
                onKeyDown={(e) => {
                  handleEnterKey(e, () =>
                    handleSpeechSynthesis(text, code, setIsPlaying)
                  );
                }}
              />
            </HStack>
          )}
        </Flex>
      </FormControl>
    </div>
  );
};
