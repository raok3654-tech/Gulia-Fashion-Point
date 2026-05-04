import { useParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Category } from '../types';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const products = MOCK_PRODUCTS.filter(p => p.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-5xl font-bold tracking-tight mb-2 uppercase">{category}</h1>
          <p className="text-neutral-500">{products.length} Items found in this category</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="h-12 px-6 border border-neutral-200 rounded-lg flex items-center gap-3 text-sm font-bold hover:bg-neutral-50 transition-colors">
            <SlidersHorizontal size={18} />
            FILTERS
          </button>
          <div className="relative group">
            <button className="h-12 px-6 border border-neutral-200 rounded-lg flex items-center gap-3 text-sm font-bold hover:bg-neutral-50 transition-colors uppercase tracking-widest">
              SORT BY: FEATURED
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4">
          <p className="text-2xl font-light text-neutral-400">No products found in this category yet.</p>
          <button className="px-8 py-3 bg-black text-white font-bold uppercase tracking-widest">
            Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
