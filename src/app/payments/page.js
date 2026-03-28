'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Plus, Search, Filter, CreditCard,
    Calendar, User, Home, MoreVertical,
    LayoutGrid, Table, Check, Trash2,
    Edit3, FileText, IndianRupee, Tag,
    Clock, CheckCircle, AlertCircle, XCircle
} from 'lucide-react';
import styles from './page.module.css';
import { dummyPayments } from './data';

export default function PaymentsPage() {
    const [payments, setPayments] = useState(dummyPayments);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [showLayoutMenu, setShowLayoutMenu] = useState(false);

    const filteredPayments = payments.filter(p =>
        p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Paid': return styles.statusPaid;
            case 'Pending': return styles.statusPending;
            case 'Failed': return styles.statusFailed;
            case 'Refunded': return styles.statusRefunded;
            default: return '';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Paid': return <CheckCircle size={14} />;
            case 'Pending': return <Clock size={14} />;
            case 'Failed': return <XCircle size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Payments & Billing</h1>
                    <p className={styles.subtitle}>Track collections, manage invoices and monitor financial performance.</p>
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
                    <Link href="/payments/new" className={styles.addButton}>
                        <Plus size={18} />
                        <span>Collect Payment</span>
                    </Link>
                </div>
            </div>

            <div className={styles.filterBar}>
                <div className={styles.searchWrapper}>
                    <Search size={18} color="#94a3b8" />
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search by customer, payment ID or property..."
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
                    {filteredPayments.map(payment => (
                        <div key={payment.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <span className={`${styles.statusBadge} ${getStatusClass(payment.status)}`}>
                                    {getStatusIcon(payment.status)} {payment.status}
                                </span>
                                <div className={styles.amountBox}>
                                    <span className={styles.amount}>{formatAmount(payment.amount)}</span>
                                    <span className={styles.paymentId}>{payment.id}</span>
                                </div>
                            </div>

                            <div className={styles.customerInfo}>
                                <h3>{payment.customerName}</h3>
                                <div className={styles.propertyTag}>
                                    <Home size={14} /> {payment.propertyName} • Room {payment.roomNo}
                                </div>
                            </div>

                            <div className={styles.paymentMeta}>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>Category</span>
                                    <span className={styles.value}><Tag size={13} /> {payment.type}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.label}>Method</span>
                                    <span className={styles.value}><CreditCard size={13} /> {payment.method}</span>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.dateInfo}>
                                    <Calendar size={14} />
                                    <span>{formatDate(payment.date)}</span>
                                </div>
                                <div className={styles.actions}>
                                    <Link href={`/payments/${payment.id}/edit`} className={styles.iconButton} style={{ width: '32px', height: '32px' }}>
                                        <Edit3 size={14} />
                                    </Link>
                                    <Link href={`/payments/${payment.id}/receipt`} className={styles.iconButton} style={{ width: '32px', height: '32px' }} title="Receipt">
                                        <FileText size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Transaction</th>
                                <th>Customer & Property</th>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.map(payment => (
                                <tr key={payment.id}>
                                    <td>
                                        <div style={{ fontWeight: 800, color: '#0f172a' }}>{payment.id}</div>
                                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{formatDate(payment.date)}</div>
                                    </td>
                                    <td>
                                        <div className={styles.customerCell}>
                                            <div className={styles.avatar}><User size={18} /></div>
                                            <div>
                                                <div style={{ fontWeight: 700, color: '#1e293b' }}>{payment.customerName}</div>
                                                <div style={{ fontSize: '12px', color: '#64748b' }}>{payment.propertyName} • Rm {payment.roomNo}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#475569', fontSize: '13px' }}>{payment.type}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>{payment.method}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 900, color: '#0f172a' }}>{formatAmount(payment.amount)}</div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${getStatusClass(payment.status)}`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            <Link href={`/payments/${payment.id}/edit`} className={styles.iconButton} style={{ width: '30px', height: '30px' }}>
                                                <Edit3 size={14} />
                                            </Link>
                                            <Link href={`/payments/${payment.id}/receipt`} className={styles.iconButton} style={{ width: '30px', height: '30px' }} title="Receipt">
                                                <FileText size={14} />
                                            </Link>
                                            <button
                                                className={styles.iconButton}
                                                style={{ width: '30px', height: '30px', color: '#ef4444' }}
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this payment record?')) {
                                                        const newPayments = payments.filter(p => p.id !== payment.id);
                                                        setPayments(newPayments);
                                                    }
                                                }}
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
