import { useState } from 'react';
import { Mail, Sparkles, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

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
    <section className="mb-12">
      <div className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-2xl relative overflow-hidden">
        {/* Background ambient pattern */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 shadow-md">
            <Sparkles size={14} /> VIP Insider Access
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-3">
            Unlock 15% Off Your First Order
          </h2>
          <p className="text-sm sm:text-base text-slate-900 font-medium max-w-xl mx-auto mb-8">
            Subscribe to receive exclusive flash drops, member-only discounts, and weekly tech & apparel curations directly in your inbox.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-3" onSubmit={handleSubmit}>
            <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-md px-3 border border-slate-200">
              <Mail size={18} className="text-slate-400 mr-2 flex-shrink-0" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 font-medium py-3 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
            >
              Subscribe <Send size={16} />
            </button>
          </form>

          <span className="text-[11px] font-semibold text-slate-900/80">
            No spam ever. Unsubscribe with 1 click anytime.
          </span>
        </div>
      </div>
    </section>
  );
}
