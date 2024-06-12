import { Category, Favorite } from "./TranslateHome";
import { FavoriteCard } from "./FavoriteCard";

export const Favorites = (props: {
  words: Favorite[];
  category: Category[];
  setCategory: (category: Category[]) => void;
}) => {
  const { words, category, setCategory } = props;
  return (
    <div>
      {words.length !== 0 ? (
        <div>
          {words.map((word, index) => {
            return (
              <FavoriteCard
                key={index}
                word={word}
                category={category}
                setCategory={setCategory}
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
