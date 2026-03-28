'use client';

import { use } from 'react';
import VisitorForm from '../../VisitorForm';
import { dummyVisitors } from '../../data';

export default function EditVisitorPage({ params }) {
    const { id } = use(params);

    // Find visitor from dummy data
    const visitor = dummyVisitors.find(v => v.id === id);

    if (!visitor) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Visitor not found</h2>
                <p>The visitor record you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return <VisitorForm initialData={visitor} isEdit={true} />;
}
