'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Search, Plus, Mail, Phone, Building2, MoreVertical, CheckCircle2,
    BarChart3, Filter, User, Edit3, Trash2, Eye, AlertTriangle,
    ChevronRight, MapPin, CreditCard, Briefcase,
    ShieldCheck, HeartPulse, UserPlus, Calendar, Clock, IndianRupee,
    LayoutGrid, Table, Check
} from 'lucide-react';
import styles from './page.module.css';
import { dummyHousekeepers } from './data';


export default function HousekeepersPage() {
    const router = useRouter();
    const [housekeepers, setHousekeepers] = useState(dummyHousekeepers);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingHousekeeper, setDeletingHousekeeper] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [showLayoutMenu, setShowLayoutMenu] = useState(false);
    const [displayLimit, setDisplayLimit] = useState(6);

    const filteredHousekeepers = housekeepers.filter(hk =>
        hk.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hk.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hk.assignedProperty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const visibleHousekeepers = filteredHousekeepers.slice(0, displayLimit);

    const handleEditHousekeeper = (hk) => {
        router.push(`/housekeepers/edit/${hk.id}`);
        setActiveMenuId(null);
    };


    const confirmDelete = () => {
        setHousekeepers(prev => prev.filter(hk => hk.id !== deletingHousekeeper.id));
        setShowDeleteModal(false);
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Housekeeping Staff</h1>
                    <p className={styles.subtitle}>Manage your hostel cleaning and maintenance crew.</p>
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
                    <button className={styles.addButton} onClick={() => router.push('/housekeepers/new')}>
                        <Plus size={18} />
                        <span>Add New Housekeeper</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#e0f2fe', color: '#0ea5e9' }}>
                        <Briefcase size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Total Staff</span>
                        <div className={styles.overviewValue}>{housekeepers.length}</div>
                    </div>
                </div>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#ecfdf5', color: '#10b981' }}>
                        <CheckCircle2 size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Active Now</span>
                        <div className={styles.overviewValue}>{housekeepers.filter(h => h.status === 'Active').length}</div>
                    </div>
                </div>
                <div className={styles.overviewCard}>
                    <div className={styles.overviewIcon} style={{ background: '#fff7ed', color: '#f59e0b' }}>
                        <BarChart3 size={20} />
                    </div>
                    <div>
                        <span className={styles.overviewLabel}>Avg Rating</span>
                        <div className={styles.overviewValue}>4.7/5</div>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, ID or property..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className={styles.filterButton}>
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Housekeepers Listing */}
            {/* Content Section */}
            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {visibleHousekeepers.map((hk) => (
                        <div key={hk.id} className={styles.housekeeperCard}>
                            {/* ... existing card content ... */}
                            <div className={styles.cardHeader}>
                                <div className={styles.avatarWrapper}>
                                    <div className={styles.avatarPlaceholder}>
                                        <User size={28} />
                                    </div>
                                    <div className={`${styles.statusDot} ${hk.status === 'Active' ? styles.active : styles.inactive}`} />
                                </div>
                                <div className={styles.moreWrapper}>
                                    <button className={styles.moreButton} onClick={(e) => { e.stopPropagation(); setActiveMenuId(activeMenuId === hk.id ? null : hk.id); }}>
                                        <MoreVertical size={18} />
                                    </button>
                                    {activeMenuId === hk.id && (
                                        <div className={styles.actionMenu}>
                                            <button className={styles.menuItem} onClick={() => handleEditHousekeeper(hk)}><Edit3 size={16} /> Edit Details</button>
                                            <div className={styles.menuDivider} />
                                            <button className={`${styles.menuItem} ${styles.deleteAction}`} onClick={() => { setDeletingHousekeeper(hk); setShowDeleteModal(true); setActiveMenuId(null); }}><Trash2 size={16} /> Remove Staff</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={styles.infoSection}>
                                <h3 className={styles.name}>{hk.name}</h3>
                                <div className={styles.contactInfo}>
                                    <div className={styles.contactItem}><Briefcase size={14} /> <span>{hk.employeeId} • {hk.employmentType}</span></div>
                                    <div className={styles.contactItem}><Phone size={14} /> <span>{hk.mobile}</span></div>
                                    <div className={styles.contactItem}><Mail size={14} /> <span>{hk.email}</span></div>
                                </div>
                            </div>

                            <div className={styles.propertyInfo}>
                                <div className={styles.infoLabel}><Building2 size={14} /> <span>Assigned Property</span></div>
                                <div className={styles.propertyValue}>{hk.assignedProperty}</div>
                                <div className={styles.contactItem}><Clock size={12} /> <span>{hk.shift} Shift • {hk.workingArea}</span></div>
                            </div>

                            <div className={styles.cardStats}>
                                <div className={styles.statItem}><span className={styles.statVal}>{hk.stats?.tasksCompleted || 0}</span><span className={styles.statLbl}>Tasks</span></div>
                                <div className={styles.statItem}><span className={styles.statVal}>{hk.stats?.rating || '0.0'}</span><span className={styles.statLbl}>Rating</span></div>
                                <div className={styles.statItem}><span className={styles.statVal}>{hk.stats?.attendance || '0%'}</span><span className={styles.statLbl}>Attend</span></div>
                            </div>

                            <button className={styles.viewBtn} onClick={() => router.push(`/housekeepers/${hk.id}`)}>
                                <span>View Performance</span>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Staff Member</th>
                                <th>Contact & ID</th>
                                <th>Assigned Duty</th>
                                <th>Performance</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleHousekeepers.map((hk) => (
                                <tr key={hk.id}>
                                    <td>
                                        <div className={styles.tableUserCell}>
                                            <div className={styles.tableAvatarWrapper}>
                                                <div className={styles.tableAvatarPlaceholder}>
                                                    <User size={18} />
                                                </div>
                                                <div className={`${styles.tableStatusDot} ${hk.status === 'Active' ? styles.active : styles.inactive}`} />
                                            </div>
                                            <div className={styles.tableNameInfo}>
                                                <div className={styles.tableName}>{hk.name}</div>
                                                <div className={styles.tableId}>{hk.employeeId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableContact}>
                                            <div className={styles.tableContactItem}>
                                                <Phone size={12} />
                                                {hk.mobile}
                                            </div>
                                            <div className={styles.tableContactItem}>
                                                <Mail size={12} />
                                                {hk.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableDuty}>
                                            <div className={styles.tableProperty}>{hk.assignedProperty}</div>
                                            <div className={styles.tableShift}>{hk.shift} • {hk.workingArea}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableStats}>
                                            <div className={styles.tableStatItem}>
                                                <span className={styles.tableStatLbl}>Tasks:</span>
                                                <span className={styles.tableStatVal}>{hk.stats?.tasksCompleted || 0}</span>
                                            </div>
                                            <div className={styles.tableStatItem}>
                                                <span className={styles.tableStatLbl}>Rating:</span>
                                                <span className={styles.tableStatVal}>{hk.stats?.rating || '0.0'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadgeTable} ${hk.status === 'Active' ? styles.active : styles.inactive}`}>
                                            {hk.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.tableActions}>
                                            <button className={styles.actionBtnIcon} onClick={() => router.push(`/housekeepers/${hk.id}`)} title="View Performance">
                                                <Eye size={16} />
                                            </button>
                                            <button className={styles.actionBtnIcon} onClick={() => handleEditHousekeeper(hk)} title="Edit">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className={`${styles.actionBtnIcon} ${styles.deleteActionTable}`} onClick={() => { setDeletingHousekeeper(hk); setShowDeleteModal(true); }} title="Remove">
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

            {/* Load More section */}
            {filteredHousekeepers.length > displayLimit && (
                <div className={styles.loadMoreContainer}>
                    <button
                        className={styles.loadMoreButton}
                        onClick={() => setDisplayLimit(prev => prev + 6)}
                    >
                        Load More Staff
                    </button>
                    <p className={styles.loadMoreText}>
                        Showing {visibleHousekeepers.length} of {filteredHousekeepers.length} staff members
                    </p>
                </div>
            )}


            {/* Delete Modal */}
            {showDeleteModal && (
                <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
                    <div className={styles.deleteModal} onClick={e => e.stopPropagation()}>
                        <div className={styles.warningIcon}><AlertTriangle size={36} /></div>
                        <h2>Remove Staff Member?</h2>
                        <p>Are you sure you want to remove <strong>{deletingHousekeeper?.name}</strong>? This action will deactivate their profile and cannot be undone.</p>
                        <div className={styles.modalActions}>
                            <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)}>Cancel</button>
                            <button className={styles.submitBtn} style={{ background: '#ef4444' }} onClick={confirmDelete}>Remove Staff</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
