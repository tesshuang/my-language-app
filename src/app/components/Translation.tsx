"use client";
import { useState } from "react";
import { Box, AbsoluteCenter } from "@chakra-ui/react";
import { TextInput } from "./TextInput";
import { ArrowUpDownIcon } from "@chakra-ui/icons";
import { TextResult } from "./TextResult";
import { translateText } from "../utils/translate-api";
import { useDebounce } from "../utils/hooks";
import { useToast } from "@chakra-ui/react";

type InnerContent = {
  name: string;
  code: string;
  text: string;
};
export type Content = {
  input: InnerContent;
  output: InnerContent;
};

export const Translation = (props: {}) => {
  const [content, setContent] = useState<Content>({
    input: {
      name: "French",
      code: "fr",
      text: "",
    },
    output: {
      name: "English",
      code: "en",
      text: "",
    },
  });
  const [isTranslating, setIsTranslating] = useState(false);

  const toast = useToast();

  const handleSwitchLang = () => {
    setContent({
      input: {
        ...content.output,
      },
      output: {
        ...content.input,
      },
    });
  };

  const handleTranslate = async () => {
    const {
      input: { text, code: sourceLangCode },
      output: { code: targetLangCode },
    } = content;

    try {
      // TODO: remove commenting api call
      // const translation = await translateText(
      //   text,
      //   sourceLangCode,
      //   targetLangCode
      // );
      setContent({
        ...content,
        output: {
          ...content.output,
          // TODO: replace placeholder with variable
          // text: translation,
          text: "translation placeholder",
        },
      });
      setIsTranslating(false);
    } catch (e) {
      console.error(e);
      toast({
        description:
          "Sorry. There is an error from translating the text. Try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsTranslating(false);
    }
  };

  const debouncedOnChange = useDebounce(handleTranslate);

  const handleTextInput = (value: string) => {
    setIsTranslating(true);
    setContent({
      ...content,
      input: {
        ...content.input,
        text: value,
      },
    });
    debouncedOnChange();
  };

  return (
    <Box position="relative">
      <TextInput
        content={content}
        setContent={setContent}
        handleTextInput={handleTextInput}
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
        content={content}
        setContent={setContent}
        isTranslating={isTranslating}
      />
    </Box>
  );
};
