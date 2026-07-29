import { useState } from 'react';
import { Mail, Sparkles, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './Newsletter.css';

export function Newsletter() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('🎉 Thank you for subscribing! Check your inbox for your 15% promo code.', 'success');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <div className="newsletter-content-box">
          <span className="newsletter-badge">
            <Sparkles size={14} /> VIP Insider Access
          </span>
          <h2 className="newsletter-title">Unlock 15% Off Your First Order</h2>
          <p className="newsletter-desc">
            Subscribe to receive exclusive flash drops, member-only discounts, and weekly tech & apparel curations directly in your inbox.
          </p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-field-wrapper">
              <Mail size={18} className="mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-email-input"
                required
              />
            </div>
            <button type="submit" className="newsletter-submit-btn">
              Subscribe Now <Send size={16} />
            </button>
          </form>
          <span className="newsletter-fineprint">No spam ever. Unsubscribe with 1 click anytime.</span>
        </div>
      </div>
    </section>
  );
}
