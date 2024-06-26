export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
  timeout: number = 2000,
): (...args: Params) => void {
  let timer: NodeJS.Timeout
  return (...args: Params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}

export const handleSpeechSynthesis = (
  text: string,
  langCode: string,
  setIsPlaying: (isPlaying: boolean) => void
) => {
  //TODO: Fix mixed speechSynthesis
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const voiceLang = langCode === "en" ? "en-US" : "fr-CA";
  const theVoices = voices.find((voice) => voice.lang === voiceLang) || null;
  utterThis.lang = voiceLang;
  utterThis.voice = theVoices;

  if (synth.paused) {
    synth.resume();
    setIsPlaying(true);
  } else if (synth.speaking) {
    synth.pause();
    setIsPlaying(false);
  } else {
    synth.speak(utterThis);
    setIsPlaying(true);
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
};
