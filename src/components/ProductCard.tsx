import { Link } from 'react-router-dom';
import { Star, Heart, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCurrency } from '../hooks/useCurrency';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';

import React from 'react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { selectedCountry, rates } = useCurrency();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative bg-white rounded-3xl p-4 border border-bento-border transition-all hover:shadow-xl"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden bg-bento-muted relative pt-[125%] rounded-2xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.discount && (
          <div className="absolute top-4 left-4 bg-bento-text text-white text-[10px] font-bold px-2 py-1 rounded">
            -{product.discount}%
          </div>
        )}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/60 backdrop-blur shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-bento-text">
          <Heart size={18} strokeWidth={1.5} />
        </button>
      </Link>

      <div className="mt-6 space-y-2 px-2">
        <div className="flex justify-between items-start gap-4">
          <Link to={`/product/${product.id}`} className="block group-hover:opacity-60 transition-opacity">
            <h3 className="text-lg font-bold text-bento-text line-clamp-1 uppercase tracking-tight">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-bold">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.category}</p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-bento-text">
              {formatPrice(product.price * (1 - (product.discount || 0) / 100), selectedCountry.currency, rates)}
            </span>
            {product.discount && (
              <span className="text-xs text-neutral-400 line-through font-medium">
                {formatPrice(product.price, selectedCountry.currency, rates)}
              </span>
            )}
          </div>
          <button className="w-10 h-10 rounded-full border border-bento-border flex items-center justify-center hover:bg-bento-text hover:text-white transition-all">
            <Plus size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
