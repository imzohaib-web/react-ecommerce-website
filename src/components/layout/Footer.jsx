import { Sparkles, ShieldCheck, Truck, RotateCcw, ArrowUp, Globe, Share2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="flagship-footer">
      <button type="button" className="footer-back-top" onClick={scrollToTop}>
        <ArrowUp size={16} /> Back to top
      </button>

      {/* Main Footer Links */}
      <div className="footer-main-grid">
        <div className="footer-container">
          {/* Col 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-logo-icon">
                <Sparkles size={18} />
              </div>
              <span className="brand-title">AURA</span>
            </div>
            <p className="brand-desc">
              The next-generation ecommerce platform crafted for seamless shopping, instant fulfillment, and premium product discovery.
            </p>
            <div className="footer-socials">
              <span className="social-icon" title="Global Store"><Globe size={18} /></span>
              <span className="social-icon" title="Share App"><Share2 size={18} /></span>
              <span className="social-icon" title="Favorites"><Heart size={18} /></span>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="footer-col">
            <h4 className="footer-col-title">Shop Categories</h4>
            <ul className="footer-links">
              <li><Link to="/">Clothing & Apparel</Link></li>
              <li><Link to="/">Home & Kitchen</Link></li>
              <li><Link to="/">Sports & Outdoors</Link></li>
              <li><Link to="/">Shoes & Footwear</Link></li>
              <li><Link to="/">Fashion Accessories</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="footer-col">
            <h4 className="footer-col-title">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/orders">Track Order Status</Link></li>
              <li><Link to="/checkout">Review Shopping Cart</Link></li>
              <li><a href="#returns">30-Day Easy Returns</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#help">Help & FAQs</a></li>
            </ul>
          </div>

          {/* Col 4: Trust Guarantees */}
          <div className="footer-col">
            <h4 className="footer-col-title">Store Guarantees</h4>
            <div className="trust-pills-list">
              <div className="trust-pill">
                <Truck size={16} className="trust-pill-icon" />
                <div>
                  <strong>Free Shipping</strong>
                  <span>On orders over $25</span>
                </div>
              </div>
              <div className="trust-pill">
                <ShieldCheck size={16} className="trust-pill-icon" />
                <div>
                  <strong>256-Bit SSL</strong>
                  <span>Encrypted Checkout</span>
                </div>
              </div>
              <div className="trust-pill">
                <RotateCcw size={16} className="trust-pill-icon" />
                <div>
                  <strong>Easy Returns</strong>
                  <span>Hassle-free guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <p>© {new Date().getFullYear()} AURA Ecommerce. Designed for modern web standard 2026.</p>
      </div>
    </footer>
  );
}
