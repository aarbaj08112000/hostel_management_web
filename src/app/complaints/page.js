'use client';

import { useState } from 'react';
import {
    Plus, Search, Filter, AlertCircle, Clock, CheckCircle2,
    User, Home, Info, X, Save, MessageSquare, Tag,
    MoreVertical, Trash2, Edit3, ShieldAlert,
    LayoutGrid, Table, Check, Eye
} from 'lucide-react';
import styles from './page.module.css';
import { dummyComplaints, complaintTypes, priorities } from './data';
import CustomSelect from '../../components/CustomSelect';

const initialFormData = {
    id: '',
    residentName: '',
    hostelName: '',
    roomNumber: '',
    issueType: 'Plumbing',
    priority: 'medium',
    description: '',
    status: 'pending',
    assignedTo: 'Unassigned'
};

export default function ComplaintsPage() {
    const [complaints, setComplaints] = useState(dummyComplaints);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [viewMode, setViewMode] = useState('grid');
    const [showLayoutMenu, setShowLayoutMenu] = useState(false);

    const filteredComplaints = complaints.filter(c =>
        c.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.issueType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (complaint = null) => {
        if (complaint) {
            setFormData(complaint);
            setIsEditing(true);
        } else {
            setFormData(initialFormData);
            setIsEditing(false);
        }
        setShowModal(true);
        setActiveMenuId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setComplaints(prev => prev.map(c => c.id === formData.id ? formData : c));
        } else {
            const newComplaint = {
                ...formData,
                id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
                addedDate: new Date().toISOString().split('T')[0],
                assignedTo: formData.assignedTo || 'Unassigned'
            };
            setComplaints(prev => [newComplaint, ...prev]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setComplaints(prev => prev.filter(c => c.id !== id));
        setActiveMenuId(null);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'in_progress': return <MessageSquare size={16} />;
            case 'resolved': return <CheckCircle2 size={16} />;
            case 'closed': return <ShieldAlert size={16} />;
            default: return <Info size={16} />;
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return styles.urgent;
            case 'high': return styles.high;
            case 'medium': return styles.medium;
            case 'low': return styles.low;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Maintenance & Complaints</h1>
                    <p className={styles.subtitle}>Track and resolve resident issues efficiently.</p>
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
                    <button className={styles.addButton} onClick={() => handleOpenModal()}>
                        <Plus size={18} />
                        <span>New Complaint</span>
                    </button>
                </div>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'white', padding: '12px 20px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                    <Search size={18} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search by resident name, type or ID..."
                        style={{ border: 'none', outline: 'none', flex: 1, fontSize: '14px' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Filter size={18} color="#64748b" style={{ cursor: 'pointer' }} />
                </div>
            </div>

            {/* Complaints List */}
            {viewMode === 'grid' ? (
                <div className={styles.grid}>
                    {filteredComplaints.map(complaint => (
                        <div key={complaint.id} className={styles.card}>
                            <div className={styles.cardTop}>
                                <div className={styles.residentInfo}>
                                    <h3>{complaint.residentName}</h3>
                                    <div className={styles.locationInfo}>
                                        <Home size={12} /> {complaint.hostelName} • Room {complaint.roomNumber}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span className={`${styles.statusBadge} ${styles[complaint.status]}`}>
                                        {complaint.status.replace('_', ' ')}
                                    </span>
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            className={styles.moreButton}
                                            onClick={() => setActiveMenuId(activeMenuId === complaint.id ? null : complaint.id)}
                                        >
                                            <MoreVertical size={16} />
                                        </button>
                                        {activeMenuId === complaint.id && (
                                            <div className={styles.actionMenu}>
                                                <button className={styles.menuItem} onClick={() => handleOpenModal(complaint)}>
                                                    <Edit3 size={14} /> Update Status
                                                </button>
                                                <div className={styles.menuDivider} />
                                                <button className={`${styles.menuItem} ${styles.deleteAction}`} onClick={() => handleDelete(complaint.id)}>
                                                    <Trash2 size={14} /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.issueTag}>
                                <Tag size={12} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                                {complaint.issueType}
                            </div>

                            <p className={styles.description}>{complaint.description}</p>

                            <div className={styles.cardFooter}>
                                <div className={styles.footerInfo}>
                                    <span className={styles.label}>Priority</span>
                                    <span className={styles.value}>
                                        <span className={`${styles.priorityDot} ${getPriorityColor(complaint.priority)}`}></span>
                                        {complaint.priority.toUpperCase()}
                                    </span>
                                </div>
                                <div className={styles.footerInfo} style={{ textAlign: 'right' }}>
                                    <span className={styles.label}>Assigned To</span>
                                    <span className={styles.value}><User size={14} /> {complaint.assignedTo}</span>
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
                                <th>Resident</th>
                                <th>Location</th>
                                <th>Issue Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredComplaints.map(complaint => (
                                <tr key={complaint.id}>
                                    <td>
                                        <div className={styles.tableResidentCell}>
                                            <div className={styles.tableResidentIcon}>
                                                <User size={20} />
                                            </div>
                                            <div className={styles.tableResidentInfo}>
                                                <div className={styles.tableResidentName}>{complaint.residentName}</div>
                                                <div className={styles.tableComplaintId}>{complaint.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableLocationInfo}>
                                            <div className={styles.tableHostelName}>{complaint.hostelName}</div>
                                            <div className={styles.tableRoomInfo}>Room {complaint.roomNumber}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tableIssueCell}>
                                            <div className={styles.tableIssueType}>{complaint.issueType}</div>
                                            <div className={styles.tableDescription}>{complaint.description}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.tablePriorityCell}>
                                            <span className={`${styles.priorityDot} ${getPriorityColor(complaint.priority)}`}></span>
                                            <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>{complaint.priority.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadgeTable} ${styles[complaint.status]}`}>
                                            {complaint.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.tableActions}>
                                            <button
                                                className={styles.actionBtnIcon}
                                                title="Update Status"
                                                onClick={() => handleOpenModal(complaint)}
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                className={`${styles.actionBtnIcon} ${styles.deleteBtnIcon}`}
                                                title="Delete"
                                                onClick={() => handleDelete(complaint.id)}
                                            >
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

            {/* New Complaint Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{isEditing ? 'Update Complaint Status' : 'Register New Complaint'}</h2>
                            <button className={styles.closeBtn} onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formScroll}>
                                {isEditing && (
                                    <div style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                        <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700', marginBottom: '4px' }}>COMPLAINT ID</div>
                                        <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{formData.id}</div>
                                    </div>
                                )}

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Resident Name *</label>
                                        <input type="text" name="residentName" value={formData.residentName} onChange={handleInputChange} required placeholder="e.g. Priya Sharma" disabled={isEditing} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Issue Type</label>
                                        <CustomSelect name="issueType" value={formData.issueType} onChange={handleInputChange} options={complaintTypes} disabled={isEditing} />
                                    </div>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Hostel Name</label>
                                        <input type="text" name="hostelName" value={formData.hostelName} onChange={handleInputChange} placeholder="e.g. Koramangala PG" disabled={isEditing} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Room Number</label>
                                        <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleInputChange} placeholder="e.g. 101A" disabled={isEditing} />
                                    </div>
                                </div>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label>Priority Level</label>
                                        <CustomSelect name="priority" value={formData.priority} onChange={handleInputChange} options={priorities.map(p => ({ value: p, label: p.toUpperCase() }))} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Current Status</label>
                                        <CustomSelect name="status" value={formData.status} onChange={handleInputChange} options={[
                                            { value: 'pending', label: 'Pending' },
                                            { value: 'in_progress', label: 'In Progress' },
                                            { value: 'resolved', label: 'Resolved' },
                                            { value: 'closed', label: 'Closed' }
                                        ]} />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Assigned To</label>
                                    <input type="text" name="assignedTo" value={formData.assignedTo} onChange={handleInputChange} placeholder="Worker name or Staff ID" />
                                </div>

                                <div className={styles.formGroup}>
                                    <label>Problem Description *</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        placeholder="Briefly describe the issue..."
                                        disabled={isEditing}
                                    ></textarea>
                                </div>
                            </div>

                            <div className={styles.modalActions}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className={styles.submitBtn}>
                                    <Save size={18} /> {isEditing ? 'Update Status' : 'Submit Complaint'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
