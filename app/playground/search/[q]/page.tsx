import FeedList, { TFeedList } from './FeedList';
export default function Search({ params }: { params: { q: string } }) {
  async function query(q: string, page = 1, pageSize = 100) {
    'use server';
    const url = `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_APP_NEWS_API_KEY}&q=${q}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt`;
    console.log(`request for url: ${url}`);
    const feedListResp = await fetch(url);
    const feedList = (await feedListResp.json()) as TFeedList;

    if (feedList.totalResults > 0) {
      return feedList.articles;
    }

    return [];
  }

  return (
    <div className="space-y-4">
      <div className="text-xl font-medium text-zinc-500">
        search for {decodeURIComponent(params.q)}
        <FeedList search={query} q={decodeURIComponent(params.q)} />
      </div>
    </div>
  );
}
