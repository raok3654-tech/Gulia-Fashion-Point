import React, { useState } from 'react';
import { Settings, Plus, Package, Users, ShoppingBag, BarChart3, Search, LayoutDashboard } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { Category } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { useCurrency } from '../hooks/useCurrency';

export default function Admin() {
  const { selectedCountry, rates } = useCurrency();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-12 flex gap-12">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 px-4">Admin Dashboard</p>
          <nav className="space-y-1">
            <NavBtn icon={<LayoutDashboard size={20} />} active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>Dashboard</NavBtn>
            <NavBtn icon={<Package size={20} />} active={activeTab === 'products'} onClick={() => setActiveTab('products')}>Products</NavBtn>
            <NavBtn icon={<ShoppingBag size={20} />} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Orders</NavBtn>
            <NavBtn icon={<Users size={20} />} active={false}>Customers</NavBtn>
            <NavBtn icon={<BarChart3 size={20} />} active={false}>Analytics</NavBtn>
            <NavBtn icon={<Settings size={20} />} active={false}>Settings</NavBtn>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-10">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight uppercase">{activeTab}</h1>
          <button className="h-12 px-8 bg-black text-white font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-neutral-800 transition-colors">
            <Plus size={20} />
            Add New {activeTab === 'products' ? 'Product' : 'Service'}
          </button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard title="Total Revenue" value={formatPrice(245000, selectedCountry.currency, rates)} change="+12.5%" />
            <StatCard title="Total Orders" value="1,240" change="+8.2%" />
            <StatCard title="New Customers" value="482" change="+15.3%" />
            <StatCard title="Avg Order Value" value={formatPrice(4500, selectedCountry.currency, rates)} change="-2.1%" />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
              <div className="relative max-w-sm w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input type="text" placeholder="Search products..." className="w-full h-11 pl-12 pr-4 bg-white border border-neutral-200 outline-none" />
              </div>
              <div className="flex gap-4">
                <select className="h-11 px-4 bg-white border border-neutral-200 text-sm font-medium">
                  <option>All Categories</option>
                  {Object.values(Category).map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price (Base)</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {MOCK_PRODUCTS.map(p => (
                  <tr key={p.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4 font-bold uppercase">
                      <img src={p.images[0]} className="w-12 h-16 object-cover" />
                      {p.name}
                    </td>
                    <td className="px-6 py-4 text-neutral-500">{p.category}</td>
                    <td className="px-6 py-4 font-medium">{formatPrice(p.price, 'INR', { INR: 1 })}</td>
                    <td className="px-6 py-4">
                      <span className={cn("px-3 py-1 font-bold text-[10px] rounded-full", p.stock < 20 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600")}>
                        {p.stock} IN STOCK
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-neutral-100 text-[10px] font-bold rounded-full">ACTIVE</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-neutral-400 hover:text-black font-bold uppercase text-[10px]">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

function NavBtn({ children, icon, active, onClick }: { children: React.ReactNode, icon: React.ReactNode, active: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all",
        active ? "bg-black text-white" : "text-neutral-500 hover:bg-neutral-100"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <div className="bg-white border border-neutral-200 p-8 space-y-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{title}</p>
      <div className="flex items-baseline justify-between">
        <h4 className="text-3xl font-bold tracking-tight">{value}</h4>
        <span className={cn("text-xs font-bold", change.startsWith('+') ? "text-green-600" : "text-red-600")}>{change}</span>
      </div>
    </div>
  );
}
