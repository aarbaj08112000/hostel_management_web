'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AppShell({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || pathname?.startsWith('/login');

    if (isLoginPage) {
        return (
            <div className="login-shell">
                {children}
            </div>
        );
    }

    return (
        <div className="app-shell">
            <Sidebar collapsed={collapsed} onCollapseChange={setCollapsed} />
            <div className={`main-content ${collapsed ? 'sidebar-collapsed' : ''}`}>
                <Header collapsed={collapsed} onMenuToggle={() => setCollapsed(p => !p)} />
                <main className="page-body">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
