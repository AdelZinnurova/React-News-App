import type {Article} from "../types";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useShareModal} from "../hooks/useShareModal.ts";
import {ShareModal} from "./ShareModal.tsx";

type ArticleCardProps = {
    article: Article
    isFavorite: boolean;
    onToggleFavorite: (article: Article) => void;
}

export const ArticleCard = ({article, onToggleFavorite, isFavorite}: ArticleCardProps) => {
    const {isShareModalOpen, shareData, openShareModal, closeShareModal} = useShareModal();

    const handleShareClick = () => {
        openShareModal(article.url, article.title);
    };

    return (
        <>
            <article className="card h-100">
                <img className="card-img-top" src={article.image} alt={article.title} style={{
                    height: '200px',
                    width: '100%',
                    objectFit: 'cover'
                }}
                />
                <div className="card-body">
                    <div className='d-flex justify-content-between'>
                        <p className="card-text text-primary-emphasis">{article.source.name}</p>
                        <p className='card-text text-secondary-emphasis'>{new Date(article.publishedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="h5 card-title">{article.title}</p>
                        <p className="card-text">{article.description}</p>
                        <div className='d-flex justify-content-between'>
                            <a className="card-link text-decoration-none" href={article.url}>Reed more</a>
                            <div className='d-flex gap-3'>
                                <button onClick={() => onToggleFavorite(article)}>
                                    <i className={isFavorite ? "bi bi-bookmark-check-fill" : "bi bi-bookmark"}></i>
                                </button>
                                <button onClick={handleShareClick}
                                        title="Share article"><i className="bi bi-share"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={closeShareModal}
                shareUrl={shareData.url}
                title={shareData.title}
            />
        </>
    )
}