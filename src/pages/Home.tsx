import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';
import { formatPrice, cn } from '../lib/utils';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { selectedCountry, rates } = useCurrency();
  const featured = MOCK_PRODUCTS.filter(p => p.isFeatured);

  return (
    <div id="home-page" className="space-y-6 max-w-[1400px] mx-auto px-6">
      {/* Bento Layout Main Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        {/* Main Hero Card */}
        <div className="md:col-span-2 md:row-span-2 bg-[#E8D5C8] rounded-3xl p-8 md:p-12 flex flex-col justify-end relative overflow-hidden group">
          <div className="absolute top-8 right-8 flex flex-col items-end">
            <span className="bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold mb-2 italic tracking-widest uppercase">Autumn '26</span>
            <span className="text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none">50% OFF</span>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1000" 
            alt="Hero Fashion" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6 uppercase">
              Style That<br />Defines You.
            </h1>
            <p className="text-lg opacity-70 mb-8 max-w-sm font-medium">
              Discover the latest trends in global fashion. Premium materials, tailored for the modern spirit.
            </p>
            <Link to="/category/Men" className="bg-bento-text text-white w-fit px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl inline-block">
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Category Cards as Bento Tiles */}
        <BentoCategoryCard 
          title="Casual Essentials" 
          subtitle="Men's Wear"
          price="899"
          bgColor="bg-white border border-bento-border"
          image="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&q=80&w=600"
          link="/category/Men"
        />

        <BentoCategoryCard 
          title="Evening Grace" 
          subtitle="Women's"
          price="2,499"
          bgColor="bg-bento-secondary"
          image="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600"
          link="/category/Women"
        />

        <BentoCategoryCard 
          title="The Final Touch" 
          subtitle="Accessories"
          price="499"
          bgColor="bg-white border border-bento-border"
          image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600"
          link="/category/Accessories"
        />

        <BentoCategoryCard 
          title="Daily Deals" 
          subtitle="Canvas Sneakers"
          price="1,299"
          bgColor="bg-white border border-bento-border"
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600"
          link="/category/Footwear"
          isDeal
        />
      </section>

      {/* Popular Section */}
      <section className="py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-400 mb-2">New Arrivals</h2>
            <p className="text-4xl font-bold tracking-tighter uppercase">Trending Items</p>
          </div>
          <Link to="/deals" className="text-[10px] font-bold uppercase tracking-widest border-b-2 border-bento-text pb-1 hover:opacity-60 transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Bento Style */}
      <section className="bg-bento-muted rounded-[2.5rem] p-12 md:p-20 overflow-hidden relative">
        <div className="max-w-xl relative z-10">
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">Join the FP Insider List</h3>
          <p className="text-neutral-500 text-lg mb-10 font-medium">
            Get 15% off your first international order, early access to new collections, and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md bg-white p-2 rounded-full border border-bento-border focus-within:border-bento-secondary transition-all">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 h-12 px-6 bg-transparent outline-none text-sm font-medium"
            />
            <button className="h-12 px-8 bg-bento-text text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:bg-black transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=800" 
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20 hidden lg:block" 
          style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}
        />
      </section>
    </div>
  );
}

function BentoCategoryCard({ title, subtitle, price, bgColor, image, link, isDeal }: { title: string, subtitle: string, price: string, bgColor: string, image: string, link: string, isDeal?: boolean }) {
  return (
    <Link to={link} className={cn("rounded-3xl p-6 flex flex-col relative overflow-hidden group transition-all duration-500 hover:shadow-2xl", bgColor)}>
      <img src={image} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-700" alt={title} />
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{subtitle}</span>
          <div className="w-10 h-10 bg-white/40 backdrop-blur rounded-full flex items-center justify-center group-hover:bg-bento-text group-hover:text-white transition-all">
            {isDeal ? (
              <span className="text-[10px] font-bold">SALE</span>
            ) : (
              <ArrowRight size={16} />
            )}
          </div>
        </div>
        <h3 className="text-2xl font-bold leading-tight mb-2 uppercase break-words">{title}</h3>
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight">₹{price}</span>
          <span className="text-[10px] opacity-40 uppercase font-bold">Starts At</span>
        </div>
      </div>
    </Link>
  );
}
