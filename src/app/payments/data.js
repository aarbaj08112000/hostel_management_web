export const dummyPayments = [
    {
        id: 'PAY-2024-001',
        customerName: 'Rahul Sharma',
        customerId: 'CUST-101',
        propertyName: 'Sunset Heights',
        roomNo: '101',
        amount: 8500,
        status: 'Paid',
        method: 'UPI',
        date: '2024-03-01T10:30:00Z',
        type: 'Monthly Rent',
        transactionId: 'TXN-987654321',
        remarks: 'March rent paid via PhonePe'
    },
    {
        id: 'PAY-2024-002',
        customerName: 'Priya Patel',
        customerId: 'CUST-102',
        propertyName: 'Urban Living',
        roomNo: '204',
        amount: 2000,
        status: 'Pending',
        method: 'Cash',
        date: '2024-03-02T15:45:00Z',
        type: 'Security Deposit',
        transactionId: '',
        remarks: 'Partial payment received'
    },
    {
        id: 'PAY-2024-003',
        customerName: 'Amit Verma',
        customerId: 'CUST-103',
        propertyName: 'Elite Boys Hostel',
        roomNo: '305',
        amount: 8500,
        status: 'Failed',
        method: 'Card',
        date: '2024-03-03T09:15:00Z',
        type: 'Monthly Rent',
        transactionId: 'TXN-123456789',
        remarks: 'Payment declined by bank'
    },
    {
        id: 'PAY-2024-004',
        customerName: 'Sneha Reddy',
        customerId: 'CUST-104',
        propertyName: 'Sunset Heights',
        roomNo: '102',
        amount: 500,
        status: 'Paid',
        method: 'UPI',
        date: '2024-03-04T12:00:00Z',
        type: 'Electricity Bill',
        transactionId: 'TXN-456789012',
        remarks: 'Late fee included'
    },
    {
        id: 'PAY-2024-005',
        customerName: 'Vikram Singh',
        customerId: 'CUST-105',
        propertyName: 'Urban Living',
        roomNo: '105',
        amount: 8500,
        status: 'Paid',
        method: 'Net Banking',
        date: '2024-03-05T18:20:00Z',
        type: 'Monthly Rent',
        transactionId: 'TXN-789012345',
        remarks: 'Advance payment'
    }
];

export const paymentMethods = ['UPI', 'Cash', 'Net Banking', 'Card', 'Cheque'];
export const paymentTypes = ['Monthly Rent', 'Security Deposit', 'Electricity Bill', 'Maintenance', 'Other'];
export const paymentStatuses = ['Paid', 'Pending', 'Failed', 'Refunded'];
