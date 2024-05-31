import { Favorite } from "./TranslateHome";
import { FavoriteCard } from "./FavoriteCard";

export const Favorites = (props: { words: Favorite[] }) => {
  const { words } = props;
  return (
    <div>
      {words.length !== 0 ? (
        <div>
          {words.map((word, index) => {
            return <FavoriteCard key={index} word={word} />;
          })}
        </div>
      ) : (
        <div>No favourite words is saved.</div>
      )}
    </div>
  );
};
