export const dummyComplaints = [
    {
        id: 'CMP-001',
        residentName: 'Priya Sharma',
        hostelName: 'Koramangala PG',
        roomNumber: '204A',
        issueType: 'Plumbing',
        priority: 'high',
        description: 'Leaking tap in the bathroom causing water wastage.',
        status: 'pending',
        assignedTo: 'Rajesh Kumar',
        addedDate: '2026-03-01'
    },
    {
        id: 'CMP-002',
        residentName: 'Rahul Mehta',
        hostelName: 'Whitefield Hostel',
        roomNumber: '112B',
        issueType: 'Electrical',
        priority: 'urgent',
        description: 'Main switch tripping frequently in the room.',
        status: 'in_progress',
        assignedTo: 'Suresh Pal',
        addedDate: '2026-03-03'
    },
    {
        id: 'CMP-003',
        residentName: 'Anita Rao',
        hostelName: 'HSR Layout PG',
        roomNumber: '305C',
        issueType: 'Cleaning',
        priority: 'low',
        description: 'Common area floor needs deep cleaning.',
        status: 'resolved',
        assignedTo: 'Mina Devi',
        addedDate: '2026-03-04'
    },
    {
        id: 'CMP-004',
        residentName: 'Karan Patel',
        hostelName: 'Indiranagar Stay',
        roomNumber: '201A',
        issueType: 'Internet',
        priority: 'medium',
        description: 'WiFi signal is very weak in corner rooms.',
        status: 'pending',
        assignedTo: 'IT Support',
        addedDate: '2026-03-05'
    }
];

export const complaintTypes = [
    'Plumbing', 'Electrical', 'Cleaning', 'Internet', 'Furniture', 'Appliance', 'Security', 'Other'
];

export const priorities = ['low', 'medium', 'high', 'urgent'];
export const statuses = ['pending', 'in_progress', 'resolved', 'closed'];
