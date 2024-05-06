import { Favorite } from "../page";
import { FavoriteCard } from "./FavoriteCard";

export const Favorites = (props: {
  words: Favorite[];
  setAllWords: (words: Favorite[]) => void;
}) => {
  const { words, setAllWords } = props;
  return (
    <div>
      {words.length !== 0 ? (
        <div>
          {words.map((word, index) => {
            return (
              <FavoriteCard
                key={index}
                word={word}
                words={words}
                setAllWords={setAllWords}
              />
            );
          })}
        </div>
      ) : (
        <div>No favourite words is saved.</div>
      )}
    </div>
  );
};
