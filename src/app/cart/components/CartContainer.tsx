import { Suspense } from "react"
import CartItemList from "./CartItemsList"
import OrderSummary from "./OrderSummary"
import CartSkeleton from "./CartItemsSkeleton"
import OrderSummarySkeleton from "./OrderSummarySkeleton"

export default function CartContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Suspense fallback={<CartSkeleton />}>
          <CartItemList />
        </Suspense>
      </div>
      <div className="lg:col-span-1">
        <Suspense fallback={<OrderSummarySkeleton />}>
          <OrderSummary />
        </Suspense>
      </div>
    </div>
  )
}

