import { Card } from "@/components/ui/card";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-[#443227] px-4 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-white/20"></div>
          <div className="mx-auto mb-4 h-12 w-96 animate-pulse rounded-lg bg-white/20"></div>
          <div className="mx-auto h-6 w-80 animate-pulse rounded-lg bg-white/10"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Two Column Layout Skeleton */}
          <div className="mb-16 grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200"></div>
              <div className="space-y-4">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="h-[400px] animate-pulse rounded-xl bg-gray-200"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <section className="mb-16">
            <div className="mb-8 text-center">
              <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="mx-auto mb-4 h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
                  <div className="mx-auto mb-2 h-6 w-32 animate-pulse rounded bg-gray-200"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                    <div className="mx-auto h-4 w-4/5 animate-pulse rounded bg-gray-200"></div>
                    <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* List Items Skeleton */}
          <section className="mb-16">
            <div className="mb-8 text-center">
              <div className="mx-auto h-8 w-56 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center rounded-lg bg-gray-50 p-4"
                >
                  <div className="mr-3 h-6 w-6 animate-pulse rounded bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="mb-1 h-5 w-32 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-24 animate-pulse rounded bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final Section Skeleton */}
          <section>
            <div className="mb-8 text-center">
              <div className="mx-auto h-8 w-64 animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <div className="h-6 w-40 animate-pulse rounded bg-gray-200"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-3 h-2 w-2 animate-pulse rounded-full bg-gray-200"></div>
                      <div className="h-4 w-48 animate-pulse rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-[250px] animate-pulse rounded-xl bg-gray-200"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
