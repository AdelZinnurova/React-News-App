import { ArticleCard } from './ArticleCard.tsx';
import type { Article } from '../types';

type FavoritesProps = {
  favorites: Article[];
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (article: Article) => void;
};

export const Favorites = ({ favorites, onToggleFavorite, isFavorite }: FavoritesProps) => {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-bookmark-x fs-1 text-muted"></i>
        <h3 className="mt-3">No favorites yet</h3>
        <p className="text-muted">Start bookmarking articles to see them here</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Favorites</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {favorites.map(article => (
          <div key={article.id}>
            <ArticleCard article={article} isFavorite={isFavorite(article.id)} onToggleFavorite={onToggleFavorite} />
          </div>
        ))}
      </div>
    </div>
  );
};
