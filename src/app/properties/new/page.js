'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Building2,
    MapPin,
    BedDouble,
    Image as ImageIcon,
    ChevronRight,
    ArrowLeft,
    Save,
    X,
    Upload,
    Plus,
    Trash2,
    FileText,
    Info,
    Check
} from 'lucide-react';
import styles from './page.module.css';
import CustomSelect from '../../../components/CustomSelect';

const tabs = [
    { id: 1, label: 'Basic Details', icon: <Building2 size={16} /> },
    { id: 2, label: 'Room Configuration', icon: <BedDouble size={16} /> },
    { id: 3, label: 'Media & Description', icon: <ImageIcon size={16} /> },
];

export default function NewPropertyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Hostel',
        address: '',
        city: '',
        state: '',
        pincode: '',
        description: '',
        rooms: [
            { type: 'Single', count: '', price: '' },
            { type: 'Double', count: '', price: '' },
        ],
        amenities: [],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoomChange = (index, field, value) => {
        const updatedRooms = [...formData.rooms];
        updatedRooms[index][field] = value;
        setFormData((prev) => ({ ...prev, rooms: updatedRooms }));
    };

    const addRoomRow = () => {
        setFormData((prev) => ({
            ...prev,
            rooms: [...prev.rooms, { type: '', count: '', price: '' }]
        }));
    };

    const removeRoomRow = (index) => {
        setFormData((prev) => ({
            ...prev,
            rooms: prev.rooms.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting Property Data:', formData);
        alert('Property added successfully!');
        router.push('/properties');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Add New Property</h1>
                    <p className={styles.subtitle}>Fill in the details to list a new hostel or PG property.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/properties" className={styles.backBtn}>
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
                    {/* 1. Basic Information */}
                    <div className={`${styles.formSection} ${activeTab === 1 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Basic Information</h2>
                        </div>
                        <div className={styles.grid}>
                            <div className={styles.formGroup}>
                                <label>Property Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Sunset Heights Hostel"
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <CustomSelect name="category" value={formData.category} onChange={handleInputChange} options={['Hostel', 'PG', 'Apartment']} />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label>Full Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter complete building address..."
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.grid3} style={{ marginTop: '20px' }}>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Bangalore"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    placeholder="e.g. Karnataka"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    placeholder="6-digit ZIP code"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Room Configuration */}
                    <div className={`${styles.formSection} ${activeTab === 2 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Room Configuration</h2>
                            <button type="button" onClick={addRoomRow} className={styles.addRoomBtn}>
                                <Plus size={16} />
                                <span>Add Room Type</span>
                            </button>
                        </div>
                        <div className={styles.roomList}>
                            {formData.rooms.map((room, index) => (
                                <div key={index} className={styles.roomRow}>
                                    <div className={styles.formGroup}>
                                        <label>Room Type</label>
                                        <input
                                            type="text"
                                            value={room.type}
                                            onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                                            placeholder="e.g. Single Sharing"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Total Rooms</label>
                                        <input
                                            type="number"
                                            value={room.count}
                                            onChange={(e) => handleRoomChange(index, 'count', e.target.value)}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Monthly Price (₹)</label>
                                        <input
                                            type="number"
                                            value={room.price}
                                            onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {formData.rooms.length > 1 && (
                                            <button type="button" onClick={() => removeRoomRow(index)} className={styles.removeBtn}>
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. Media & Description */}
                    <div className={`${styles.formSection} ${activeTab === 3 ? styles.activeSection : ''}`}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Media & Description</h2>
                        </div>
                        <div className={styles.formGroup}>
                            <label>Property Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe features, amenities, and house rules..."
                                rows={6}
                            />
                        </div>

                        <div className={styles.uploadWrapper} style={{ marginTop: '24px' }}>
                            <div className={styles.uploadLarge}>
                                <Upload size={32} />
                                <span>Drag and drop images or click to browse</span>
                                <p>Support JPG, PNG up to 5MB</p>
                            </div>
                        </div>

                        <div className={styles.uploadPreview}>
                            <div className={styles.placeholderBox}><Plus size={24} /></div>
                            <div className={styles.placeholderBox}><Plus size={24} /></div>
                            <div className={styles.placeholderBox}><Plus size={24} /></div>
                        </div>
                    </div>

                    <div className={styles.formFooterActions}>
                        <Link href="/properties" className={styles.btnFooterCancel}>
                            <X size={18} /> Cancel
                        </Link>
                        {activeTab < tabs.length ? (
                            <button
                                type="button"
                                className={styles.btnFooterSubmit}
                                onClick={() => setActiveTab(activeTab + 1)}
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button type="submit" className={styles.btnFooterSubmit}>
                                <Save size={18} /> Save Property
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
