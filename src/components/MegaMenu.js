'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import {
    LayoutGrid, X,
    Building2, Users, UserCog, Briefcase,
    CalendarCheck, Clock, CreditCard, Receipt,
    AlertCircle, FileBarChart, PieChart,
    Settings, Shield, Bell, HardHat
} from 'lucide-react';
import styles from './MegaMenu.module.css';

const menuData = [
    {
        title: 'Core Management',
        icon: <Building2 className={styles.categoryIcon} size={18} />,
        links: [
            { label: 'Properties Dashboard', href: '/properties', icon: <Building2 size={16} /> },
            { label: 'Add New Property', href: '/properties/new', icon: <Building2 size={16} /> },
            { label: 'Room Configuration', href: '/rooms', icon: <LayoutGrid size={16} /> },
            { label: 'Property Managers', href: '/property-managers', icon: <Briefcase size={16} /> },
        ]
    },
    {
        title: 'Resident & Staff',
        icon: <Users className={styles.categoryIcon} size={18} />,
        links: [
            { label: 'Customer Management', href: '/customers', icon: <Users size={16} /> },
            { label: 'Register Resident', href: '/customers/new', icon: <UserCog size={16} /> },
            { label: 'Housekeeping Staff', href: '/housekeepers', icon: <HardHat size={16} /> },
            { label: 'Visitor Tracking', href: '/visitors', icon: <Clock size={16} /> },
        ]
    },
    {
        title: 'Operations Hub',
        icon: <CalendarCheck className={styles.categoryIcon} size={18} />,
        links: [
            { label: 'Manage Bookings', href: '/bookings', icon: <CalendarCheck size={16} /> },
            { label: 'New Booking', href: '/bookings/new', icon: <CalendarCheck size={16} /> },
            { label: 'Payment Collection', href: '/payments/new', icon: <CreditCard size={16} /> },
            { label: 'Transaction History', href: '/payments', icon: <Receipt size={16} /> },
        ]
    },
    {
        title: 'Support & Analytics',
        icon: <PieChart className={styles.categoryIcon} size={18} />,
        links: [
            { label: 'Complaints & Issues', href: '/complaints', icon: <AlertCircle size={16} /> },
            { label: 'Financial Reports', href: '/reports', icon: <FileBarChart size={16} /> },
            { label: 'System Settings', href: '/settings', icon: <Settings size={16} /> },
            { label: 'Role Management', href: '/settings', icon: <Shield size={16} /> },
        ]
    }
];

export default function MegaMenu({ isOpen, onClose, collapsed }) {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className={styles.megaMenuOverlay} onClick={onClose} />
            <div className={`${styles.megaMenu} ${collapsed ? styles.collapsed : ''}`}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <div className={styles.titleIcon}>
                            <LayoutGrid size={24} />
                        </div>
                        Admin Quick Menu
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.grid}>
                    {menuData.map((category, idx) => (
                        <div key={idx} className={styles.categoryCard}>
                            <div className={styles.categoryHeader}>
                                {category.icon}
                                <span>{category.title}</span>
                            </div>
                            <div className={styles.linksList}>
                                {category.links.map((link, lIdx) => (
                                    <Link key={lIdx} href={link.href} className={styles.linkItem} onClick={onClose}>
                                        <span className={styles.linkIcon}>{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
