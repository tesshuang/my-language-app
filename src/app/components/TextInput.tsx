import {
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";

export const TextInput = (props: {
  name: string;
  text: string;
  setText: (text: string) => void;
  handleTextInput: (value: string) => void;
  setResult: (result: string) => void;
}) => {
  const { name, text, setText, handleTextInput, setResult } = props;

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
              <PlayIcon />
            </HStack>
          )}
        </Flex>
      </FormControl>
    </div>
  );
};
