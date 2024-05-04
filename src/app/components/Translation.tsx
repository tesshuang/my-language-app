"use client";
import { useState } from "react";
import { Box, AbsoluteCenter, Text } from "@chakra-ui/react";
import { TextInput } from "./TextInput";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { TextResult } from "./TextResult";

export const Translation = () => {
  const [text, setText] = useState("");
  const [lang, setLang] = useState({
    input: "French",
    output: "English",
  });

  const handleSwitchLang = () => {
    const tempInput = lang.input;

    setLang({
      input: lang.output,
      output: tempInput,
    });
  };

  return (
    <Box position="relative">
      <TextInput name={lang.input} text={text} setText={setText} />
      <AbsoluteCenter axis="both" zIndex={1}>
        <ArrowUpDownIcon
          boxSize={10}
          focusable={true}
          bgColor="gray.800"
          color="gray.100"
          borderRadius="50%"
          p={2}
          aria-label="switch the tranlsation"
          onClick={handleSwitchLang}
        />
      </AbsoluteCenter>
      <Box p={1} />
      <TextResult name={lang.output} />
    </Box>
  );
};
