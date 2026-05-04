import { Search, ShoppingCart, User, Globe, Menu, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useCurrency } from '../hooks/useCurrency';
import { COUNTRIES } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const { selectedCountry, setCountry } = useCurrency();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, navigate to search results
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav id="main-nav" className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-bento-border shadow-sm">
      {/* Top Banner */}
      <div className="bg-bento-text text-white py-2 px-4 text-center text-[10px] tracking-[0.2em] uppercase font-bold">
        Free International Shipping on Orders Over ₹5000 | Style That Defines You
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex flex-col shrink-0">
          <span className="text-xl font-bold tracking-tighter uppercase leading-none">Gulia</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Fashion Point</span>
        </Link>

        {/* Search Bar - Bento style */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-grow items-center bg-bento-muted rounded-full px-4 py-2 border border-transparent focus-within:border-bento-secondary transition-all max-w-2xl">
          <Search size={18} className="opacity-40" />
          <input
            type="text"
            placeholder="Search clothing, footwear, accessories..."
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 placeholder:text-gray-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Country Selector */}
          <div className="hidden lg:flex items-center gap-2 bg-bento-muted px-3 py-1.5 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors group relative">
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="uppercase text-xs font-bold tracking-wider">{selectedCountry.currency}</span>
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-bento-border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCountry(c.code)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm hover:bg-bento-muted flex items-center justify-between transition-colors",
                    selectedCountry.code === c.code && "bg-bento-muted font-bold"
                  )}
                >
                  <span>{c.flag} {c.name}</span>
                  <span className="text-xs opacity-50">{c.currency}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Account */}
          <Link to="/profile" className="flex items-center gap-3">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-[10px] uppercase opacity-50 font-bold tracking-widest leading-none">Welcome</span>
              <span className="text-sm font-bold">{user ? user.displayName?.split(' ')[0] : 'Sign In'}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-bento-muted flex items-center justify-center hover:bg-neutral-200 transition-colors">
              <User size={20} />
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:bg-bento-muted rounded-full transition-colors">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-bento-secondary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Category Menu */}
      <div className="bg-white border-b border-bento-border px-6 py-2 flex items-center gap-8 hidden md:flex">
        <Link to="/category/Men" className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Men</Link>
        <Link to="/category/Women" className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Women</Link>
        <Link to="/category/Kids" className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Kids</Link>
        <Link to="/category/Footwear" className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Footwear</Link>
        <Link to="/category/Accessories" className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity">Accessories</Link>
        <Link to="/deals" className="text-[10px] uppercase font-bold tracking-[0.2em] text-red-600 hover:opacity-100 transition-opacity">Sale</Link>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          <span className="text-[10px] uppercase font-bold tracking-widest opacity-40">Ships Global | {selectedCountry.name}</span>
        </div>
      </div>

      {/* Mobile Menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-neutral-100 p-4"
          >
            <div className="flex flex-col gap-4">
              <Link to="/category/Men" onClick={() => setIsMenuOpen(false)}>MEN</Link>
              <Link to="/category/Women" onClick={() => setIsMenuOpen(false)}>WOMEN</Link>
              <Link to="/category/Kids" onClick={() => setIsMenuOpen(false)}>KIDS</Link>
              <Link to="/category/Footwear" onClick={() => setIsMenuOpen(false)}>FOOTWEAR</Link>
              <Link to="/category/Accessories" onClick={() => setIsMenuOpen(false)}>ACCESSORIES</Link>
              <div className="h-px bg-neutral-100 my-2" />
              <div className="grid grid-cols-2 gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCountry(c.code); setIsMenuOpen(false); }}
                    className={cn(
                      "flex items-center gap-2 p-2 border rounded-lg text-sm",
                      selectedCountry.code === c.code ? "bg-neutral-900 text-white" : "border-neutral-200"
                    )}
                  >
                    {c.flag} {c.currency}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
