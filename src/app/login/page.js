'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Mail,
    Lock,
    LogIn,
    Building2,
    ArrowRight,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    X,
    MessageCircle,
    Send
} from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);
    const [supportSuccess, setSupportSuccess] = useState(false);
    const [supportCategory, setSupportCategory] = useState('technical');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [forgotEmail, setForgotEmail] = useState('');
    const [supportMsg, setSupportMsg] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (error) setError('');
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Field Validation
        const newFormErrors = {};
        if (!formData.email) {
            newFormErrors.email = "Please enter your email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newFormErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            newFormErrors.password = "Please enter your password.";
        }

        setFormErrors(newFormErrors);

        if (Object.keys(newFormErrors).length > 0) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { login } = await import('@/utils/api');
            const response = await login(formData.email, formData.password);

            setLoading(false);
            setSuccess(true);

            // Redirect after a short success pause
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.backgroundOverlay}></div>
            <img
                src="/login-bg.png"
                alt="Modern Architecture"
                className={styles.backgroundImage}
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />

            <div className={styles.loginCard}>
                <div className={styles.logoArea}>
                    <div className={styles.logoIcon}>
                        <Building2 size={32} />
                    </div>
                    <h1>HostelPro</h1>
                    <p>Corporate Hostel Management System</p>
                </div>

                <form className={styles.form} onSubmit={handleLogin}>
                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', padding: '12px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center', color: '#ef4444', fontSize: '13px', fontWeight: '600' }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{ background: '#f0fdf4', border: '1px solid #dcfce7', padding: '12px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center', color: '#16a34a', fontSize: '13px', fontWeight: '600' }}>
                            <CheckCircle2 size={16} />
                            Sign in successful! Redirecting...
                        </div>
                    )}

                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="email"
                                name="email"
                                className={`${styles.inputField} ${formErrors.email ? styles.inputError : ''}`}
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <Mail size={18} className={styles.inputIcon} />
                        </div>
                        {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className={`${styles.inputField} ${formErrors.password ? styles.inputError : ''}`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                            <Lock size={18} className={styles.inputIcon} />
                            <button
                                type="button"
                                style={{ position: 'absolute', right: '16px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {formErrors.password && <span className={styles.errorText}>{formErrors.password}</span>}
                    </div>

                    <div className={styles.optionsRow}>
                        <label className={styles.rememberMe}>
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            className={styles.forgotPassword}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            onClick={() => setShowForgotModal(true)}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading || success}
                    >
                        {loading ? 'Verifying Account...' : (
                            <>
                                Sign In To Workspace <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className={styles.footerText}>
                    New to HostelPro? <button
                        className={styles.footerLink}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        onClick={() => setShowSupportModal(true)}
                    >
                        Contact Support
                    </button>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className={styles.modalOverlay} onClick={() => { setShowForgotModal(false); setForgotSuccess(false); }}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModalBtn} onClick={() => { setShowForgotModal(false); setForgotSuccess(false); }}>
                            <X size={20} />
                        </button>

                        {!forgotSuccess ? (
                            <>
                                <div className={styles.modalHead}>
                                    <h2>Reset Password</h2>
                                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <input
                                            type="email"
                                            className={styles.inputField}
                                            placeholder="your-email@company.com"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                        />
                                        <Mail size={18} className={styles.inputIcon} />
                                    </div>
                                </div>
                                <button
                                    className={styles.submitBtn}
                                    style={{ marginTop: '24px' }}
                                    onClick={() => setForgotSuccess(true)}
                                >
                                    Send Reset Link
                                </button>
                            </>
                        ) : (
                            <div className={styles.successState}>
                                <div className={styles.successIcon}>
                                    <CheckCircle2 size={32} />
                                </div>
                                <h2>Check Your Email</h2>
                                <p>We've sent a password reset link to <strong>{forgotEmail}</strong>.</p>
                                <button
                                    className={styles.submitBtn}
                                    style={{ marginTop: '24px' }}
                                    onClick={() => { setShowForgotModal(false); setForgotSuccess(false); }}
                                >
                                    Back to Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Contact Support Modal */}
            {showSupportModal && (
                <div className={styles.modalOverlay} onClick={() => { setShowSupportModal(false); setSupportSuccess(false); }}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeModalBtn} onClick={() => { setShowSupportModal(false); setSupportSuccess(false); }}>
                            <X size={20} />
                        </button>

                        {!supportSuccess ? (
                            <>
                                <div className={styles.modalHead}>
                                    <h2>Contact Support</h2>
                                    <p>Our team is here to help you with any issues.</p>
                                </div>
                                <div className={styles.form} style={{ gap: '20px' }}>
                                    <div className={styles.formGroup}>
                                        <label>Issue Type</label>
                                        <input
                                            className={styles.inputField}
                                            style={{ paddingLeft: '16px' }}
                                            value={supportCategory}
                                            disabled
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>How can we help?</label>
                                        <textarea
                                            className={styles.inputField}
                                            style={{ paddingLeft: '16px', minHeight: '120px', resize: 'none', padding: '12px' }}
                                            placeholder="Describe your issue in detail..."
                                            value={supportMsg}
                                            onChange={(e) => setSupportMsg(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <button
                                        className={styles.submitBtn}
                                        onClick={() => setSupportSuccess(true)}
                                    >
                                        <Send size={18} style={{ marginRight: '8px' }} /> Submit Request
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={styles.successState}>
                                <div className={styles.successIcon}>
                                    <MessageCircle size={32} />
                                </div>
                                <h2>Request Received</h2>
                                <p>Your support ticket has been created. We'll get back to you via email shortly.</p>
                                <button
                                    className={styles.submitBtn}
                                    style={{ marginTop: '24px' }}
                                    onClick={() => { setShowSupportModal(false); setSupportSuccess(false); }}
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
