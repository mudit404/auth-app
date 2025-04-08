'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { getQuote, updateQuote } from '@/services/api';

export default function Home() {
  const { isAuthenticated, user, token, logout } = useAuth();
  const [quote, setQuote] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchQuote();
    }
  }, [isAuthenticated, token]);

  const fetchQuote = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await getQuote(token);
      if (response.status === 'ok') {
        setQuote(response.quote || '');
      } else {
        setMessage({ text: response.error || 'Error fetching quote', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await updateQuote(token, newQuote);
      if (response.status === 'ok') {
        setQuote(newQuote);
        setNewQuote('');
        setMessage({ text: 'Quote updated successfully!', type: 'success' });
      } else {
        setMessage({ text: response.error || 'Error updating quote', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-logo">QuoteKeeper</h1>
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="btn btn-secondary"
          >
            Logout
          </button>
        ) : null}
      </div>

      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      {isAuthenticated ? (
        <div className="card">
          <div className="text-center mb-4">
            <h2>Welcome, {user?.name}!</h2>
            <p style={{ color: '#777' }}>You are logged in as {user?.email}</p>
          </div>
          
          {quote ? (
            <div className="quote-box mb-4">
              <p>{quote}</p>
            </div>
          ) : (
            <p className="text-center mb-4" style={{ color: '#777' }}>You haven't set a quote yet.</p>
          )}

          <form onSubmit={handleUpdateQuote} className="space-y-6">
            <div className="form-group">
              <label htmlFor="newQuote" className="form-label">Update Your Quote:</label>
              <textarea
                id="newQuote"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                placeholder="Enter your new quote..."
                rows={3}
                className="form-input"
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Quote'}
            </button>
          </form>
        </div>
      ) : (
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h2 className="auth-title">Welcome to QuoteKeeper</h2>
              <p className="auth-subtitle">Your personal collection of quotes</p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href="/login" className="btn btn-primary w-full">
                Login
              </Link>
              <Link href="/register" className="btn btn-accent w-full">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}