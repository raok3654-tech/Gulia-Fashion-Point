import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-white border-t border-bento-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex flex-col shrink-0">
            <span className="text-xl font-bold tracking-tighter uppercase leading-none">Gulia</span>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Fashion Point</span>
          </Link>
          <p className="text-neutral-500 text-sm leading-relaxed font-medium">
            Leading the path in modern fashion and lifestyle. Delivering globally, styling locally. Your destination for premium apparel and accessories.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-bento-muted flex items-center justify-center hover:bg-bento-text hover:text-white transition-all">
              <Facebook size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-bento-muted flex items-center justify-center hover:bg-bento-text hover:text-white transition-all">
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-bento-muted flex items-center justify-center hover:bg-bento-text hover:text-white transition-all">
              <Twitter size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 opacity-40">Shop categories</h4>
          <ul className="space-y-4 text-sm font-bold text-bento-text">
            <li><Link to="/category/Men" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Men's Fashion</Link></li>
            <li><Link to="/category/Women" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Women's Fashion</Link></li>
            <li><Link to="/category/Kids" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Kid's Corner</Link></li>
            <li><Link to="/category/Footwear" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Footwear</Link></li>
            <li><Link to="/category/Accessories" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Accessories</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 opacity-40">Customer Support</h4>
          <ul className="space-y-4 text-sm font-bold text-bento-text">
            <li><Link to="/track" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Track Your Order</Link></li>
            <li><Link to="/shipping" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Shipping Information</Link></li>
            <li><Link to="/returns" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Returns & Exchanges</Link></li>
            <li><Link to="/faq" className="hover:opacity-50 transition-opacity uppercase tracking-tight">Help & FAQ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] mb-8 opacity-40">Get in touch</h4>
          <ul className="space-y-6 text-sm font-bold text-bento-text">
            <li className="flex gap-4">
              <MapPin size={18} className="flex-shrink-0 opacity-40" />
              <span className="leading-tight">Plot no 7, opposite Ashirwad vatika, Chetan Vihar, Block Z, Gopal Nagar Extension, Najafgarh, New Delhi, Delhi, 110043</span>
            </li>
            <li className="flex gap-4">
              <Phone size={18} className="flex-shrink-0 opacity-40" />
              <span>+91 9999 000 111</span>
            </li>
            <li className="flex gap-4">
              <Mail size={18} className="flex-shrink-0 opacity-40" />
              <span>support@guliafashion.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-bento-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] opacity-40">
        <p>© 2026 Gulia Fashion Point. Global Shipping.</p>
        <div className="flex gap-8">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
        <div className="flex gap-4 items-center grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50" referrerPolicy="no-referrer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 opacity-50" referrerPolicy="no-referrer" />
        </div>
      </div>
    </footer>
  );
}
