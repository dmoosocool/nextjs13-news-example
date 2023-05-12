export default function Loading() {
  return (
    <div className="my-10 flex flex-col items-center justify-center gap-y-2 antialiased">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={`news-id-${n}`}
          className="flex w-[672px] max-w-2xl animate-pulse flex-col gap-y-3 rounded-lg bg-white px-4 py-2"
        >
          <div className="h-4 w-[120px] rounded bg-gray-300"></div>
          <div className="flex flex-row gap-x-3">
            <div className="relative h-20 w-20 flex-none overflow-hidden rounded bg-gray-300"></div>
            <div className="flex w-full flex-col items-start justify-start gap-y-3">
              <div className="h-7 w-full rounded bg-gray-300"></div>
              <div className="flex w-full flex-col gap-y-1">
                <div className="h-4 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-full rounded bg-gray-300"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
