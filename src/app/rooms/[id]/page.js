'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
    ArrowLeft,
    Building2,
    BedDouble,
    MapPin,
    DollarSign,
    Users,
    Waves,
    Wind,
    Wifi,
    Bath,
    Tv,
    Coffee,
    Calendar,
    PenTool,
    User,
    ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import { dummyRooms } from '../data';
import styles from './page.module.css';

export default function RoomDetailPage() {
    const params = useParams();
    const room = dummyRooms.find(r => r.id === parseInt(params.id)) || dummyRooms[0];

    const statusClass = room.status.toLowerCase();

    // Mock occupants for demonstration
    const occupants = room.currentOccupants > 0 ? [
        { id: 101, name: 'Rahul Sharma', since: 'Jan 15, 2024', avatar: 'RS' },
        ...(room.currentOccupants > 1 ? [{ id: 102, name: 'Amit Patel', since: 'Feb 10, 2024', avatar: 'AP' }] : [])
    ] : [];

    const getAmenityIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'ac': return <Wind size={16} />;
            case 'wifi': return <Wifi size={16} />;
            case 'attached bath': return <Bath size={16} />;
            case 'tv': return <Tv size={16} />;
            case 'shared kitchen':
            case 'private kitchen': return <Coffee size={16} />;
            default: return <Waves size={16} />;
        }
    };

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh' }}>
            <Header title={`Room ${room.roomNumber} Details`} />

            <div className={styles.pageContainer}>
                <Link href="/rooms" className={styles.backLink}>
                    <ArrowLeft size={18} />
                    Back to Rooms
                </Link>

                <div className={styles.roomHero}>
                    <div className={styles.heroContent}>
                        <h1>Room {room.roomNumber}</h1>
                        <div className={styles.heroSub}>
                            <div className={styles.infoIconRow}>
                                <Building2 size={16} />
                                <span>{room.propertyName}</span>
                            </div>
                            <div className={styles.infoIconRow}>
                                <MapPin size={16} />
                                <span>{room.floor}</span>
                            </div>
                        </div>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[statusClass]}`}>
                        {room.status}
                    </span>
                </div>

                <div className={styles.mainGrid}>
                    <div className={styles.leftCol}>
                        <div className={styles.detailCard}>
                            <h2 className={styles.cardTitle}>Basic Configuration</h2>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLbl}>Room Type</span>
                                    <span className={styles.infoVal}>{room.type}</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLbl}>Total Capacity</span>
                                    <span className={styles.infoVal}>{room.capacity} Beds</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLbl}>Current Occupancy</span>
                                    <span className={styles.infoVal}>{room.currentOccupants} Beds Occupied</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.infoLbl}>Price per Month</span>
                                    <span className={styles.infoVal}>₹{room.pricePerMonth.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.detailCard}>
                            <h2 className={styles.cardTitle}>Amenities & Features</h2>
                            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>{room.description}</p>
                            <div className={styles.amenityTags}>
                                {room.amenities.map(amenity => (
                                    <div key={amenity} className={styles.amenityTag}>
                                        <div className={styles.infoIconRow}>
                                            {getAmenityIcon(amenity)}
                                            <span>{amenity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.detailCard}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h2 className={styles.cardTitle} style={{ margin: 0 }}>Current Occupants</h2>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e88e5' }}>
                                    {room.capacity - room.currentOccupants} Beds Available
                                </span>
                            </div>

                            {occupants.length > 0 ? (
                                <div className={styles.occupantsList}>
                                    {occupants.map(occ => (
                                        <div key={occ.id} className={styles.occupantItem}>
                                            <div className={styles.occupantInfo}>
                                                <div className={styles.occupantAvatar}>{occ.avatar}</div>
                                                <div>
                                                    <div className={styles.occupantName}>{occ.name}</div>
                                                    <div className={styles.occupantArrival}>Resident since {occ.since}</div>
                                                </div>
                                            </div>
                                            <button className={styles.occupantAction}>
                                                View Profile <ExternalLink size={14} style={{ marginLeft: '4px', verticalAlign: 'middle' }} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #e2e8f0' }}>
                                    <Users size={32} color="#94a3b8" style={{ marginBottom: '12px' }} />
                                    <p style={{ color: '#64748b', fontSize: '14px' }}>No current occupants in this room.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.rightCol}>
                        <div className={styles.sidebarCard}>
                            <div className={styles.priceBox}>
                                <div className={styles.priceAmount}>₹{room.pricePerMonth.toLocaleString()}</div>
                                <div className={styles.pricePeriod}>per month / per bed</div>
                            </div>

                            <div className={styles.actionStack}>
                                <button className={styles.primaryAction}>Manage Booking</button>
                                <button className={styles.secondaryAction}>Modify Details</button>
                                <button className={styles.secondaryAction} style={{ color: '#ef4444' }}>Report Issue</button>
                            </div>
                        </div>

                        <div className={styles.sidebarCard} style={{ marginTop: '24px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '16px' }}>Maintenance Logs</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '16px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-5px', top: '0', height: '8px', width: '8px', background: '#1e88e5', borderRadius: '50%' }}></div>
                                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#1e88e5' }}>Resolved</div>
                                    <div style={{ fontSize: '13px', fontWeight: '700' }}>AC Servicing</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Feb 22, 2024</div>
                                </div>
                                <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '16px', position: 'relative' }}>
                                    <div style={{ position: 'absolute', left: '-5px', top: '0', height: '8px', width: '8px', background: '#94a3b8', borderRadius: '50%' }}></div>
                                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8' }}>Past</div>
                                    <div style={{ fontSize: '13px', fontWeight: '700' }}>Deep Cleaning</div>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Jan 05, 2024</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
