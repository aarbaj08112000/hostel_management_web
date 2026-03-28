'use client';

import { useState, use } from 'react';
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

import styles from '../../new/page.module.css';

const tabs = [
    { id: 1, label: 'Personal Info', icon: <User size={16} /> },
    { id: 2, label: 'Contact Details', icon: <Mail size={16} /> },
    { id: 3, label: 'Professional Info', icon: <Briefcase size={16} /> },
    { id: 4, label: 'Permissions', icon: <ShieldCheck size={16} /> },
    { id: 5, label: 'Account Security', icon: <Lock size={16} /> },
];

export default function EditPropertyManagerPage({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState(1);

    // Mock data fetching based on id
    const [formData, setFormData] = useState({
        firstName: id === '1' ? 'Aarbaj' : 'Staff',
        lastName: id === '1' ? 'Mulla' : 'Member',
        gender: 'Male',
        dob: '1995-05-15',
        email: id === '1' ? 'aarbaj@hostel.com' : 'staff@hostel.com',
        phone: '+91 98765 43210',
        altPhone: '',
        address: '123, Sector 4, HSR Layout',
        city: 'Bangalore',
        state: 'Karnataka',
        employeeId: `PM-2024-${id.toString().padStart(3, '0')}`,
        designation: 'Property Manager',
        joiningDate: '2024-01-10',
        salary: '45000',
        role: 'Manager',
        status: 'Active',
        username: id === '1' ? 'aarbaj_pm' : 'staff_pm',
        password: '',
        assignedProperties: ['Sunset Heights', 'Green Valley PG'],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updating Property Manager:', formData);
        alert('Property Manager updated successfully!');
        router.push('/property-managers');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Edit Property Manager #{id}</h1>
                    <p className={styles.subtitle}>Update the profile and permissions for this property manager.</p>
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
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
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
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label>Full Residential Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
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
                                    readOnly
                                    style={{ background: '#f8fafc' }}
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
                                <select name="role" value={formData.role} onChange={handleInputChange}>
                                    <option value="Manager">Property Manager</option>
                                    <option value="Senior Manager">Senior Manager</option>
                                    <option value="Admin">System Admin</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label>Working Status</label>
                                <select name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="Active">Active</option>
                                    <option value="On Leave">On Leave</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
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
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Account Password (leave blank to keep current)</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Form Footer Actions */}
                    <div className={styles.formFooterActions}>
                        <button type="button" onClick={() => router.push('/property-managers')} className={styles.btnFooterCancel}>
                            <X size={18} /> Discard Changes
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
                                <Save size={18} /> <span>Update Manager</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
