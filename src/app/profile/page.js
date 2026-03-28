'use client';

import { useState } from 'react';
import {
    User,
    Lock,
    Bell,
    ShieldCheck,
    Mail,
    Phone,
    Briefcase,
    Camera,
    Edit2,
    Save,
    X,
    History,
    LogOut,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import styles from './page.module.css';

const initialUserData = {
    name: 'Aarbaj Mulla',
    email: 'aarbaj.mulla@hostelpro.com',
    phone: '+91 98765 43210',
    designation: 'Senior Administrator',
    location: 'Pune, Maharashtra',
    joinedDate: 'October 2023',
    avatar: 'AM'
};

const activityLog = [
    { id: 1, action: 'Updated Room 101 pricing', time: '2 hours ago', icon: <Edit2 size={16} /> },
    { id: 2, action: 'Added new Property Manager: Rahul', time: 'Yesterday', icon: <User size={16} /> },
    { id: 3, action: 'Modified system backup settings', time: '3 days ago', icon: <ShieldCheck size={16} /> },
    { id: 4, action: 'Resolved maintenance ticket #442', time: '1 week ago', icon: <CheckCircle2 size={16} /> }
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(initialUserData);
    const [tempData, setTempData] = useState(initialUserData);
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleEditToggle = () => {
        if (isEditing) {
            setTempData(userData);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setUserData(tempData);
        setIsEditing(false);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <Header title="My Profile" />

            <div className={styles.profileContainer}>
                <div className={styles.profileLayout}>
                    {/* Sidebar Tabs */}
                    <div className={styles.sidebar}>
                        <div
                            className={`${styles.sidebarItem} ${activeTab === 'general' ? styles.active : ''}`}
                            onClick={() => setActiveTab('general')}
                        >
                            <User size={18} />
                            General Information
                        </div>
                        <div
                            className={`${styles.sidebarItem} ${activeTab === 'security' ? styles.active : ''}`}
                            onClick={() => setActiveTab('security')}
                        >
                            <Lock size={18} />
                            Security & Password
                        </div>
                        <div
                            className={`${styles.sidebarItem} ${activeTab === 'activity' ? styles.active : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            <History size={18} />
                            Activity Log
                        </div>
                        <div className={styles.sidebarItem} style={{ marginTop: 'auto', color: '#ef4444' }}>
                            <LogOut size={18} />
                            Sign Out
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className={styles.mainContent}>
                        {activeTab === 'general' && (
                            <div className={styles.tabContent}>
                                <div className={styles.sectionHeader}>
                                    <h2>Account Settings</h2>
                                    {!isEditing ? (
                                        <button className={styles.editBtn} onClick={handleEditToggle}>
                                            <Edit2 size={16} /> Edit Profile
                                        </button>
                                    ) : (
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button className={styles.cancelBtn} onClick={handleEditToggle}>Cancel</button>
                                            <button className={styles.saveBtn} onClick={handleSave}>Save Changes</button>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.avatarSection}>
                                    <div className={styles.avatarCircle}>
                                        {userData.avatar}
                                    </div>
                                    <div className={styles.avatarActions}>
                                        <h3>Profile Photo</h3>
                                        <p>Expand your identity with a professional photo.</p>
                                        <button className={styles.uploadBtn}>
                                            <Camera size={14} style={{ marginRight: '6px' }} /> Change Photo
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.infoGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Full Name</label>
                                        <input
                                            name="name"
                                            className={styles.formInput}
                                            value={isEditing ? tempData.name : userData.name}
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Job Title</label>
                                        <input
                                            name="designation"
                                            className={styles.formInput}
                                            value={isEditing ? tempData.designation : userData.designation}
                                            disabled={!isEditing}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Email Address</label>
                                        <div style={{ position: 'relative' }}>
                                            <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                            <input
                                                name="email"
                                                className={styles.formInput}
                                                style={{ paddingLeft: '40px' }}
                                                value={isEditing ? tempData.email : userData.email}
                                                disabled={!isEditing}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Phone Number</label>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                            <input
                                                name="phone"
                                                className={styles.formInput}
                                                style={{ paddingLeft: '40px' }}
                                                value={isEditing ? tempData.phone : userData.phone}
                                                disabled={!isEditing}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                        <label>Office Location</label>
                                        <input
                                            className={styles.formInput}
                                            value={userData.location}
                                            disabled
                                        />
                                        <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Location is managed by system administrator.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className={styles.tabContent}>
                                <div className={styles.sectionHeader}>
                                    <h2>Security Settings</h2>
                                </div>

                                <div className={styles.securityCard}>
                                    <h3><ShieldCheck size={20} color="#1e88e5" /> Change Account Password</h3>
                                    <div className={styles.infoGrid}>
                                        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                            <label>Current Password</label>
                                            <input
                                                type="password"
                                                name="current"
                                                className={styles.formInput}
                                                placeholder="••••••••"
                                                value={passwordData.current}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>New Password</label>
                                            <input
                                                type="password"
                                                name="new"
                                                className={styles.formInput}
                                                placeholder="Min. 8 characters"
                                                value={passwordData.new}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirm"
                                                className={styles.formInput}
                                                placeholder="Repeat new password"
                                                value={passwordData.confirm}
                                                onChange={handlePasswordChange}
                                            />
                                        </div>
                                        <div className={styles.fullWidth} style={{ marginTop: '12px' }}>
                                            <button className={styles.editBtn} style={{ width: '100%', justifyContent: 'center' }}>
                                                Update Password
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '32px', padding: '24px', borderRadius: '20px', border: '1px solid #fee2e2', background: '#fffefc' }}>
                                    <div style={{ display: 'flex', gap: '16px' }}>
                                        <AlertCircle color="#ef4444" size={24} />
                                        <div>
                                            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#991b1b', marginBottom: '4px' }}>Two-Factor Authentication</h4>
                                            <p style={{ fontSize: '13px', color: '#b91c1c', marginBottom: '16px' }}>Add an extra layer of security to your account.</p>
                                            <button className={styles.uploadBtn} style={{ color: '#ef4444', borderColor: '#fecaca' }}>Enable 2FA</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className={styles.tabContent}>
                                <div className={styles.sectionHeader}>
                                    <h2>Recent Activity</h2>
                                </div>

                                <div className={styles.activityList}>
                                    {activityLog.map(item => (
                                        <div key={item.id} className={styles.activityItem}>
                                            <div className={styles.activityIcon}>
                                                {item.icon}
                                            </div>
                                            <div className={styles.activityContent}>
                                                <p>{item.action}</p>
                                                <span>{item.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    className={styles.uploadBtn}
                                    style={{ width: '100%', marginTop: '32px', padding: '12px' }}
                                >
                                    Load More Activity
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
