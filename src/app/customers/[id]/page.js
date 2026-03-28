'use client';

import { use } from 'react';
import Link from 'next/link';
import {
    User, Phone, Mail, Home, Calendar, Clock,
    CreditCard, ShieldCheck, FileText, ArrowLeft,
    MapPin, BadgeAlert, CheckCircle2, XCircle,
    UserCircle, Briefcase, Heart, Globe
} from 'lucide-react';
import { dummyCustomers } from '../data';
import styles from './page.module.css';

export default function CustomerDetails({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const id = params.id;
    const customer = dummyCustomers.find(c => c.id === id);

    if (!customer) {
        return (
            <div className={styles.pageContainer} style={{ textAlign: 'center', paddingTop: '100px' }}>
                <XCircle size={64} color="#ef4444" style={{ marginBottom: '24px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Resident Not Found</h2>
                <p style={{ color: '#64748b', marginBottom: '32px' }}>The resident with ID "{id}" could not be located in our records.</p>
                <Link href="/customers" className={styles.backLink} style={{ justifyContent: 'center' }}>
                    <ArrowLeft size={18} /> Back to Residents
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <Link href="/customers" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Residents List
            </Link>

            <div className={styles.profileCard}>
                <div className={styles.header}>
                    <div className={styles.avatar}>
                        <UserCircle size={80} strokeWidth={1.5} />
                    </div>
                    <div className={styles.headerInfo}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <h1>{customer.name}</h1>
                            <span className={styles.statusBadge}>{customer.status}</span>
                        </div>
                        <p>
                            <span><BadgeAlert size={16} /> {customer.id}</span>
                            <span>•</span>
                            <span><Globe size={16} /> {customer.customerType}</span>
                            <span>•</span>
                            <span>Joined {new Date(customer.joiningDate).toLocaleDateString()}</span>
                        </p>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.grid}>
                        {/* 1. Personal Information */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><User size={18} /> Personal Profile</h3>
                            <div className={styles.infoList}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Gender</span>
                                    <span className={styles.value}>{customer.gender}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Date of Birth</span>
                                    <span className={styles.value}>{new Date(customer.dob).toLocaleDateString()}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Marital Status</span>
                                    <span className={styles.value}>{customer.maritalStatus}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Contact</span>
                                    <span className={styles.value}>{customer.mobile}</span>
                                </div>
                                {customer.altMobile && (
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Alt Mobile</span>
                                        <span className={styles.value}>{customer.altMobile}</span>
                                    </div>
                                )}
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.value}>{customer.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Stay & Room Details */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><Home size={18} /> Stay Information</h3>
                            <div className={styles.infoList}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Property</span>
                                    <span className={styles.value}>{customer.propertyName}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Room / Bed</span>
                                    <span className={styles.value}>Room {customer.roomNumber} / Bed {customer.bedNumber}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Joining Date</span>
                                    <span className={styles.value}>{new Date(customer.joiningDate).toLocaleDateString()}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Monthly Rent</span>
                                    <span className={styles.value} style={{ color: '#10b981' }}>₹{customer.rentAmount}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Security Deposit</span>
                                    <span className={styles.value}>₹{customer.securityDeposit}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Payment Status</span>
                                    <span className={styles.value}>{customer.paymentStatus}</span>
                                </div>
                            </div>
                        </div>

                        {/* 3. Work & Office */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><Briefcase size={18} /> Professional Details</h3>
                            {customer.officeInfo ? (
                                <div className={styles.infoList}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Company</span>
                                        <span className={styles.value}>{customer.officeInfo.company}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Designation</span>
                                        <span className={styles.value}>{customer.officeInfo.designation}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.label}>Work Contact</span>
                                        <span className={styles.value}>{customer.officeInfo.contact}</span>
                                    </div>
                                    <div className={styles.infoRow} style={{ flexDirection: 'column', gap: '4px' }}>
                                        <span className={styles.label}>Office Address</span>
                                        <span className={styles.value} style={{ textAlign: 'left' }}>{customer.officeInfo.address}</span>
                                    </div>
                                </div>
                            ) : (
                                <p style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic' }}>No professional information provided.</p>
                            )}
                        </div>

                        {/* 4. Address Details */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><MapPin size={18} /> Address Details</h3>
                            <div className={styles.infoList}>
                                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '4px' }}>
                                    <span className={styles.label} style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>CURRENT ADDRESS</span>
                                    <span className={styles.value} style={{ display: 'block', lineHeight: 1.5 }}>
                                        {customer.currentAddress.line}, {customer.currentAddress.city}, {customer.currentAddress.state} - {customer.currentAddress.pincode}
                                    </span>
                                </div>
                                <div>
                                    <span className={styles.label} style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>PERMANENT ADDRESS</span>
                                    <span className={styles.value} style={{ display: 'block', lineHeight: 1.5 }}>
                                        {customer.permanentAddress.line}, {customer.permanentAddress.city}, {customer.permanentAddress.state} - {customer.permanentAddress.pincode}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 5. Emergency Contact */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><Heart size={18} /> Emergency Contact</h3>
                            <div className={styles.infoList}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Name</span>
                                    <span className={styles.value}>{customer.emergencyContact.name}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Relationship</span>
                                    <span className={styles.value}>{customer.emergencyContact.relationship}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Mobile</span>
                                    <span className={styles.value}>{customer.emergencyContact.mobile}</span>
                                </div>
                                <div className={styles.infoRow} style={{ flexDirection: 'column', gap: '4px' }}>
                                    <span className={styles.label}>Address</span>
                                    <span className={styles.value} style={{ textAlign: 'left' }}>{customer.emergencyContact.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* 6. KYC & System Profile */}
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}><ShieldCheck size={18} /> Verification & System</h3>
                            <div className={styles.infoList}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID Proof Type</span>
                                    <span className={styles.value}>{customer.idProofType}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID Number</span>
                                    <span className={styles.value}>{customer.idProofNumber}</span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Police Verification</span>
                                    <span className={styles.value} style={{ color: customer.policeVerification === 'Verified' ? '#10b981' : '#f59e0b' }}>
                                        {customer.policeVerification}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Registered By</span>
                                    <span className={styles.value}>{customer.addedBy}</span>
                                </div>
                            </div>
                            <div className={styles.docGrid}>
                                <div className={styles.docBox}>
                                    <div className={styles.docIcon}><ShieldCheck size={16} /></div>
                                    <div className={styles.docInfo}>
                                        <span className={styles.docName}>{customer.idProofType} Scan</span>
                                    </div>
                                </div>
                                <div className={styles.docBox}>
                                    <div className={styles.docIcon}><ShieldCheck size={16} /></div>
                                    <div className={styles.docInfo}>
                                        <span className={styles.docName}>Signature Scan</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
