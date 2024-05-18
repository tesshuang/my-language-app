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


export const handleSynthesize = (text: string, langCode: string) => {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const voiceName = langCode === "en" ? "Aaron" : "Amélie";
  const theVoice = voices.find((voice) => voice.name === voiceName) || null;
  
  utterThis.lang = langCode;
  utterThis.voice = theVoice;

  synth.speak(utterThis);
};