'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Plus, Search, Filter, User, Phone,
    Home, Clock, LogOut, MoreVertical,
    LayoutGrid, Table, Check, UserCircle,
    Calendar, ShieldCheck, Tag, Trash2, Edit3
} from 'lucide-react';
import styles from './page.module.css';
import { dummyVisitors } from './data';

export default function VisitorsPage() {
    const [visitors, setVisitors] = useState(dummyVisitors);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showLayoutMenu, setShowLayoutMenu] = useState(false);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const filteredVisitors = visitors.filter(v =>
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.mobile.includes(searchTerm) ||
        v.residentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckout = (id) => {
        setVisitors(prev => prev.map(v =>
            v.id === id ? { ...v, status: 'Checked-out', outTime: new Date().toISOString() } : v
        ));
    };

    const handleDelete = (id) => {
        setVisitors(prev => prev.filter(v => v.id !== id));
        setActiveMenuId(null);
    };

    const formatTime = (isoString) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (isoString) => {
        if (!isoString) return '';
        return new Date(isoString).toLocaleDateString();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Visitor Management</h1>
                    <p className={styles.subtitle}>Log and monitor guests, contractors, and inquiries.</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.layoutToggleWrapper}>
                        <button
                            className={`${styles.iconButton} ${showLayoutMenu ? styles.active : ''}`}
                            onClick={() => setShowLayoutMenu(!showLayoutMenu)}
                        >
                            <MoreVertical size={20} />
                        </button>
                        {showLayoutMenu && (
                            <div className={styles.layoutMenu}>
                                <div className={styles.menuHeader}>Display Options</div>
                                <button
                                    className={`${styles.layoutOption} ${viewMode === 'grid' ? styles.selected : ''}`}
                                    onClick={() => { setViewMode('grid'); setShowLayoutMenu(false); }}
                                >
                                    <LayoutGrid size={16} />
                                    <span>Grid View</span>
                                    {viewMode === 'grid' && <Check size={14} style={{ marginLeft: 'auto', color: '#1e88e5' }} />}
                                </button>
                                <button
                                    className={`${styles.layoutOption} ${viewMode === 'table' ? styles.selected : ''}`}
                                    onClick={() => { setViewMode('table'); setShowLayoutMenu(false); }}
                                >
                                    <Table size={16} />
                                    <span>Table View</span>
                                    {viewMode === 'table' && <Check size={14} style={{ marginLeft: 'auto', color: '#1e88e5' }} />}
                                </button>
                            </div>
                        )}
                    </div>
                    <Link href="/visitors/new" className={styles.addButton}>
                        <Plus size={18} />
                        <span>Log Visitor</span>
                    </Link>
                </div>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.searchWrapper}>
                    <Search size={18} color="#94a3b8" />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search by visitor name, mobile, or resident..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className={styles.iconButton} title="Filter List">
                    <Filter size={18} />
                </button>
            </div>

            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {filteredVisitors.map(visitor => (
                        <div key={visitor.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <div className={styles.visitorInfo}>
                                    <h3>{visitor.name}</h3>
                                    <span className={styles.idBadge}>{visitor.id}</span>
                                </div>
                                <span className={`${styles.statusBadge} ${visitor.status === 'Checked-in' ? styles.checkedIn : styles.checkedOut}`}>
                                    {visitor.status}
                                </span>
                            </div>

                            <div className={styles.purposeTag}>
                                <Tag size={12} /> {visitor.purpose}
                            </div>

                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Mobile</span>
                                    <span className={styles.value}><Phone size={12} /> {visitor.mobile}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Invited By</span>
                                    <span className={styles.value}><User size={12} /> {visitor.residentName}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Property No.</span>
                                    <span className={styles.value}><Home size={12} /> {visitor.propertyName}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.label}>Date</span>
                                    <span className={styles.value}><Calendar size={12} /> {formatDate(visitor.inTime)}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.timeInfo}>
                                    <Clock size={14} />
                                    <span>{formatTime(visitor.inTime)} - {formatTime(visitor.outTime)}</span>
                                </div>
                                {visitor.status === 'Checked-in' ? (
                                    <button
                                        className={styles.checkoutBtn}
                                        onClick={() => handleCheckout(visitor.id)}
                                    >
                                        <LogOut size={14} style={{ marginRight: '6px' }} /> Check-out
                                    </button>
                                ) : (
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <Link href={`/visitors/${visitor.id}/edit`} className={styles.iconButton} style={{ width: '32px', height: '32px' }}>
                                            <Edit3 size={14} />
                                        </Link>
                                        <button
                                            className={styles.iconButton}
                                            style={{ width: '32px', height: '32px', color: '#ef4444' }}
                                            onClick={() => handleDelete(visitor.id)}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Visitor</th>
                                <th>Purpose / Resident</th>
                                <th>Property</th>
                                <th>Timing</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVisitors.map(visitor => (
                                <tr key={visitor.id}>
                                    <td>
                                        <div className={styles.visitorCell}>
                                            <div className={styles.avatar}><User size={18} /></div>
                                            <div>
                                                <div style={{ fontWeight: 800, color: '#0f172a' }}>{visitor.name}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{visitor.mobile}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ fontWeight: 700, color: '#334155', fontSize: '14px' }}>{visitor.purpose}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>Resident: {visitor.residentName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{visitor.propertyName}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontSize: '13px' }}>
                                            <div style={{ fontWeight: 700 }}>{formatDate(visitor.inTime)}</div>
                                            <div style={{ color: '#64748b' }}>{formatTime(visitor.inTime)} → {formatTime(visitor.outTime)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${visitor.status === 'Checked-in' ? styles.checkedIn : styles.checkedOut}`}>
                                            {visitor.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {visitor.status === 'Checked-in' && (
                                                <button
                                                    className={styles.checkoutBtn}
                                                    style={{ padding: '6px 12px', fontSize: '12px' }}
                                                    onClick={() => handleCheckout(visitor.id)}
                                                >
                                                    Check-out
                                                </button>
                                            )}
                                            <Link href={`/visitors/${visitor.id}/edit`} className={styles.iconButton} style={{ width: '30px', height: '30px' }} title="Edit">
                                                <Edit3 size={14} />
                                            </Link>
                                            <button
                                                className={styles.iconButton}
                                                style={{ width: '30px', height: '30px', color: '#ef4444' }}
                                                title="Delete"
                                                onClick={() => handleDelete(visitor.id)}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
