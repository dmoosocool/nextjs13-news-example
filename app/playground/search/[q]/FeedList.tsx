'use client';
import Image from '@/ui/Image';
import { toBase64, createShimmer } from '@/utils/index';
import moment from 'moment';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Loading from './loading';
import NotFound from './not-found';

export type TFeed = {
  source: {
    id: string;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type TFeedList = {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Array<TFeed>;
};

export interface IFeedListProps {
  search: (q: string) => Promise<TFeed[]>;
  q: string;
}
export default function FeedList({ search, q }: IFeedListProps) {
  const [feedList, setFeedList] = useState<TFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [notfound, setNotFound] = useState(false);
  useEffect(() => {
    search(q).then((list) => {
      if (list.length) {
        setFeedList(list);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [q]);
  return (
    <>
      {notfound && <NotFound />}
      {!notfound && loading && <Loading />}
      {!notfound && !loading && (
        <div className="my-10 flex flex-col items-center justify-center gap-y-2 antialiased">
          {feedList.map((feed, n) => (
            <Link
              key={`news-id-${n}`}
              className="group flex w-full max-w-2xl flex-col gap-y-3 rounded-lg bg-white px-4 py-2"
              href={feed.url}
            >
              <div className="flex flex-row items-center justify-start">
                <span className="text-xs">
                  {moment(feed.publishedAt).format('MMM DD, YYYY')}
                </span>
              </div>

              <div className="flex flex-row gap-x-3">
                {feed.urlToImage && (
                  <div className="relative h-20 w-20 flex-none overflow-hidden rounded">
                    <Image
                      src={feed.urlToImage}
                      fill
                      alt={feed.title}
                      placeholder="blur"
                      sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        createShimmer(80, 80),
                      )}`}
                      className="bg-black/40"
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="flex flex-col items-start justify-start gap-y-3">
                  <h2 className="line-clamp-1 text-xl font-semibold group-hover:underline">
                    {feed.title}
                  </h2>
                  <p className="line-clamp-2 text-sm text-black/60">
                    {feed.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
