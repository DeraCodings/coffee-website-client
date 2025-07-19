export default function CartSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="h-96 rounded-lg bg-gray-200"></div>
      </div>
      <div className="lg:col-span-1">
        <div className="h-64 rounded-lg bg-gray-200"></div>
      </div>
    </div>
  );
}
