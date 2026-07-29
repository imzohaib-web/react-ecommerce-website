import { Link } from 'react-router';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <AlertTriangle size={64} className="not-found-icon" />
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="home-btn">
          <ArrowLeft size={16} /> Return to Storefront
        </Link>
      </div>
    </div>
  );
}
