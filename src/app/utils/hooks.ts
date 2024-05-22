import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "./helpers";

export const useDebounce = (callback: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      // @ts-ignore
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

export const useSpeechSynthesis = (text: string, langCode: string)  => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const voiceName = langCode === "en" ? "Aaron" : "Amélie";
    const theVoice = voices.find((voice) => voice.name === voiceName) || null;
    utterThis.lang = langCode;
    utterThis.voice = theVoice;

    if (isPlaying) {
      synth.speak(utterThis);
    } else {
      synth.pause();
    }

    utterThis.onstart = (event) => {
      console.log(
        `We have started uttering this speech: ${event.utterance.text}`
      );
    };

    utterThis.onend = (event) => {
      console.log(`Speech END at ${event.elapsedTime} seconds.`);
      setIsPlaying(false);
    };

    return () => {
      synth.cancel();
    };
  }, [isPlaying, langCode, text]);

  return {isPlaying, setIsPlaying};
}