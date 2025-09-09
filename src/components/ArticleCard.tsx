import {useEffect, useState} from "react";

type Source = {
    id?: string;
    name: string;
    url?: string;
    country?: string;
};

type Article = {
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

export const ArticleCard = () => {
    const [articles, setArticles] = useState<Article| null>(null);
    const [category, setCategory] = useState<Category>('general');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const API_KEY = 'f49e4a9d91f4660bfad17bc73c61bf49';
    const BASE_URL = 'https://gnews.io/api/v4';

    const fetchNewsData = async (categoryName: Category) => {
        setCategory(categoryName);
        try {
            setLoading(true);
            setError(null)
            const response = await fetch(`${BASE_URL}/top-headlines?category=${categoryName}&lang=en&country=us&max=10&apikey=${API_KEY}`);
            const data = await response.json();
            setArticles(data.articles[0])
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

            {articles && (
                <>
                    <article>
                        <img src={articles.image} alt="image"/>
                        <p>{articles.source.name}</p>
                        <p>{new Date(articles.publishedAt).toLocaleString()}</p>
                        <div>
                            <h2>{articles.title}</h2>
                            <p>{articles.description}</p>
                            <div>
                                <a href={articles.url}>Reed more</a>
                                <button>Save</button>
                                <button>Share</button>
                            </div>
                        </div>
                    </article>
                </>
            )}
        </div>
    )
}