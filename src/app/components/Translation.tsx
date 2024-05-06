"use client";
import { useState } from "react";
import { Box, AbsoluteCenter } from "@chakra-ui/react";
import { TextInput } from "./TextInput";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { TextResult } from "./TextResult";
import { Favorite } from "../page";

export const Translation = (props: {
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
}) => {
  const { setAllWords, words } = props;

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
      <TextResult
        name={lang.output}
        inputLang={lang.input}
        result=""
        userInput={text}
        words={words}
        setAllWords={setAllWords}
        setText={setText}
      />
    </Box>
  );
};
