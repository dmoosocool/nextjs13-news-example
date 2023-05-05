export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 antialiased my-10">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={`news-id-${n}`}
          className="flex flex-col gap-y-3 w-[672px] max-w-2xl bg-white px-4 py-2 rounded-lg animate-pulse"
        >
          <div className="h-4 bg-gray-300 rounded w-[120px]"></div>
          <div className="flex flex-row gap-x-3">
            <div className="relative w-20 h-20 flex-none rounded overflow-hidden bg-gray-300"></div>
            <div className="flex flex-col items-start justify-start w-full gap-y-3">
              <div className="h-7 bg-gray-300 rounded w-full"></div>
              <div className="flex flex-col gap-y-1 w-full">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
