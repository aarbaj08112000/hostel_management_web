'use client';

import { use } from 'react';
import BookingForm from '../../BookingForm';

export default function EditBookingPage({ params: paramsPromise }) {
    const params = use(paramsPromise);
    const { id } = params;

    // Mock existing data based on ID
    const mockData = {
        id: id,
        customerName: 'Aarbaj Mulla',
        mobile: '+91 98765 43210',
        email: 'aarbaj@example.com',
        propertyName: 'Sunset Heights',
        roomNumber: '101',
        bedNumber: 'B1',
        roomType: 'Single',
        checkIn: '2024-03-01',
        checkOut: '2024-06-01',
        guests: '1',
        purpose: 'Long Stay',
        rentAmount: '8500',
        securityDeposit: '15000',
        paymentMode: 'UPI/Online',
        paymentStatus: 'Paid',
        idProofType: 'Aadhaar Card',
        idProofNumber: '1234 5678 9012',
        bookingStatus: 'Confirmed',
        remarks: 'Recurring booking for student stay.',
        emergencyContact: {
            name: 'Sameer Mulla',
            relationship: 'Father',
            mobile: '+91 99887 76655',
            address: 'Kolhapur, Maharashtra'
        }
    };

    return (
        <BookingForm
            title={`Edit Booking: ${id}`}
            initialData={mockData}
        />
    );
}
