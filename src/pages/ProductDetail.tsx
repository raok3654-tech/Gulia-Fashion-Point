import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { useState } from 'react';
import { useCurrency } from '../hooks/useCurrency';
import { useCart } from '../hooks/useCart';
import { formatPrice, cn } from '../lib/utils';
import { Star, Truck, ShieldCheck, RotateCcw, Heart, Share2, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const { selectedCountry, rates } = useCurrency();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return (
    <div className="max-w-7xl mx-auto px-4 py-40 text-center">
      <h2 className="text-3xl font-bold mb-4">Product Not Found</h2>
      <button onClick={() => navigate('/')} className="bg-black text-white px-8 py-3 uppercase font-bold tracking-widest">
        Go Shopping
      </button>
    </div>
  );

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) return alert('Please select a size');
    if (product.colors.length > 0 && !selectedColor) return alert('Please select a color');
    
    addToCart(product.id, quantity, selectedSize, selectedColor);
    // Simple success feedback could be added here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Images Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 flex-col gap-4">
          <div className="aspect-[4/5] bg-neutral-100 relative overflow-hidden">
            <img 
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={cn(
                  "aspect-[4/5] bg-neutral-100 overflow-hidden border-2",
                  activeImage === idx ? "border-black" : "border-transparent"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                {product.category} / {product.subCategory}
              </span>
              <div className="flex gap-4">
                <button className="text-neutral-400 hover:text-black transition-colors"><Heart size={20} /></button>
                <button className="text-neutral-400 hover:text-black transition-colors"><Share2 size={20} /></button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-none uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={cn(i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-neutral-200")} 
                  />
                ))}
                <span className="text-sm font-bold ml-2">{product.rating}</span>
              </div>
              <span className="text-sm text-neutral-500 font-medium">{product.reviewsCount} REVIEWS</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold">
                {formatPrice(discountedPrice, selectedCountry.currency, rates)}
              </span>
              {product.discount && (
                <span className="text-xl text-neutral-400 line-through">
                  {formatPrice(product.price, selectedCountry.currency, rates)}
                </span>
              )}
            </div>
            <p className="text-xs text-green-600 font-bold uppercase tracking-widest">
              Inclusive of all international taxes & customs
            </p>
          </div>

          <div className="space-y-8 py-8 border-y border-neutral-100">
            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold uppercase tracking-widest">Color: <span className="text-neutral-500 font-normal">{selectedColor || 'Select'}</span></p>
                </div>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-10 px-6 border-2 text-xs font-bold transition-all uppercase tracking-widest",
                        selectedColor === color ? "border-black bg-black text-white" : "border-neutral-200 hover:border-neutral-400"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-bold uppercase tracking-widest">Size: <span className="text-neutral-500 font-normal">{selectedSize || 'Select'}</span></p>
                  <button className="text-xs font-bold border-b border-neutral-300 pb-0.5">SIZE GUIDE</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 border-2 flex items-center justify-center text-xs font-bold transition-all",
                        selectedSize === size ? "border-black bg-black text-white" : "border-neutral-200 hover:border-neutral-400"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Buy */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-3 flex items-center justify-between border-2 border-neutral-200 h-14 px-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-neutral-400 hover:text-black"><Minus size={18} /></button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-neutral-400 hover:text-black"><Plus size={18} /></button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="sm:col-span-9 h-14 bg-black text-white font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
              >
                Add to Cart
              </button>
            </div>
            <button className="w-full h-14 border-2 border-black font-bold uppercase tracking-[0.2em] hover:bg-neutral-50 transition-colors">
              Buy Now
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 pt-4">
            <div className="flex gap-4 items-start">
              <Truck size={24} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Fast Delivery</p>
                <p className="text-xs text-neutral-500">Free international express shipping on orders over ₹5000.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <RotateCcw size={24} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Easy Returns</p>
                <p className="text-xs text-neutral-500">Enjoy 30-day free returns and worldwide pickups.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <ShieldCheck size={24} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-bold uppercase tracking-widest mb-1">Secure Checkout</p>
                <p className="text-xs text-neutral-500">Localized payments via Stripe, Razorpay, and PayPal.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-4">
            <details className="border-t border-neutral-100 group">
              <summary className="py-4 font-bold uppercase text-sm tracking-widest flex justify-between items-center cursor-pointer list-none">
                Description
                <Plus size={16} className="group-open:rotate-45 transition-transform" />
              </summary>
              <div className="pb-6 text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </div>
            </details>
            <details className="border-t border-neutral-100 group">
              <summary className="py-4 font-bold uppercase text-sm tracking-widest flex justify-between items-center cursor-pointer list-none">
                Composition & Care
                <Plus size={16} className="group-open:rotate-45 transition-transform" />
              </summary>
              <div className="pb-6 text-sm text-neutral-600 leading-relaxed">
                <ul className="list-disc pl-4 space-y-2">
                  <li>80% Organic Cotton, 20% Recycled Polyester</li>
                  <li>Machine wash at 30°C</li>
                  <li>Do not tumble dry</li>
                  <li>Iron on reverse</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
