'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Plus, Search, Filter, Calendar, Users, Home,
    CreditCard, MoreVertical, Edit3, Trash2, CheckCircle2,
    Clock, XCircle, ChevronRight, User, Phone, Mail,
    MapPin, ShieldCheck, AlertTriangle,
    LayoutGrid, Table, Check, Eye
} from 'lucide-react';
import styles from './page.module.css';
import { dummyBookings } from './data';


export default function BookingsPage() {
    const router = useRouter();
    const [bookings, setBookings] = useState(dummyBookings);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingBooking, setDeletingBooking] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [showLayoutMenu, setShowLayoutMenu] = useState(false);

    const filteredBookings = bookings.filter(b =>
        b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewBooking = () => {
        router.push('/bookings/new');
    };

    const handleEditBooking = (booking) => {
        router.push(`/bookings/edit/${booking.id}`);
        setActiveMenuId(null);
    };

    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed': return styles.confirmed;
            case 'pending': return styles.pending;
            case 'cancelled': return styles.cancelled;
            case 'completed': return styles.completed;
            default: return '';
        }
    };

    const getPaymentClass = (status) => {
        switch (status.toLowerCase()) {
            case 'paid': return styles.paid;
            case 'partial': return styles.partial;
            case 'pending': return styles.unpaid;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Bookings Management</h1>
                    <p className={styles.subtitle}>Track check-ins, check-outs, and stay history.</p>
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
                                    {viewMode === 'grid' && <Check size={14} className={styles.checkIcon} />}
                                </button>
                                <button
                                    className={`${styles.layoutOption} ${viewMode === 'table' ? styles.selected : ''}`}
                                    onClick={() => { setViewMode('table'); setShowLayoutMenu(false); }}
                                >
                                    <Table size={16} />
                                    <span>Table View</span>
                                    {viewMode === 'table' && <Check size={14} className={styles.checkIcon} />}
                                </button>
                            </div>
                        )}
                    </div>
                    <button className={styles.addButton} onClick={handleNewBooking}>
                        <Plus size={18} />
                        <span>New Booking</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#e0f2fe', color: '#0ea5e9' }}>
                        <Calendar size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Active Bookings</span>
                        <div className={styles.overviewValue}>{bookings.filter(b => b.bookingStatus === 'Confirmed').length}</div>
                    </div>
                </div>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Check-ins Today</span>
                        <div className={styles.overviewValue}>12</div>
                    </div>
                </div>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#fff7ed', color: '#f59e0b' }}>
                        <Clock size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Pending Payments</span>
                        <div className={styles.overviewValue}>₹{bookings.filter(b => b.paymentStatus !== 'Paid').length * 2500}</div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div className={styles.searchWrapper} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px', background: 'white', border: '1px solid #e2e8f0', padding: '0 16px', borderRadius: '14px', height: '48px' }}>
                    <Search color="#94a3b8" size={18} />
                    <input
                        type="text"
                        placeholder="Search by customer name or ID..."
                        style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className={styles.filterButton} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'white', border: '1px solid #e2e8f0', padding: '0 20px', height: '48px', borderRadius: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Bookings List */}
            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {filteredBookings.map(booking => (
                        <div key={booking.id} className={styles.bookingCard}>
                            <div className={styles.cardTop}>
                                <div className={styles.customerInfo}>
                                    <h3 className={styles.customerName}>{booking.customerName}</h3>
                                    <span className={styles.customerPhone}>{booking.mobile} • {booking.id}</span>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span className={`${styles.statusBadge} ${getStatusClass(booking.bookingStatus)}`}>
                                        {booking.bookingStatus}
                                    </span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                                            onClick={() => setActiveMenuId(activeMenuId === booking.id ? null : booking.id)}
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                        {activeMenuId === booking.id && (
                                            <div style={{ position: 'absolute', top: '30px', right: 0, background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '8px', zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '150px' }}>
                                                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: '8px' }} onClick={() => handleEditBooking(booking)}>
                                                    <Edit3 size={14} /> Edit
                                                </button>
                                                <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: 'none', background: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', color: '#ef4444' }} onClick={() => { setDeletingBooking(booking); setShowDeleteModal(true); setActiveMenuId(null); }}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.stayInfo}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Property / Room</span>
                                    <span className={styles.infoValue}><Home size={14} /> {booking.propertyName} • {booking.roomNumber}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLabel}>Period</span>
                                    <span className={styles.infoValue}><Calendar size={14} /> {new Date(booking.checkIn).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.rentInfo}>
                                    <span className={styles.infoLabel}>Rent Due</span>
                                    <span className={styles.rentValue}>₹{booking.rentAmount}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className={styles.infoLabel} style={{ marginBottom: '4px', display: 'block' }}>Payment</span>
                                    <span className={`${styles.paymentBadge} ${getPaymentClass(booking.paymentStatus)}`}>
                                        {booking.paymentStatus} • {booking.paymentMode}
                                    </span>
                                </div>
                            </div>

                            <button
                                className={styles.viewDetailsBtn}
                                style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#f1f5f9', padding: '12px', borderRadius: '12px', color: '#475569', fontSize: '13px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                                onClick={() => router.push(`/bookings/${booking.id}`)}
                            >
                                View Details <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Customer Details</th>
                                <th>Property & Room</th>
                                <th>Booking Period</th>
                                <th>Pricing & Payment</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map(booking => (
                                <tr key={booking.id}>
                                    <td>
                                        <div className={styles.tableCustomerCell}>
                                            <div className={styles.tableCustomerIcon}>
                                                <User size={20} />
                                            </div>
                                            <div className={styles.tableCustomerInfo}>
                                                <div className={styles.tableCustomerName}>{booking.customerName}</div>
                                                <div className={styles.tableBookingId}>{booking.mobile} • {booking.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableStayInfo}>
                                            <div className={styles.tablePropertyName}>{booking.propertyName}</div>
                                            <div className={styles.tableRoomBed}>Room {booking.roomNumber} {booking.bedNumber && `• Bed ${booking.bedNumber}`}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tablePeriodInfo}>
                                            <div className={styles.tablePeriodLabel}>Check-in</div>
                                            <div className={styles.tableDate}>{new Date(booking.checkIn).toLocaleDateString()}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableFinanceInfo}>
                                            <div className={styles.tableAmount}>₹{booking.rentAmount}</div>
                                            <div className={`${styles.paymentBadge} ${getPaymentClass(booking.paymentStatus)}`} style={{ padding: '0', background: 'none' }}>
                                                {booking.paymentStatus} • {booking.paymentMode}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadgeTable} ${getStatusClass(booking.bookingStatus)}`}>
                                            {booking.bookingStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.tableActions}>
                                            <button
                                                className={styles.actionBtnIcon}
                                                title="View Details"
                                                onClick={() => router.push(`/bookings/${booking.id}`)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className={styles.actionBtnIcon}
                                                title="Edit Booking"
                                                onClick={() => handleEditBooking(booking)}
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtnIcon} ${styles.deleteBtnIcon}`}
                                                title="Delete"
                                                onClick={() => { setDeletingBooking(booking); setShowDeleteModal(true); }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


            {/* Delete Confirmation */}
            {showDeleteModal && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
                    <div style={{ background: 'white', maxWidth: '400px', borderRadius: '24px', padding: '32px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <div style={{ width: '64px', height: '64px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <AlertTriangle size={36} />
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '12px' }}>Cancel Booking?</h2>
                        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                            Are you sure you want to remove the booking for <strong>{deletingBooking?.customerName}</strong>? This action will free up the room and cannot be undone.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>Keep It</button>
                            <button className={styles.submitBtn} style={{ background: '#ef4444' }} onClick={() => { setBookings(bookings.filter(b => b.id !== deletingBooking.id)); setShowDeleteModal(false); }}>
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
