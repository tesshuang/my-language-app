import { Text, Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export const TextResult = (props: { name: string }) => {
  const { name } = props;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
      <Text fontSize="xl" fontWeight="medium">
        {name}
      </Text>
      <Text fontSize="md" color="gray.500" py={2} minHeight={16}>
        Translation
      </Text>
      <StarIcon
        color="gray.500"
        aria-label="add this word to favorite collection"
      />
    </Box>
  );
};
