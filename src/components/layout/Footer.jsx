import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import './Footer.css';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <button className="back-to-top" onClick={scrollToTop}>
        Back to top
      </button>

      {/* Feature trust items */}
      <div className="footer-features">
        <div className="features-container">
          <div className="feature-item">
            <Truck size={24} className="feature-icon" />
            <div>
              <h4>Free & Fast Shipping</h4>
              <p>On orders over $25</p>
            </div>
          </div>
          <div className="feature-item">
            <ShieldCheck size={24} className="feature-icon" />
            <div>
              <h4>100% Secure Checkout</h4>
              <p>Encrypted payment processing</p>
            </div>
          </div>
          <div className="feature-item">
            <RotateCcw size={24} className="feature-icon" />
            <div>
              <h4>30-Day Easy Returns</h4>
              <p>Hassle-free money back</p>
            </div>
          </div>
          <div className="feature-item">
            <Headphones size={24} className="feature-icon" />
            <div>
              <h4>24/7 Customer Care</h4>
              <p>Dedicated support team</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Amazon Pro Ecommerce Demo. Built with React & Vite.</p>
        </div>
      </div>
    </footer>
  );
}
