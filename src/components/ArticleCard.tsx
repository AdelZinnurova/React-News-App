import type {Article} from "./NewsFeed.tsx";


type ArticleCardProps = {
    article: Article
}

export const ArticleCard = ({article}: ArticleCardProps) => {
    return (
        <article>
            <img src={article.image} alt="image"/>
            <p>{article.source.name}</p>
            <p>{new Date(article.publishedAt).toLocaleString()}</p>
            <div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div>
                    <a href={article.url}>Reed more</a>
                    <button>Save</button>
                    <button>Share</button>
                </div>
            </div>
        </article>
    )
}