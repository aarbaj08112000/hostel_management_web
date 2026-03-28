import Link from 'next/link';
import {
  Building2, Users, BedDouble, CalendarCheck,
  CreditCard, TrendingUp, AlertCircle, UserCheck,
  ArrowUpRight, Plus,
} from 'lucide-react';
import styles from './page.module.css';
import DashboardCharts from '../components/DashboardCharts';

const stats = [
  { label: 'Total Properties', value: '12', change: '+2 this month', icon: Building2, color: '#1E88E5', bg: 'rgba(30,136,229,0.1)', glow: 'rgba(30,136,229,0.2)' },
  { label: 'Active Customers', value: '348', change: '+24 this week', icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.1)', glow: 'rgba(16,185,129,0.2)' },
  { label: 'Rooms Available', value: '54', change: 'of 210 total', icon: BedDouble, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', glow: 'rgba(139,92,246,0.2)' },
  { label: 'Monthly Revenue', value: '₹4.2L', change: '+12% vs last', icon: TrendingUp, color: '#F57C00', bg: 'rgba(245,124,0,0.1)', glow: 'rgba(245,124,0,0.2)' },
  { label: 'Active Bookings', value: '184', change: '18 check-ins', icon: CalendarCheck, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', glow: 'rgba(6,182,212,0.2)' },
  { label: 'Pending Payments', value: '23', change: '₹1.8L total', icon: CreditCard, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', glow: 'rgba(239,68,68,0.2)' },
  { label: 'Open Complaints', value: '7', change: '3 urgent', icon: AlertCircle, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', glow: 'rgba(245,158,11,0.2)' },
  { label: 'Visitors Today', value: '31', change: '+8 vs yesterday', icon: UserCheck, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', glow: 'rgba(99,102,241,0.2)' },
];

const recentBookings = [
  { id: 'BK-1042', guest: 'Priya Sharma', property: 'Koramangala PG', room: '204A', status: 'Confirmed', date: 'Mar 5, 2026' },
  { id: 'BK-1041', guest: 'Rahul Mehta', property: 'Whitefield Hostel', room: '112B', status: 'Checked In', date: 'Mar 4, 2026' },
  { id: 'BK-1040', guest: 'Anita Rao', property: 'HSR Layout PG', room: '305C', status: 'Pending', date: 'Mar 4, 2026' },
  { id: 'BK-1039', guest: 'Karan Patel', property: 'Indiranagar Stay', room: '201A', status: 'Confirmed', date: 'Mar 3, 2026' },
];

const statusColors = {
  'Confirmed': { bg: 'rgba(16,185,129,0.1)', color: '#10b981' },
  'Checked In': { bg: 'rgba(30,136,229,0.1)', color: '#1E88E5' },
  'Pending': { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' },
  'Checked Out': { bg: 'rgba(100,116,139,0.1)', color: '#64748b' },
};

const recentPayments = [
  { id: 'PAY-0821', from: 'Infosys Ltd.', amount: '₹42,000', type: 'Corporate', date: 'Mar 5, 2026', status: 'Received' },
  { id: 'PAY-0820', from: 'Priya Sharma', amount: '₹ 8,500', type: 'Individual', date: 'Mar 4, 2026', status: 'Received' },
  { id: 'PAY-0819', from: 'TCS Group', amount: '₹65,000', type: 'Corporate', date: 'Mar 3, 2026', status: 'Pending' },
  { id: 'PAY-0818', from: 'Rahul Mehta', amount: '₹ 9,200', type: 'Individual', date: 'Mar 3, 2026', status: 'Received' },
];

export default function DashboardPage() {
  return (
    <div className={styles.page}>

      {/* Header row */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Thursday, 5 March 2026 &nbsp;·&nbsp; Welcome back, <strong>Admin</strong>!</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/bookings/new" className={styles.btnPrimary}>
            <Plus size={15} /> New Booking
          </Link>
          <Link href="/reports" className={styles.btnOutline}>
            <TrendingUp size={15} /> Reports
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <section className={styles.statsGrid}>
        {stats.map(({ label, value, change, icon: Icon, color, bg, glow }) => (
          <div key={label} className={styles.statCard} style={{ '--glow': glow }}>
            <div className={styles.statTop}>
              <div className={styles.statIcon} style={{ background: bg, color }}>
                <Icon size={20} />
              </div>
              <ArrowUpRight size={14} className={styles.statArrow} style={{ color }} />
            </div>
            <span className={styles.statValue}>{value}</span>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statChange}>{change}</span>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <DashboardCharts />

      {/* Content Grid */}
      <section className={styles.contentGrid}>

        {/* Recent Bookings */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Recent Bookings</h2>
              <p className={styles.cardSub}>Latest reservations across all properties</p>
            </div>
            <Link href="/bookings" className={styles.cardLink}>
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest</th>
                  <th>Property</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map(b => {
                  const sc = statusColors[b.status];
                  return (
                    <tr key={b.id}>
                      <td className={styles.idCell}>{b.id}</td>
                      <td className={styles.nameCell}>{b.guest}</td>
                      <td>{b.property}</td>
                      <td><span className={styles.roomBadge}>{b.room}</span></td>
                      <td className={styles.dateCell}>{b.date}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ background: sc.bg, color: sc.color }}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2 className={styles.cardTitle}>Payment Activity</h2>
              <p className={styles.cardSub}>Most recent payment transactions</p>
            </div>
            <Link href="/payments" className={styles.cardLink}>
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>From</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map(p => {
                  const sc = p.status === 'Received' ? statusColors['Confirmed'] : statusColors['Pending'];
                  return (
                    <tr key={p.id}>
                      <td className={styles.idCell}>{p.id}</td>
                      <td className={styles.nameCell}>{p.from}</td>
                      <td className={styles.amountCell}>{p.amount}</td>
                      <td><span className={styles.typeBadge}>{p.type}</span></td>
                      <td className={styles.dateCell}>{p.date}</td>
                      <td>
                        <span className={styles.statusBadge} style={{ background: sc.bg, color: sc.color }}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </div>
  );
}
