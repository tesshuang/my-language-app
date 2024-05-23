import { Icon } from "@chakra-ui/react";

export const PlayIcon = (props: {
  isPlaying: boolean;
  onClick: () => void;
  onKeyDown: (event: any) => void;
}) => {
  const { isPlaying, onClick, onKeyDown } = props;

  return (
    <Icon
      fill="gray.500"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="5"
      height="5"
      viewBox="0 0 408.221 408.221"
      xmlSpace="preserve"
      aria-label={
        isPlaying ? "pause the speaking" : "play the sound of the word"
      }
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <g>
        {isPlaying ? (
          <svg viewBox="45 45 420 420">
            <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48ZM224,320a16,16,0,0,1-32,0V192a16,16,0,0,1,32,0Zm96,0a16,16,0,0,1-32,0V192a16,16,0,0,1,32,0Z" />
          </svg>
        ) : (
          <svg>
            <path
              d="M204.11,0C91.388,0,0,91.388,0,204.111c0,112.725,91.388,204.11,204.11,204.11c112.729,0,204.11-91.385,204.11-204.11
        C408.221,91.388,316.839,0,204.11,0z M286.547,229.971l-126.368,72.471c-17.003,9.75-30.781,1.763-30.781-17.834V140.012
        c0-19.602,13.777-27.575,30.781-17.827l126.368,72.466C303.551,204.403,303.551,220.217,286.547,229.971z"
            />
          </svg>
        )}
      </g>
    </Icon>
  );
};
