'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    User, Phone, Mail, Home, Calendar, Clock,
    CreditCard, ShieldCheck, FileText, ArrowLeft,
    MapPin, BadgeAlert, CheckCircle2, XCircle
} from 'lucide-react';
import { dummyBookings } from '../data';
import styles from './page.module.css';

export default function BookingDetails() {
    const params = useParams();
    const id = params.id;
    const booking = dummyBookings.find(b => b.id === id);

    if (!booking) {
        return (
            <div className={styles.pageContainer} style={{ textAlign: 'center' }}>
                <h2>Booking not found</h2>
                <Link href="/bookings" className={styles.backLink}>
                    <ArrowLeft size={16} /> Back to Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Link href="/bookings" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Bookings
            </Link>

            <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                    <div className={styles.headerTitle}>
                        <h1>Booking ID: {booking.id}</h1>
                        <p>Registered on {booking.addedDate} by {booking.addedBy}</p>
                    </div>
                    <div className={styles.statusBadge}>
                        {booking.bookingStatus}
                    </div>
                </div>

                <div className={styles.mainGrid}>
                    {/* 1. Customer Information */}
                    <div className={styles.infoSection}>
                        <h3 className={styles.sectionTitle}><User size={18} /> Guest Details</h3>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Full Name</span>
                                <span className={styles.infoVal}>{booking.customerName}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Mobile Number</span>
                                <span className={styles.infoVal}>{booking.mobile}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Email Address</span>
                                <span className={styles.infoVal}>{booking.email || 'N/A'}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Property & Stay Details */}
                    <div className={styles.infoSection}>
                        <h3 className={styles.sectionTitle}><Home size={18} /> Property & Stay</h3>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Property</span>
                                <span className={styles.infoVal}>{booking.propertyName}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Room / Bed</span>
                                <span className={styles.infoVal}>{booking.roomNumber} / {booking.bedNumber || 'N/A'}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Check-in</span>
                                <span className={styles.infoVal}>{new Date(booking.checkIn).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Check-out</span>
                                <span className={styles.infoVal}>{new Date(booking.checkOut).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Payment Information */}
                    <div className={styles.infoSection}>
                        <h3 className={styles.sectionTitle}><CreditCard size={18} /> Payment & Billing</h3>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Payment Mode</span>
                                <span className={styles.infoVal}>{booking.paymentMode}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Payment Status</span>
                                <span className={styles.infoVal}>{booking.paymentStatus}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Security Deposit</span>
                                <span className={styles.infoVal}>₹{booking.securityDeposit || '0'}</span>
                            </div>
                        </div>
                        <div className={styles.paymentSummary}>
                            <span className={styles.totalLabel}>Total Rent</span>
                            <span className={styles.totalVal}>₹{booking.rentAmount}</span>
                        </div>
                    </div>

                    {/* 4. Verification & Notes */}
                    <div className={`${styles.infoSection} ${styles.fullWidth}`}>
                        <h3 className={styles.sectionTitle}><ShieldCheck size={18} /> Verification & Documents</h3>
                        <div className={styles.docGrid}>
                            <div className={styles.docBox}>
                                <div className={styles.docIcon}><ShieldCheck size={20} /></div>
                                <div className={styles.docInfo}>
                                    <span className={styles.docName}>{booking.idProofType}: {booking.idProofNumber || 'Not provided'}</span>
                                    <span className={styles.docView}>View Document</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <h4 className={styles.infoLabel} style={{ marginBottom: '8px' }}>Internal Remarks / Notes</h4>
                            <p className={styles.infoVal} style={{ textAlign: 'left', fontStyle: 'italic', color: '#64748b' }}>
                                {booking.remarks || 'No additional remarks provided for this booking.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
