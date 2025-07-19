export default function OrderSummarySkeleton() {
  return (
    <div className="animate-pulse rounded-lg bg-gray-50 p-6">
      <div className="mb-4 h-6 w-1/2 rounded bg-gray-200"></div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/4 rounded bg-gray-200"></div>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <div className="h-5 w-1/4 rounded bg-gray-200"></div>
            <div className="h-5 w-1/4 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="pt-4">
          <div className="h-10 w-full rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
