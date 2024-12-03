export function AssetInfoSkeleton() {
  return (
    <div className="relative h-308 w-300 rounded-10 bg-[#D9FFE5] p-21">
      <div>
        <div className="h-7 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-10">
          <div className="h-32 w-102 animate-pulse rounded bg-gray-200" />
          <div className="pt-40">
            <div className="h-30 w-120 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-30 flex h-105 w-264 animate-pulse flex-col items-center justify-center rounded-8 bg-gray-100">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="mt-4 h-8 w-40 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export function MyStockInfoSkeleton() {
  return (
    <div className="relative h-308 w-300 rounded-10 bg-[#F5F5F5] p-21">
      <div className="mb-10">
        <div className="h-7 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-12 space-y-2">
          <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="mt-90">
        <div className="mb-10 h-6 w-32 animate-pulse rounded bg-gray-200" />
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-gray-100 py-12 last:border-0"
            >
              <div className="flex items-center gap-8">
                <div className="size-24 animate-pulse rounded bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
              <div className="space-y-2 text-right">
                <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
