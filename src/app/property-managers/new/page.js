'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    ShieldCheck,
    Lock,
    ArrowLeft,
    Save,
    X,
    ChevronRight,
    Building2,
    Calendar,
    Camera,
    Plus,
    Check
} from 'lucide-react';
import styles from './page.module.css';
import CustomSelect from '../../../components/CustomSelect';

const tabs = [
    { id: 1, label: 'Personal Info', icon: <User size={16} /> },
    { id: 2, label: 'Contact Details', icon: <Mail size={16} /> },
    { id: 3, label: 'Professional Info', icon: <Briefcase size={16} /> },
    { id: 4, label: 'Permissions', icon: <ShieldCheck size={16} /> },
    { id: 5, label: 'Account Security', icon: <Lock size={16} /> },
];

export default function NewPropertyManagerPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: 'Male',
        dob: '',
        email: '',
        phone: '',
        altPhone: '',
        address: '',
        city: '',
        state: '',
        employeeId: '',
        designation: 'Property Manager',
        joiningDate: '',
        salary: '',
        role: 'Manager',
        status: 'Active',
        username: '',
        password: '',
        assignedProperties: ['Sunset Heights', 'Green Valley PG'],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering Property Manager:', formData);
        alert('Property Manager added successfully!');
        router.push('/property-managers');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Add New Property Manager</h1>
                    <p className={styles.subtitle}>Register a new manager to oversee hostel operations and staff.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/property-managers" className={styles.backBtn}>
                        <ArrowLeft size={18} /> <span>Back to List</span>
                    </Link>
                </div>
            </div>

            <div className={styles.formCard}>
                <div className={styles.tabsContainer}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Tab 1: Personal Info */}
                    <div className={`${styles.formSection} ${activeTab === 1 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Personal Information</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Gender</label>
                                <CustomSelect name="gender" value={formData.gender} onChange={handleInputChange} options={['Male', 'Female', 'Other']} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tab 2: Contact Details */}
                    <div className={`${styles.formSection} ${activeTab === 2 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Contact Details</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="manager@example.com"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+91 XXXXX XXXXX"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Secondary Phone</label>
                                <input
                                    type="tel"
                                    name="altPhone"
                                    value={formData.altPhone}
                                    onChange={handleInputChange}
                                    placeholder="Optional emergency contact"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Pune"
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label>Full Residential Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter complete permanent address..."
                                    rows={3}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tab 3: Professional Info */}
                    <div className={`${styles.formSection} ${activeTab === 3 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Professional Information</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>Employee ID</label>
                                <input
                                    type="text"
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleInputChange}
                                    placeholder="ID-2024-001"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Date of Joining</label>
                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Monthly Salary (₹)</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tab 4: Permissions */}
                    <div className={`${styles.formSection} ${activeTab === 4 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Permissions & Property Access</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>System Role</label>
                                <CustomSelect name="role" value={formData.role} onChange={handleInputChange} options={[{ value: 'Manager', label: 'Property Manager' }, { value: 'Senior Manager', label: 'Senior Manager' }, { value: 'Admin', label: 'System Admin' }]} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Working Status</label>
                                <CustomSelect name="status" value={formData.status} onChange={handleInputChange} options={['Active', 'On Leave', 'Inactive']} />
                            </div>
                        </div>

                        <div style={{ marginTop: '24px' }}>
                            <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', marginBottom: '10px', display: 'block' }}>
                                Assigned Properties
                            </label>
                            <div className={styles.propertyList}>
                                {['Sunset Heights', 'Green Valley PG', 'Ocean View Hostel', 'Citrus Living'].map(prop => (
                                    <div
                                        key={prop}
                                        className={`${styles.propertyChip} ${formData.assignedProperties.includes(prop) ? styles.propertyChipActive : ''}`}
                                        onClick={() => {
                                            const current = [...formData.assignedProperties];
                                            if (current.includes(prop)) {
                                                setFormData({ ...formData, assignedProperties: current.filter(p => p !== prop) });
                                            } else {
                                                setFormData({ ...formData, assignedProperties: [...current, prop] });
                                            }
                                        }}
                                    >
                                        <Building2 size={14} />
                                        {prop}
                                        {formData.assignedProperties.includes(prop) && <Check size={14} style={{ marginLeft: 'auto' }} />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tab 5: Account Security */}
                    <div className={`${styles.formSection} ${activeTab === 5 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Account & Security</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>Login Username *</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="manager_login"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Account Password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', borderRadius: '12px', border: '1px solid #bae6fd', display: 'flex', gap: '12px' }}>
                            <ShieldCheck className={styles.infoIcon} color="#0369a1" />
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: '700', color: '#0369a1' }}>Security Tip</p>
                                <p style={{ fontSize: '12px', color: '#0c4a6e', marginTop: '2px' }}>
                                    Ensure the manager uses a strong password and changes it upon their first successful login to the system.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Footer Actions */}
                    <div className={styles.formFooterActions}>
                        <button type="button" onClick={() => router.push('/property-managers')} className={styles.btnFooterCancel}>
                            <X size={18} /> Cancel
                        </button>
                        {activeTab < 5 ? (
                            <button
                                type="button"
                                className={styles.btnFooterSubmit}
                                onClick={() => setActiveTab(activeTab + 1)}
                            >
                                <span>Next Section</span> <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button type="submit" className={styles.btnFooterSubmit}>
                                <Save size={18} /> <span>Save Manager</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
