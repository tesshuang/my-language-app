"use client";
import { Box, AbsoluteCenter } from "@chakra-ui/react";
import { TextInput } from "./TextInput";
import { ArrowUpDownIcon } from "@chakra-ui/icons";

export const Translation = () => {
  return (
    <Box position="relative">
      <TextInput name="French" isEditable />
      <AbsoluteCenter axis="both" zIndex={1}>
        <ArrowUpDownIcon
          boxSize={10}
          focusable={true}
          bgColor="gray.800"
          color="gray.100"
          borderRadius="50%"
          p={2}
          aria-label="switch the tranlsation"
        />
      </AbsoluteCenter>
      <Box p={1} />
      <TextInput name="English" />
    </Box>
  );
};
