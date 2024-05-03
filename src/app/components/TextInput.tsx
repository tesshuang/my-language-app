import { FormControl, FormLabel, Textarea, Text, Box } from "@chakra-ui/react";

export const TextInput = (props: { name?: string; isEditable?: boolean }) => {
  const { name, isEditable = false } = props;
  return (
    <div>
      <FormControl borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
        <FormLabel fontSize="xl">{name}</FormLabel>
        {isEditable ? (
          <Textarea placeholder="Enter your text" border="none" p={2} />
        ) : (
          <Box p={2} minHeight={20}>
            <Text fontSize="md" color="gray.500" px={2}>
              Translation
            </Text>
          </Box>
        )}
      </FormControl>
    </div>
  );
};
