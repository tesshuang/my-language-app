"use client";
import { useState } from "react";
import { Box, AbsoluteCenter } from "@chakra-ui/react";
import { TextInput } from "./TextInput";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { TextResult } from "./TextResult";
import { Favorite } from "./TranslateHome";
import { translateText } from "../utils/translate-api";
import { useDebounce } from "../utils/hooks";

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
  const [isTranslating, setIsTranslating] = useState(false);
  const [result, setResult] = useState("");

  const handleSwitchLang = () => {
    const tempInput = lang.input;
    setLang({
      input: lang.output,
      output: tempInput,
    });
  };

  const getLangCode = (lang: string) => (lang === "French" ? "fr" : "en");

  const handleTranslate = async () => {
    console.log("sending request to translation api:", text);

    try {
      const targetLang = getLangCode(lang.output);
      const sourceLang = getLangCode(lang.input);
      const translation = await translateText(text, sourceLang, targetLang);
      setResult(translation);
      setIsTranslating(false);
    } catch (e) {
      console.error(e);
      setIsTranslating(false);
    }
  };

  const debouncedOnChange = useDebounce(handleTranslate);

  const handleTextInput = (value: string) => {
    setIsTranslating(true);
    setText(value);
    debouncedOnChange();
  };

  return (
    <Box position="relative">
      <TextInput
        name={lang.input}
        text={text}
        setText={setText}
        handleTextInput={handleTextInput}
        setResult={setResult}
      />
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
        result={result}
        userInput={text}
        words={words}
        setAllWords={setAllWords}
        setText={setText}
        isTranslating={isTranslating}
        setResult={setResult}
      />
    </Box>
  );
};
