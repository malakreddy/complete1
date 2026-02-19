'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            router.push('/movies');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-desktop">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="split-layout"
            >
                {/* Left Side - Form */}
                <div className="form-side">
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'black' }}>Welcome Back</h2>
                        <p style={{ color: '#6b7280', margin: 0 }}>Please enter your details to sign in.</p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input-field"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                            <Link href="#" style={{ color: '#6b7280', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>
                                Forgot Password?
                            </Link>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Logging In...' : 'Sign In'}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                        Don't have an account?{' '}
                        <Link href="/signup" className="link-text">
                            Sign up
                        </Link>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className="visual-side">
                    <div className="visual-content">
                        <h2>Secure<br />Access.</h2>
                        <p>Your portal to the next generation platform.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
