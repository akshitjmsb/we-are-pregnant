import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export function Login({ onClose }: { onClose: () => void }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const { signInWithEmail } = useAuth();
    const { t } = useTranslation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const { error } = await signInWithEmail(email);
            if (error) throw error;
            setMessage({ type: 'success', text: 'Check your email for the login link!' });
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Error sending login link' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-[#AF6B51] mb-4">Log In / Sign Up</h2>
                <p className="text-gray-600 mb-6">
                    Enter your email to receive a magic link. This will sync your data across devices.
                </p>

                {message && (
                    <div className={`p-3 rounded mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#AF6B51] focus:border-[#AF6B51]"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#AF6B51] hover:bg-[#9c5f48] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#AF6B51] disabled:opacity-50"
                    >
                        {loading ? 'Sending Link...' : 'Send Magic Link'}
                    </button>
                </form>
            </div>
        </div>
    );
}
