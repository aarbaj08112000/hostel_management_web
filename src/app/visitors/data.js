export const dummyVisitors = [
    {
        id: 'VIS-001',
        name: 'Rahul Sharma',
        mobile: '9876543210',
        purpose: 'Meeting Resident',
        residentName: 'Aman Verma',
        propertyName: 'Sunset Heights',
        inTime: '2023-11-20T10:30:00',
        outTime: '2023-11-20T11:45:00',
        idProofType: 'Aadhaar',
        idProofNumber: 'XXXX-XXXX-9012',
        status: 'Checked-out'
    },
    {
        id: 'VIS-002',
        name: 'Suresh Patel',
        mobile: '9123456789',
        purpose: 'Maintenance (Plumbing)',
        residentName: 'N/A',
        propertyName: 'Urban Living',
        inTime: '2023-11-22T09:15:00',
        outTime: null,
        idProofType: 'PAN',
        idProofNumber: 'ABCDE1234F',
        status: 'Checked-in'
    },
    {
        id: 'VIS-003',
        name: 'Priya Mehta',
        mobile: '9988776655',
        purpose: 'Room Inquiry',
        residentName: 'N/A',
        propertyName: 'Sunset Heights',
        inTime: '2023-11-23T14:00:00',
        outTime: '2023-11-23T14:30:00',
        idProofType: 'Driving License',
        idProofNumber: 'DL-12345678',
        status: 'Checked-out'
    },
    {
        id: 'VIS-004',
        name: 'Amit Singh',
        mobile: '9876001122',
        purpose: 'Meeting Resident',
        residentName: 'Priya Das',
        propertyName: 'Urban Living',
        inTime: '2023-11-24T18:20:00',
        outTime: null,
        idProofType: 'Aadhaar',
        idProofNumber: 'XXXX-XXXX-1122',
        status: 'Checked-in'
    }
];

export const visitorPurposes = [
    'Meeting Resident',
    'Maintenance',
    'Room Inquiry',
    'Delivery',
    'Official Visit',
    'Other'
];
