'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Printer, CheckCircle, Download } from 'lucide-react';
import styles from '../../receipt.module.css';
import { dummyPayments } from '../../data';

export default function PaymentReceiptPage({ params }) {
    const { id } = use(params);
    const payment = dummyPayments.find(p => p.id === id);

    if (!payment) {
        return (
            <div style={{ padding: '60px', textAlign: 'center' }}>
                <h1>Receipt Not Found</h1>
                <Link href="/payments" style={{ color: '#1e88e5' }}>Back to Payments</Link>
            </div>
        );
    }

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className={styles.receiptContainer}>
            <div className={styles.header}>
                <Link href="/payments" className={styles.backLink}>
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className={styles.backLink} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                        <Download size={18} /> Download PDF
                    </button>
                    <button className={styles.printBtn} onClick={() => window.print()}>
                        <Printer size={18} /> Print Receipt
                    </button>
                </div>
            </div>

            <div className={styles.receiptCard}>
                <div className={styles.statusWatermark}>{payment.status}</div>

                <div className={styles.brandInfo}>
                    <div className={styles.brandName}>HostelPro</div>
                    <div className={styles.brandSub}>Premium Hostel Management</div>
                </div>

                <div className={styles.receiptTitle}>
                    <p>Transaction Receipt</p>
                    <h1>{payment.id}</h1>
                </div>

                <div className={styles.infoGrid}>
                    <div className={styles.infoBlock}>
                        <h4>Paid By</h4>
                        <p>{payment.customerName}</p>
                        <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 400 }}>{payment.customerId}</p>
                    </div>
                    <div className={styles.infoBlock} style={{ textAlign: 'right' }}>
                        <h4>Property & Room</h4>
                        <p>{payment.propertyName}</p>
                        <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 400 }}>Room {payment.roomNo}</p>
                    </div>
                </div>

                <div className={styles.amountSection}>
                    <span className={styles.amountLabel}>Total Amount Paid</span>
                    <span className={styles.amountValue}>{formatAmount(payment.amount)}</span>
                </div>

                <div className={styles.detailsTable}>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Payment Category</span>
                        <span className={styles.detailValue}>{payment.type}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Payment Method</span>
                        <span className={styles.detailValue}>{payment.method}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Transaction Date</span>
                        <span className={styles.detailValue}>{formatDate(payment.date)}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Reference ID</span>
                        <span className={styles.detailValue}>{payment.transactionId || 'N/A'}</span>
                    </div>
                    <div className={styles.detailRow}>
                        <span className={styles.detailLabel}>Status</span>
                        <span className={styles.detailValue} style={{ color: payment.status === 'Paid' ? '#10b981' : '#f59e0b' }}>
                            {payment.status}
                        </span>
                    </div>
                </div>

                <div className={styles.infoBlock} style={{ marginBottom: '40px' }}>
                    <h4>Remarks</h4>
                    <p style={{ fontWeight: 400, fontSize: '14px', fontStyle: 'italic' }}>{payment.remarks || 'No additional remarks.'}</p>
                </div>

                <div className={styles.footer}>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>This is a computer-generated receipt and does not require a physical signature.</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', marginTop: '10px' }}>Thank you for your payment!</p>
                </div>
            </div>
        </div>
    );
}
