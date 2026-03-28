'use client';

import { useState } from 'react';
import {
    Settings, Shield, Bell, Users,
    Save, Globe, Mail, Phone,
    Lock, Eye, EyeOff, UserPlus,
    Building2, MapPin, Hash, Trash2
} from 'lucide-react';
import styles from './page.module.css';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [showPassword, setShowPassword] = useState(false);

    const tabs = [
        { id: 'general', label: 'Business Profile', icon: Building2 },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'team', label: 'Team Members', icon: Users },
    ];

    const teamMembers = [
        { name: 'Aman Verma', email: 'aman@hostelpro.com', role: 'admin' },
        { name: 'Rajesh Kumar', email: 'rajesh@hostelpro.com', role: 'manager' },
        { name: 'Sunita Das', email: 'sunita@hostelpro.com', role: 'staff' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>System Settings</h1>
                <p className={styles.subtitle}>Configure your business profile, team, and security preferences.</p>
            </div>

            <div className={styles.tabsNav}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon size={18} />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className={styles.settingsCard}>
                <div className={styles.cardBody}>
                    {activeTab === 'general' && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Business Information</h2>
                                <p className={styles.sectionDesc}>Update your business identity and contact details.</p>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Business Name</label>
                                    <input type="text" defaultValue="HostelPro Management" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Business Tax ID (GST/VAT)</label>
                                    <input type="text" defaultValue="27AAACH0000Z1Z1" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Official Email</label>
                                    <input type="email" defaultValue="contact@hostelpro.com" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Contact Number</label>
                                    <input type="text" defaultValue="+91 98765 43210" />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Registered Address</label>
                                <textarea rows={3} defaultValue="123, Tech Park, Andheri East, Mumbai, Maharashtra 400001" />
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Preferences</h2>
                                <p className={styles.sectionDesc}>Manage how you receive updates and alerts.</p>
                            </div>

                            <div className={styles.toggleRow}>
                                <div className={styles.toggleLabel}>
                                    <span className={styles.toggleTitle}>Booking Alerts</span>
                                    <span className={styles.toggleDesc}>Receive instant notifications when a new booking is registered.</span>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>

                            <div className={styles.toggleRow}>
                                <div className={styles.toggleLabel}>
                                    <span className={styles.toggleTitle}>Payment Reminders</span>
                                    <span className={styles.toggleDesc}>Notify staff 48 hours before a rent payment is due.</span>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" defaultChecked />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>

                            <div className={styles.toggleRow}>
                                <div className={styles.toggleLabel}>
                                    <span className={styles.toggleTitle}>Maintenance Updates</span>
                                    <span className={styles.toggleDesc}>Alert housekeepers when a new complaint is filed.</span>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Account Security</h2>
                                <p className={styles.sectionDesc}>Manage your credentials and access safety.</p>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Current Password</label>
                                    <div style={{ position: 'relative' }}>
                                        <input type={showPassword ? 'text' : 'password'} defaultValue="password123" />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#64748b' }}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>New Password</label>
                                    <input type="password" placeholder="Min 8 characters" />
                                </div>
                            </div>

                            <div className={styles.toggleRow}>
                                <div className={styles.toggleLabel}>
                                    <span className={styles.toggleTitle}>Two-Factor Authentication</span>
                                    <span className={styles.toggleDesc}>Add an extra layer of security to your account.</span>
                                </div>
                                <label className={styles.switch}>
                                    <input type="checkbox" />
                                    <span className={styles.slider}></span>
                                </label>
                            </div>
                        </div>
                    )}

                    {activeTab === 'team' && (
                        <div className={styles.tabContent}>
                            <div className={styles.sectionHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h2 className={styles.sectionTitle}>User Management</h2>
                                    <p className={styles.sectionDesc}>Manage staff access and permissions.</p>
                                </div>
                                <button className={styles.saveBtn} style={{ padding: '8px 16px', fontSize: '13px' }}>
                                    <UserPlus size={16} /> Add Member
                                </button>
                            </div>

                            <div className={styles.userList}>
                                {teamMembers.map((member, i) => (
                                    <div key={i} className={styles.userItem}>
                                        <div className={styles.userInfo}>
                                            <div className={styles.userAvatar}>
                                                <Users size={20} />
                                            </div>
                                            <div>
                                                <div className={styles.userName}>{member.name}</div>
                                                <div className={styles.userRole}>{member.email}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <span className={`${styles.roleBadge} ${styles[member.role]}`}>
                                                {member.role.toUpperCase()}
                                            </span>
                                            <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                                                <Settings size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.footerActions}>
                    <button className={styles.cancelBtn}>Discard Changes</button>
                    <button className={styles.saveBtn}>
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
