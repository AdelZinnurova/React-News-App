import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";

export const Header = () => {
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

    const toggleTheme = () => setTheme(t => (t === "light" ? "dark" : "light"));

    return (
        <div className='d-flex justify-content-between align-items-center mb-5'>
            <div>
                <a className="h5 text-decoration-none" href="/">
                    NewsHub
                </a>
            </div>
            <form className='input-group w-50 rounded-5'>
                  <span className="input-group-text" id="search-icon">
                      <i className="bi bi-search"></i>
                  </span>
                <input
                    type="text"
                    placeholder="Search for news..."
                    className="form-control"
                />
            </form>
            <button onClick={toggleTheme}>
                {theme === "light" ? <i className="bi bi-sun fs-4"></i>  : <i className="bi bi-moon fs-4"></i>}
            </button>
        </div>
    )
}