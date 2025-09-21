import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";

type HeaderProps = {
    viewMode: 'news' | 'favorites';
    onViewModeChange: (mode: 'news' | 'favorites') => void;
    favoritesCount: number;
    onSearch: (query: string) => void;
}

export const Header = ({viewMode, favoritesCount, onViewModeChange, onSearch}:HeaderProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        try {
            const saved = localStorage.getItem("theme") as "light" | "dark" | null;
            if (saved === "light" || saved === "dark") return saved;
            return window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
        } catch {
            return "light";
        }
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));
    const toggleViewMode = () => {
        const newMode = viewMode === 'news' ? 'favorites' : 'news';
        onViewModeChange(newMode);
    };

    return (
        <div className='d-flex justify-content-between align-items-center mb-5'>
            <div>
                <a className="h5 text-decoration-none" href="/">
                    NewsHub
                </a>
            </div>
            <form onSubmit={handleSearchSubmit} className='input-group w-50 rounded-5'>
                <input
                    type="text"
                    placeholder="Search for news..."
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="btn btn-outline-secondary">
                    <i className="bi bi-search"></i>
                </button>
            </form>
            <div className='d-flex gap-3'>
                <button onClick={toggleViewMode}
                        className={`btn ${viewMode === 'favorites' ? 'btn-secondary' : 'btn-outline-secondary'} position-relative`}>
                    <i className="bi bi-bookmark"></i>
                    {favoritesCount > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {favoritesCount}
                        </span>
                    )}
                </button>
                <button onClick={toggleTheme}>
                    {theme === "light"
                        ? <i className="bi bi-sun fs-4"></i>
                        : <i className="bi bi-moon fs-4"></i>}
                </button>
            </div>
        </div>
    )
}