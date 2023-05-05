import { Suspense } from "react";
import Feed from "@/components/server/feed";
export default function ResultPage({
  searchParams,
}: {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { q } = searchParams;
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <Feed keyword={String(q)} page={1} pageSize={100} />
    </div>
  );
}
