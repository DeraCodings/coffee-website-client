import { playfairDisplay } from "@/utils/font-config";
import CartContainer from "./components/CartContainer";

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <h1
        className={`${playfairDisplay.className} mb-12 text-center text-4xl text-[#443227]`}
      >
        Your Cart
      </h1>

      <CartContainer />
    </main>
  );
}
