import './App.css';
import { NewsFeed } from "./components/NewsFeed.tsx";
import { Header } from "./components/Header.tsx";
import { Favorites } from "./components/Favorites.tsx";
import { useState } from "react";
import { useFavorites } from "./hooks/useFavorites.ts";

function App() {
    const [viewMode, setViewMode] = useState<'news' | 'favorites'>('news');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const favorites = useFavorites();

    return (
        <div className="container">
            <Header
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                favoritesCount={favorites.favoritesCount}
                onSearch={setSearchQuery}
            />
            {viewMode === 'news'
                ? <NewsFeed
                    searchQuery={searchQuery}
                    isFavorite={favorites.isFavorite}
                    onToggleFavorite={favorites.toggleFavorite}
                />
                : <Favorites
                    favorites={favorites.favorites}
                    isFavorite={favorites.isFavorite}
                    onToggleFavorite={favorites.toggleFavorite}
                />
            }
        </div>
    );
}

export default App;