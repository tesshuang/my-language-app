import { Category, Favorite } from "./TranslateHome";
import { FavoriteCard } from "./FavoriteCard";

export const Favorites = (props: {
  words: Favorite[];
  category: Category[];
}) => {
  const { words, category } = props;
  return (
    <div>
      {words.length !== 0 ? (
        <div>
          {words.map((word) => {
            return (
              <FavoriteCard key={word.id} word={word} category={category} />
            );
          })}
        </div>
      ) : (
        <div>No words is saved.</div>
      )}
    </div>
  );
};
