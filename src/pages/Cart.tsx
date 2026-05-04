import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice } from '../lib/utils';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, totalItems } = useCart();
  const { selectedCountry, rates } = useCurrency();

  const cartItems = items.map(item => ({
    ...item,
    product: MOCK_PRODUCTS.find(p => p.id === item.productId)!
  })).filter(i => i.product);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * (1 - (item.product.discount || 0) / 100) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 500;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-40 text-center space-y-8">
        <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag size={40} className="text-neutral-400" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight uppercase">Your cart is empty</h1>
          <p className="text-neutral-500 max-w-sm mx-auto">Discover our latest collection and start defining your unique style with Gulia FP.</p>
        </div>
        <Link to="/" className="inline-block px-12 py-4 bg-black text-white font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold tracking-tight mb-12 uppercase flex items-center gap-4">
        Shopping Cart
        <span className="text-lg font-medium text-neutral-400 bg-neutral-100 px-4 py-1 rounded-full">{totalItems}</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-10">
          {cartItems.map((item, idx) => (
            <div key={`${item.productId}-${idx}`} className="flex gap-8 pb-10 border-b border-neutral-100">
              <div className="w-32 aspect-[3/4] bg-neutral-100 flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg leading-tight uppercase line-clamp-1">{item.product.name}</h3>
                    <p className="text-sm text-neutral-400 font-medium uppercase tracking-widest mt-1">
                      {item.product.category} / {item.size} / {item.color}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">Qty: {item.quantity}</p>
                  <p className="font-bold text-lg">
                    {formatPrice(item.product.price * (1 - (item.product.discount || 0) / 100) * item.quantity, selectedCountry.currency, rates)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border border-neutral-200 p-10 space-y-8 sticky top-36">
            <h2 className="text-lg font-bold uppercase tracking-widest">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, selectedCountry.currency, rates)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>International Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping, selectedCountry.currency, rates)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Estimated Tax</span>
                <span>Included</span>
              </div>
              <div className="h-px bg-neutral-200 my-6" />
              <div className="flex justify-between text-xl font-bold uppercase tracking-widest">
                <span>Grand Total</span>
                <span>{formatPrice(subtotal + shipping, selectedCountry.currency, rates)}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full h-14 bg-black text-white flex items-center justify-center font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors gap-2"
            >
              Secure Checkout
              <ArrowRight size={18} />
            </Link>

            <div className="pt-4 text-[10px] text-neutral-400 text-center leading-relaxed">
              By proceeding to checkout you agree to the Gulia FP Terms of Service and Privacy Policy. All prices include international duties and taxes.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
