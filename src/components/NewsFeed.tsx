import {useEffect, useState} from "react";
import {ArticleCard} from "./ArticleCard.tsx";

export type Source = {
    id?: string;
    name: string;
    url?: string;
    country?: string;
};

export type Article = {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image?: string;
    publishedAt: string;
    lang: string;
    source: Source;
    category?: string;
}

export type Category =
    | 'general'
    | 'world'
    | 'nation'
    | 'business'
    | 'technology'
    | 'entertainment'
    | 'sports'
    | 'science'
    | 'health';

const API_KEY = 'f49e4a9d91f4660bfad17bc73c61bf49';
const BASE_URL = 'https://gnews.io/api/v4';

export const NewsFeed = () => {
    const [articles, setArticles] = useState<Article[]| null>(null);
    const [category, setCategory] = useState<Category>('general');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const fetchNewsData = async (categoryName: Category) => {
        setCategory(categoryName);
        try {
            setLoading(true);
            setError(null)
            const response = await fetch(`${BASE_URL}/top-headlines?category=${categoryName}&lang=en&country=us&max=10&apikey=${API_KEY}`);
            const data = await response.json();
            setArticles(data.articles)
        } catch {
            setError("Couldnt fetch data,please try again")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNewsData(category)
    }, [category]);

    if (loading) return <div className="wrapper">Loading...</div>

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <ul>
                {(["general","technology","business","entertainment","sports","science","health"] as Category[])
                    .map(cat => (
                        <li key={cat} className={cat===category ? "is-active" : ""}>
                            <a onClick={() => setCategory(cat)}>{cat}</a>
                        </li>
                    ))}
            </ul>
            <div>
                {articles && articles.map((a) => (
                    <div key={a.id || a.url}>
                        <ArticleCard article={a}/>
                    </div>
                ))}
            </div>
        </div>
    )
}