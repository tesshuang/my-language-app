import { Text, Box, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { PlayIcon } from "./PlayIcon";

export const TextResult = (props: { name: string; result: string }) => {
  const { name, result } = props;

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
      />
    </Box>
  );
};
