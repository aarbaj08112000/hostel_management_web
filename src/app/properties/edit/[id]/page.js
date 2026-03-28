'use client';

import { useState, use } from 'react';
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
    Check
} from 'lucide-react';

import styles from '../../new/page.module.css';

const tabs = [
    { id: 1, label: 'Basic Details', icon: <Building2 size={16} /> },
    { id: 2, label: 'Room Configuration', icon: <BedDouble size={16} /> },
    { id: 3, label: 'Media & Description', icon: <ImageIcon size={16} /> },
];

export default function EditPropertyPage({ params }) {
    const router = useRouter();
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState(1);

    const [formData, setFormData] = useState({
        name: id === '1' ? 'Sunset Heights Hostel' : 'Loading Property...',
        category: id === '1' ? 'Hostel' : 'PG',
        address: id === '1' ? 'Koramangala, Bangalore' : '',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560034',
        description: 'A premium corporate hostel designed for young professionals.',
        rooms: [
            { type: 'Single', count: '10', price: '12000' },
            { type: 'Double', count: '20', price: '8500' },
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
        console.log('Updating Property Data:', formData);
        alert('Property updated successfully!');
        router.push('/properties');
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h1 className={styles.title}>Edit Property #{id}</h1>
                    <p className={styles.subtitle}>Update the details for your hostel or PG property.</p>
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
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleInputChange}>
                                    <option value="Hostel">Hostel</option>
                                    <option value="PG">PG</option>
                                    <option value="Apartment">Apartment</option>
                                </select>
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label>Full Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    required
                                />
                            </div>
                        </div>
                        <div className={styles.grid3} style={{ marginTop: '20px' }}>
                            <div className={styles.formGroup}>
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Pincode</label>
                                <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} />
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
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Total Rooms</label>
                                        <input
                                            type="number"
                                            value={room.count}
                                            onChange={(e) => handleRoomChange(index, 'count', e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Monthly Price (₹)</label>
                                        <input
                                            type="number"
                                            value={room.price}
                                            onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
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
                                rows={6}
                            />
                        </div>

                        <div className={styles.uploadWrapper} style={{ marginTop: '24px' }}>
                            <div className={styles.uploadLarge}>
                                <Upload size={32} />
                                <span>Drag and drop images to update gallery</span>
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
                            <X size={18} /> Discard Changes
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
                                <Save size={18} /> Update Property
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
