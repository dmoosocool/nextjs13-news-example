import type { Feed, FeedList } from "./feed.d";
import Link from "next/link";
import Image from "@/components/client/image";
import { createShimmer, toBase64 } from "@/utils";
import moment from "moment";
import { notFound } from "next/navigation";
interface IFeedProps {
  keyword: string;
  page: number;
  pageSize: number;
}

const fetchData = async (keyword: string, page: number, pageSize: number) => {
  const url = `https://newsapi.org/v2/everything?apiKey=${process.env.NEXT_APP_NEWS_API_KEY}&q=${keyword}&page=${page}&pageSize=${pageSize}&sortBy=publishedAt`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return await new Promise<FeedList>((resolve, reject) =>
    setTimeout(() => {
      response.ok ? resolve(data) : reject(data);
    }, 2000)
  );
};

export default async function Feed({
  keyword,
  page = 1,
  pageSize = 100,
}: IFeedProps) {
  const data = await fetchData(keyword, page, pageSize);
  if (!data) {
    notFound();
  }
  const { totalResults, articles } = data;
  if (totalResults === 0) {
    notFound();
  }

  return (
    <div>
      <h1>your search: {keyword}</h1>

      <div className="flex flex-col items-center justify-center gap-y-2 antialiased my-10">
        {articles.map((article, n) => (
          <Link
            key={`news-id-${n}`}
            className="group flex flex-col gap-y-3 w-full max-w-2xl bg-white px-4 py-2 rounded-lg"
            href={article.url}
          >
            <div className="flex flex-row items-center justify-start">
              <span className="text-xs">
                {moment(article.publishedAt).format("MMM DD, YYYY")}
              </span>
            </div>

            <div className="flex flex-row gap-x-3">
              {article.urlToImage && (
                <div className="relative w-20 h-20 flex-none rounded overflow-hidden">
                  <Image
                    src={article.urlToImage}
                    fill
                    alt={article.title}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      createShimmer(80, 80)
                    )}`}
                    className="bg-black/40"
                    unoptimized
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div className="flex flex-col items-start justify-start gap-y-3">
                <h2 className="line-clamp-1 font-semibold text-xl group-hover:underline">
                  {article.title}
                </h2>
                <p className="line-clamp-2 text-black/60 text-sm">
                  {article.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
