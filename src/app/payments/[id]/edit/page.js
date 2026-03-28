'use client';

import { use } from 'react';
import PaymentForm from '../../PaymentForm';
import { dummyPayments } from '../../data';

export default function EditPaymentPage({ params }) {
    const { id } = use(params);

    // Find payment from dummy data
    const payment = dummyPayments.find(p => p.id === id);

    if (!payment) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Payment record not found</h2>
                <p>The transaction you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return <PaymentForm initialData={payment} isEdit={true} />;
}
