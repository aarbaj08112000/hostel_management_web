'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import { dummyManagers } from '../data';
import styles from './page.module.css';

export default function PropertyManagerDetails() {
    const params = useParams();
    const id = parseInt(params.id);
    const manager = dummyManagers.find(m => m.id === id);

    if (!manager) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Manager not found</h2>
                <Link href="/property-managers" className={styles.backLink}>
                    <ArrowLeft size={16} /> Back to Property Managers
                </Link>
            </div>
        );
    }

    return (
        <main>
            <Header title="Property Manager Details" />
            <div className={styles.pageContainer}>
                <Link href="/property-managers" className={styles.backLink}>
                    <ArrowLeft size={18} /> Back to Property Managers
                </Link>

                <div className={styles.profileCard}>
                    <div className={styles.profileCover}>
                        <div className={styles.coverBg}></div>
                        <div className={styles.avatarContainer}>
                            {manager.image ? (
                                <img src={manager.image} alt={manager.name} className={styles.profileHeroAvatar} />
                            ) : (
                                <div className={styles.profileHeroPlaceholder}>
                                    <User size={60} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.profileHeroInfo}>
                        <h2 className={styles.heroName}>{manager.name}</h2>
                        <span className={`${styles.heroBadge} ${styles[manager.status?.toLowerCase() || 'inactive']}`}>
                            {manager.status}
                        </span>
                    </div>

                    <div className={styles.profileGrid}>
                        <div className={styles.detailCard}>
                            <h4 className={styles.detailTitle}>Personal & Contact</h4>
                            <div className={styles.contactList}>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Email:</span> <span className={styles.infoVal}>{manager.email}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Phone:</span> <span className={styles.infoVal}>{manager.phone}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>DOB:</span> <span className={styles.infoVal}>{manager.dob || 'N/A'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>City:</span> <span className={styles.infoVal}>{manager.currentCity || 'N/A'}</span></div>
                            </div>
                        </div>

                        <div className={styles.detailCard}>
                            <h4 className={styles.detailTitle}>Employment</h4>
                            <div className={styles.contactList}>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Emp ID:</span> <span className={styles.infoVal}>{manager.employeeId || 'N/A'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Role:</span> <span className={styles.infoVal}>{manager.jobRole || 'Property Manager'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Shift:</span> <span className={styles.infoVal}>{manager.workShift || 'Morning'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Joined:</span> <span className={styles.infoVal}>{manager.joiningDate || 'N/A'}</span></div>
                            </div>
                        </div>

                        <div className={styles.detailCard}>
                            <h4 className={styles.detailTitle}>Assigned Properties</h4>
                            <div className={styles.propertyTagsList}>
                                {manager.assignedProperties?.length > 0 ? (
                                    manager.assignedProperties.map((prop, i) => (
                                        <span key={i} className={styles.heroPropTag}>{prop}</span>
                                    ))
                                ) : (
                                    <span className={styles.noProp}>Unassigned</span>
                                )}
                            </div>
                        </div>

                        <div className={styles.detailCard}>
                            <h4 className={styles.detailTitle}>Emergency Contact</h4>
                            <div className={styles.contactList}>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Name:</span> <span className={styles.infoVal}>{manager.emergencyContactName || 'N/A'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Relation:</span> <span className={styles.infoVal}>{manager.emergencyRelationship || 'N/A'}</span></div>
                                <div className={styles.infoRow}><span className={styles.infoLabel}>Mobile:</span> <span className={styles.infoVal}>{manager.emergencyMobile || 'N/A'}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.analyticsSection}>
                        <h4 className={styles.detailTitle} style={{ paddingLeft: '8px' }}>Performance Analytics</h4>
                        <div className={styles.analyticsGrid}>
                            <div className={styles.analyticsBox}>
                                <span className={styles.analyticsVal}>{manager.stats?.occupancy || '0%'}</span>
                                <span className={styles.analyticsLbl}>Occupancy</span>
                            </div>
                            <div className={styles.analyticsBox}>
                                <span className={styles.analyticsVal}>{manager.stats?.resolvedTickets || '0'}</span>
                                <span className={styles.analyticsLbl}>Resolved</span>
                            </div>
                            <div className={styles.analyticsBox}>
                                <span className={styles.analyticsVal}>{manager.stats?.rating || '0.0'}</span>
                                <span className={styles.analyticsLbl}>Rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
