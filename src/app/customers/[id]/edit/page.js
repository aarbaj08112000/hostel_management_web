'use client';

import { useParams } from 'next/navigation';
import CustomerForm from '../../CustomerForm';
import { dummyCustomers } from '../../data';

export default function EditCustomerPage() {
    const params = useParams();
    const id = params.id;
    const customer = dummyCustomers.find(c => c.id === id);

    return (
        <CustomerForm
            initialData={customer}
            title={`Edit Resident: ${customer?.name || id}`}
        />
    );
}
