import { useEffect, useState } from 'react';
import { ArticleCard } from './ArticleCard.tsx';
import type { Article, Category } from '../types';

type NewsFeedProps = {
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (article: Article) => void;
  searchQuery: string;
};

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Apple представила iPhone 16',
    description: 'Новый iPhone получил улучшенную камеру, процессор A18 и обновленный дизайн.',
    content:
      'Сегодня Apple официально представила iPhone 16. Смартфон получил улучшенную камеру на 48 Мп, новый процессор A18 Bionic и увеличенное время автономной работы. Продажи стартуют 25 сентября.',
    url: 'https://example.com/apple-iphone-16',
    image: 'https://picsum.photos/id/1015/600/400',
    publishedAt: '2025-09-09T10:30:00Z',
    lang: 'en',
    source: {
      id: 'apple-news',
      name: 'Apple Newsroom',
      url: 'https://apple.com/newsroom',
      country: 'us',
    },
    category: 'technology',
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Илон Маск запустил новый стартап в области AI',
    description: 'Компания XAI анонсировала прорывную нейросеть для генерации видео.',
    content:
      'Илон Маск представил новый проект XAI, который работает над созданием нейросети для генерации видео на основе текста. Ожидается, что технология выйдет на рынок в 2026 году.',
    url: 'https://example.com/elon-musk-xai',
    image: 'https://picsum.photos/id/1021/600/400',
    publishedAt: '2025-09-08T14:15:00Z',
    lang: 'en',
    source: {
      id: 'techcrunch',
      name: 'TechCrunch',
      url: 'https://techcrunch.com',
      country: 'us',
    },
    category: 'technology',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Мировые рынки восстанавливаются после падения',
    description: 'Индекс S&P 500 вырос на 2%, а Nasdaq прибавил 3% на фоне позитивных экономических данных.',
    content:
      'После нескольких недель снижения мировые фондовые рынки начали восстанавливаться. Индекс S&P 500 вырос на 2%, а Nasdaq — на 3%, благодаря сильной отчетности крупных компаний.',
    url: 'https://example.com/sp500-nasdaq-growth',
    image: 'https://picsum.photos/id/1033/600/400',
    publishedAt: '2025-09-07T09:00:00Z',
    lang: 'en',
    source: {
      id: 'bloomberg',
      name: 'Bloomberg',
      url: 'https://bloomberg.com',
      country: 'us',
    },
    category: 'business',
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Сборная США победила на чемпионате мира по баскетболу',
    description: 'Команда США одержала победу над Испанией со счетом 98:87 и стала чемпионом мира.',
    content:
      'В финале чемпионата мира по баскетболу сборная США победила команду Испании со счетом 98:87. Лучшим игроком турнира признан Джейсон Тейтум.',
    url: 'https://example.com/usa-basketball-champions',
    image: 'https://picsum.photos/id/1041/600/400',
    publishedAt: '2025-09-06T20:45:00Z',
    lang: 'en',
    source: {
      id: 'espn',
      name: 'ESPN',
      url: 'https://espn.com',
      country: 'us',
    },
    category: 'sports',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'NASA успешно посадила марсоход на Марс',
    description: 'Новый марсоход Perseverance-2 прибыл на Красную планету и начал первые исследования.',
    content:
      'NASA успешно посадила новый марсоход Perseverance-2 на поверхность Марса. В ближайшие недели аппарат начнет исследования в районе кратера Джезеро.',
    url: 'https://example.com/nasa-perseverance2',
    image: 'https://picsum.photos/id/1055/600/400',
    publishedAt: '2025-09-05T11:00:00Z',
    lang: 'en',
    source: {
      id: 'nasa',
      name: 'NASA',
      url: 'https://nasa.gov',
      country: 'us',
    },
    category: 'science',
  },
];

const API_KEY = 'f49e4a9d91f4660bfad17bc73c61bf49';
const BASE_URL = 'https://gnews.io/api/v4';

export const NewsFeed = ({ isFavorite, onToggleFavorite, searchQuery }: NewsFeedProps) => {
  const [articles, setArticles] = useState<Article[] | null>(mockArticles);
  const [category, setCategory] = useState<Category>('general');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNewsData = async (categoryName: Category) => {
    setCategory(categoryName);
    try {
      setLoading(true);
      setError(null);
      let url;
      if (searchQuery) {
        url = `${BASE_URL}/search?q=${searchQuery}&lang=en&country=us&max=10&apikey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/top-headlines?category=${categoryName}&lang=en&country=us&max=10&apikey=${API_KEY}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
    } catch {
      setError('Couldnt fetch data, please try again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData(category);
  }, [category, searchQuery]);

  useEffect(() => {
    setArticles(mockArticles);
  }, []);

  if (loading) return <div className="wrapper">Loading...</div>;

  const filteredArticles = articles?.filter(article => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return article.title.toLowerCase().includes(query) || article.description.toLowerCase().includes(query);
  });

  return (
    <div>
      {error && <p className="error">{error}</p>}

      <div className="mb-5">
        <ul className="nav nav-pills gap-2">
          {(['general', 'technology', 'business', 'entertainment', 'sports', 'science', 'health'] as Category[]).map(
            cat => (
              <li key={cat} className="is-active text-capitalize">
                <a className={`nav-link ${category === cat ? 'active' : ''}`} onClick={() => setCategory(cat)}>
                  {cat}{' '}
                </a>
              </li>
            )
          )}
        </ul>
      </div>

      {searchQuery && (
        <div className="alert alert-info mb-3">
          Search: <strong>"{searchQuery}"</strong>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredArticles?.map(a => (
          <div className="card-group" key={a.id}>
            <ArticleCard article={a} isFavorite={isFavorite(a.id)} onToggleFavorite={onToggleFavorite} />
          </div>
        ))}
      </div>

      {filteredArticles?.length === 0 && (
        <div className="text-center py-5">
          <h5>No articles found</h5>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  );
};
