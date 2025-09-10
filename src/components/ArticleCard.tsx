import type {Article} from "../types";
import 'bootstrap/dist/css/bootstrap.min.css';

type ArticleCardProps = {
    article: Article
}

export const ArticleCard = ({article}: ArticleCardProps) => {
    return (
        <article className="card h-100">
            <img className="card-img-top mb-3" src={article.image} alt="image"/>
            <div className="card-body">
                <div className='d-flex justify-content-between'>
                    <p className="card-text text-primary-emphasis">{article.source.name}</p>
                    <p className='text-secondary-emphasis'>{new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
                <div>
                    <p className="h5 card-title">{article.title}</p>
                    <p className="card-text">{article.description}</p>
                    <div className='d-flex justify-content-between'>
                        <a className="card-link text-decoration-none" href={article.url}>Reed more</a>
                        <div className='d-flex gap-3 mb-3'>
                            <button><i className="bi bi-bookmark"></i></button>
                            <button><i className="bi bi-share"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}