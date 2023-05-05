export type Feed = {
    source: {
        id: string,
        name: string
    },
    author: string | null
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

export type FeedList = {
    status: 'ok' | 'error'
    totalResults: number
    articles: Array<Feed>
}