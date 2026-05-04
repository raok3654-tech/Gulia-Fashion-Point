import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';
import { MOCK_PRODUCTS } from '../constants';
import { formatPrice } from '../lib/utils';
import { ShieldCheck, CreditCard, Landmark, Globe } from 'lucide-react';
import { useState } from 'react';

export default function Checkout() {
  const { items, totalItems } = useCart();
  const { selectedCountry, rates } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal'>('card');

  const subtotal = items.reduce((sum, item) => {
    const p = MOCK_PRODUCTS.find(prod => prod.id === item.productId);
    return sum + (p ? p.price * (1 - (p.discount || 0) / 100) * item.quantity : 0);
  }, 0);
  const shipping = subtotal > 5000 ? 0 : 500;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-12 uppercase">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          {/* Shipping Info */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest pb-4 border-b border-neutral-200">1. Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black" />
              <input type="text" placeholder="Last Name" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black" />
              <input type="email" placeholder="Email Address" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black md:col-span-2" />
              <input type="text" placeholder="Street Address" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black md:col-span-2" />
              <input type="text" placeholder="City" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black" />
              <input type="text" placeholder="State / Province" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black" />
              <input type="text" placeholder="Postal Code" className="h-12 px-4 border border-neutral-200 outline-none focus:border-black" />
              <div className="h-12 px-4 border border-neutral-200 flex items-center gap-2 bg-neutral-50">
                <Globe size={18} className="text-neutral-400" />
                <span className="text-sm font-medium">{selectedCountry.name}</span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold uppercase tracking-widest pb-4 border-b border-neutral-200">2. Payment Method</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => setPaymentMethod('card')}
                className={`p-6 border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <CreditCard />
                <span className="text-sm font-bold uppercase tracking-widest">Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('upi')}
                className={`p-6 border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'upi' ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <Landmark />
                <span className="text-sm font-bold uppercase tracking-widest">{selectedCountry.code === 'IN' ? 'UPI / Paytm' : 'Bank Transfer'}</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`p-6 border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'paypal' ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-neutral-400'}`}
              >
                <CreditCard />
                <span className="text-sm font-bold uppercase tracking-widest">PayPal</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="bg-neutral-50 p-8 space-y-4">
                <input type="text" placeholder="Card Number" className="h-12 w-full px-4 border border-neutral-200 outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM / YY" className="h-12 px-4 border border-neutral-200 outline-none" />
                  <input type="text" placeholder="CVV" className="h-12 px-4 border border-neutral-200 outline-none" />
                </div>
              </div>
            )}
          </section>

          <button className="w-full h-16 bg-neutral-900 text-white font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-black transition-colors rounded-none">
            <ShieldCheck size={24} />
            Complete Order
          </button>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border border-neutral-200 p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
              <h2 className="font-bold uppercase tracking-widest">Summary</h2>
              <span className="text-sm text-neutral-400 font-medium">{totalItems} Items</span>
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-4 scrollbar-hide">
              {items.map((item, idx) => {
                const p = MOCK_PRODUCTS.find(prod => prod.id === item.productId);
                if (!p) return null;
                return (
                  <div key={idx} className="flex gap-4">
                    <img src={p.images[0]} className="w-16 h-20 object-cover" />
                    <div className="flex-1 text-xs">
                      <p className="font-bold uppercase line-clamp-1">{p.name}</p>
                      <p className="text-neutral-400 mt-1">{item.quantity} x {formatPrice(p.price * (1 - (p.discount || 0) / 100), selectedCountry.currency, rates)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 pt-6 border-t border-neutral-100 text-sm">
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, selectedCountry.currency, rates)}</span>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : formatPrice(shipping, selectedCountry.currency, rates)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4">
                <span>Total</span>
                <span>{formatPrice(subtotal + shipping, selectedCountry.currency, rates)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
