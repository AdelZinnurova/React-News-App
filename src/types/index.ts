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