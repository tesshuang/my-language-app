import {
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const TextInput = (props: { name?: string; isEditable?: boolean }) => {
  const { name, isEditable = false } = props;

  return (
    <div>
      <FormControl borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
        <FormLabel fontSize="xl" m={0}>
          {name}
        </FormLabel>
        {isEditable ? (
          <Flex>
            <Textarea
              placeholder="Enter your text"
              border="none"
              py={2}
              px={0}
              flex="1"
            />
            <CloseIcon
              mt={2}
              boxSize={5}
              focusable={true}
              bgColor="gray.400"
              color="gray.100"
              borderRadius="50%"
              p={1}
              aria-label="reset text input"
            />
          </Flex>
        ) : (
          <Box minHeight={20}>
            <Text fontSize="md" color="gray.500" py={2}>
              Translation
            </Text>
          </Box>
        )}
      </FormControl>
    </div>
  );
};
