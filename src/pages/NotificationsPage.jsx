import { Bell, CheckCircle2, Package, Sparkles } from 'lucide-react';

export function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Order Shipped!',
      message: 'Your order #27cba69d has been shipped and is on its way.',
      time: '2 hours ago',
      type: 'shipping'
    },
    {
      id: 2,
      title: 'Summer Sale Flash Deal',
      message: 'Exclusive 20% discount on select Home & Kitchen items.',
      time: '1 day ago',
      type: 'promo'
    },
    {
      id: 3,
      title: 'Account Security Update',
      message: 'Your account security preferences were updated successfully.',
      time: '3 days ago',
      type: 'system'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-16 pt-8">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Bell size={32} className="text-amber-500" /> Notifications
        </h1>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md divide-y divide-slate-100 overflow-hidden">
          {notifications.map((n) => (
            <div key={n.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-slate-100">
                {n.type === 'shipping' && <Package size={20} className="text-sky-500" />}
                {n.type === 'promo' && <Sparkles size={20} className="text-amber-500" />}
                {n.type === 'system' && <CheckCircle2 size={20} className="text-emerald-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-bold text-sm text-slate-900">{n.title}</h3>
                  <span className="text-xs text-slate-400 font-medium">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
