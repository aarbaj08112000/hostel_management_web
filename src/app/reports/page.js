'use client';

import {
    BarChart3, TrendingUp, DollarSign, Users,
    Home, MessageCircle, ChevronRight, FileText,
    PieChart, Activity, ShieldCheck, Download,
    Calendar, AlertTriangle, UserMinus, HardDrive
} from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';

export default function ReportsPage() {
    const categories = [
        {
            title: 'Financial Reports',
            icon: DollarSign,
            theme: styles.finance,
            reports: [
                { name: 'Monthly Collection', desc: 'Track revenue by property and room.', href: '/reports/collection' },
                { name: 'Pending Dues', desc: 'List of residents with outstanding rent.', href: '/reports/pending-dues' },
                { name: 'Expense Tracker', desc: 'Maintenance and overhead analysis.', href: '/reports/expenses' },
            ]
        },
        {
            title: 'Operations',
            icon: Home,
            theme: styles.ops,
            reports: [
                { name: 'Occupancy Analytics', desc: 'Room utilization and vacancy trends.', href: '/reports/occupancy' },
                { name: 'Room Status', desc: 'Maintenance and cleaning logs.', href: '/reports/room-status' },
                { name: 'Complaint Analysis', desc: 'Response time and resolution rates.', href: '/reports/complaints' },
            ]
        },
        {
            title: 'Resident Insights',
            icon: Users,
            theme: styles.residents,
            reports: [
                { name: 'Resident Directory', desc: 'Complete list with stay history.', href: '/reports/residents' },
                { name: 'KYC Compliance', desc: 'Document verification audit trail.', href: '/reports/kyc' },
                { name: 'Check-out Forecast', desc: 'Upcoming vacancies for next 30 days.', href: '/reports/forecast' },
            ]
        },
        {
            title: 'System Analytics',
            icon: BarChart3,
            theme: styles.analytis,
            reports: [
                { name: 'Staff Performance', desc: 'Task completion and efficiency logs.', href: '/reports/staff' },
                { name: 'Asset Management', desc: 'Furniture and electronics audit.', href: '/reports/assets' },
                { name: 'Activity Logs', desc: 'System-wide user actions track.', href: '/reports/logs' },
            ]
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Intelligence & Reports</h1>
                <p className={styles.subtitle}>Data-driven insights for smarter property management.</p>
            </div>

            <div className={styles.grid}>
                {categories.map((category, index) => (
                    <div key={index} className={styles.categoryCard}>
                        <div className={styles.categoryHeader}>
                            <div className={`${styles.iconWrapper} ${category.theme}`}>
                                <category.icon size={24} strokeWidth={2.5} />
                            </div>
                            <h2 className={styles.categoryTitle}>{category.title}</h2>
                        </div>

                        <div className={styles.reportList}>
                            {category.reports.map((report, rIndex) => (
                                <Link key={rIndex} href={report.href} className={styles.reportItem}>
                                    <div className={styles.reportInfo}>
                                        <span className={styles.reportName}>{report.name}</span>
                                        <span className={styles.reportDesc}>{report.desc}</span>
                                    </div>
                                    <ChevronRight size={14} className={styles.arrowIcon} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '48px', padding: '32px', background: 'linear-gradient(135deg, #1e88e5, #1565c0)', borderRadius: '24px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '4px' }}>Custom Data Export</h3>
                    <p style={{ opacity: 0.9, fontSize: '14px' }}>Generate a consolidated report with custom filters and date ranges.</p>
                </div>
                <button style={{ background: 'white', color: '#1e88e5', padding: '12px 24px', borderRadius: '12px', border: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <Download size={18} /> Export Master CSV
                </button>
            </div>
        </div>
    );
}
