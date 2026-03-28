'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    Mail, Phone, User, ArrowLeft, Building2, Briefcase,
    Calendar, MapPin, ShieldCheck, CreditCard, Clock,
    HeartPulse, UserCheck, MessageSquare, BriefcaseIcon
} from 'lucide-react';
import { dummyHousekeepers } from '../data';
import styles from './page.module.css';

export default function HousekeeperDetails() {
    const params = useParams();
    const id = parseInt(params.id);
    const hk = dummyHousekeepers.find(h => h.id === id);

    if (!hk) {
        return (
            <div className={styles.pageContainer} style={{ textAlign: 'center' }}>
                <h2>Staff member not found</h2>
                <Link href="/housekeepers" className={styles.backLink}>
                    <ArrowLeft size={16} /> Back to Housekeepers
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Link href="/housekeepers" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Housekeepers
            </Link>

            <div className={styles.profileCard}>
                <div className={styles.profileCover}>
                    <div className={styles.coverBg}></div>
                    <div className={styles.avatarContainer}>
                        <div className={styles.profileHeroPlaceholder}>
                            <User size={60} />
                        </div>
                    </div>
                </div>

                <div className={styles.profileHeroInfo}>
                    <h1 className={styles.heroName}>{hk.name}</h1>
                    <span className={`${styles.heroBadge} ${hk.status === 'Active' ? styles.active : styles.inactive}`}>
                        {hk.status}
                    </span>
                    <span className={styles.heroBadge} style={{ background: '#e0f2fe', color: '#0369a1' }}>
                        {hk.employeeId}
                    </span>
                </div>

                <div className={styles.profileGrid}>
                    {/* 1. Basic Information */}
                    <div className={styles.detailCard}>
                        <h4 className={styles.detailTitle}><User size={16} /> Basic Information</h4>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Gender:</span> <span className={styles.infoVal}>{hk.gender}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>DOB:</span> <span className={styles.infoVal}>{hk.dob || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Marital Status:</span> <span className={styles.infoVal}>{hk.maritalStatus || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Mobile:</span> <span className={styles.infoVal}>{hk.mobile}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Email:</span> <span className={styles.infoVal}>{hk.email || 'N/A'}</span></div>
                        </div>
                    </div>

                    {/* 2. Address Information */}
                    <div className={styles.detailCard}>
                        <h4 className={styles.detailTitle}><MapPin size={16} /> Address</h4>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>City:</span> <span className={styles.infoVal}>{hk.city || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>State:</span> <span className={styles.infoVal}>{hk.state || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Address:</span> <span className={styles.infoVal} style={{ maxWidth: '180px' }}>{hk.currentAddress || 'N/A'}</span></div>
                        </div>
                    </div>

                    {/* 4. Employment Details */}
                    <div className={styles.detailCard}>
                        <h4 className={styles.detailTitle}><Briefcase size={16} /> Employment</h4>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Joined:</span> <span className={styles.infoVal}>{hk.joiningDate || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Property:</span> <span className={styles.infoVal}>{hk.assignedProperty || 'Unassigned'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Shift:</span> <span className={styles.infoVal}>{hk.shift || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Type:</span> <span className={styles.infoVal}>{hk.employmentType || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Salary:</span> <span className={styles.infoVal}>₹{hk.salary || '0'}</span></div>
                        </div>
                    </div>

                    {/* 5. Bank & Emergency */}
                    <div className={styles.detailCard}>
                        <h4 className={styles.detailTitle}><CreditCard size={16} /> Financial & Emergency</h4>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Bank:</span> <span className={styles.infoVal}>{hk.bankName || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Emergency Name:</span> <span className={styles.infoVal}>{hk.emergencyName || 'N/A'}</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Emergency Contact:</span> <span className={styles.infoVal}>{hk.emergencyMobile || 'N/A'}</span></div>
                        </div>
                    </div>

                    {/* 3. Identity Documents (KYC) */}
                    <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                        <h4 className={styles.detailTitle}><ShieldCheck size={16} /> Identity & Verification</h4>
                        <div className={styles.docGrid}>
                            <div className={styles.docBox}>
                                <div className={styles.docIcon}><ShieldCheck size={24} /></div>
                                <span className={styles.docLabel}>Aadhaar Card</span>
                                <span className={styles.viewBtn}>View Doc</span>
                            </div>
                            <div className={styles.docBox}>
                                <div className={styles.docIcon}><ShieldCheck size={24} /></div>
                                <span className={styles.docLabel}>PAN Card</span>
                                <span className={styles.viewBtn}>View Doc</span>
                            </div>
                            <div className={styles.docBox}>
                                <div className={styles.docIcon}><ShieldCheck size={24} /></div>
                                <span className={styles.docLabel}>Police Verification</span>
                                <span className={styles.viewBtn}>{hk.policeVerificationStatus || 'Pending'}</span>
                            </div>
                        </div>
                    </div>

                    {/* 7. Additional Information */}
                    <div className={`${styles.detailCard} ${styles.fullWidth}`}>
                        <h4 className={styles.detailTitle}><MessageSquare size={16} /> Additional Info & Notes</h4>
                        <div className={styles.infoList}>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Work Experience:</span> <span className={styles.infoVal}>{hk.workExperience || '0'} Years</span></div>
                            <div className={styles.infoRow}><span className={styles.infoLabel}>Previous Workplace:</span> <span className={styles.infoVal}>{hk.previousWorkplace || 'N/A'}</span></div>
                            <div className={styles.infoRow} style={{ marginTop: '10px' }}>
                                <span className={styles.infoLabel}>Notes/Remarks:</span>
                                <span className={styles.infoVal} style={{ textAlign: 'left', fontStyle: 'italic', color: '#64748b' }}>
                                    {hk.notes || 'No additional remarks.'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
