import { FormControl, FormLabel, Textarea, Flex } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const TextInput = (props: {
  name: string;
  text: string;
  setText: (text: string) => void;
}) => {
  const { name, text, setText } = props;

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
            onChange={(e) => setText(e.target.value)}
          />
          {Boolean(text) && (
            <CloseIcon
              mt={2}
              boxSize={5}
              focusable={true}
              bgColor="gray.400"
              color="gray.100"
              borderRadius="50%"
              p={1}
              aria-label="reset text input"
              onClick={() => setText("")}
            />
          )}
        </Flex>
      </FormControl>
    </div>
  );
};
