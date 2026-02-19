
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
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
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            router.push('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-desktop">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="split-layout"
            >
                {/* Left Side - Form */}
                <div className="form-side">
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'black' }}>Join Us</h2>
                        <p style={{ color: '#6b7280', margin: 0 }}>Create your account to get started.</p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <User className="input-icon" size={20} />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="input-field"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

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

                        <div className="input-group">
                            <Phone className="input-icon" size={20} />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                className="input-field"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Sign Up'}
                        </motion.button>
                    </form>

                    <div style={{ marginTop: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.9rem' }}>
                        Already have an account?{' '}
                        <Link href="/" className="link-text">
                            Login
                        </Link>
                    </div>
                </div>

                {/* Right Side - Visual */}
                <div className="visual-side">
                    <div className="visual-content">
                        <h2>Redefine<br />Security.</h2>
                        <p>Experience the perfect balance of performance and protection.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
