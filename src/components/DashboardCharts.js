import styles from './DashboardCharts.module.css';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';

export default function DashboardCharts() {
    // Dummy data for Revenue (Bar Chart)
    const revenueData = [
        { month: 'Jan', revenue: 65, expense: 45 },
        { month: 'Feb', revenue: 72, expense: 50 },
        { month: 'Mar', revenue: 68, expense: 48 },
        { month: 'Apr', revenue: 85, expense: 55 },
        { month: 'May', revenue: 95, expense: 60 },
        { month: 'Jun', revenue: 88, expense: 58 },
        { month: 'Jul', revenue: 105, expense: 65 },
        { month: 'Aug', revenue: 110, expense: 70 },
        { month: 'Sep', revenue: 100, expense: 65 },
    ];

    const maxVal = 120; // Max Y-axis scale

    return (
        <div className={styles.chartsGrid}>
            {/* Revenue Overview Chart */}
            <div className={styles.chartCard}>
                <div className={styles.cardHeader}>
                    <div>
                        <h3 className={styles.cardTitle}>Financial Overview</h3>
                        <p className={styles.cardSubtitle}>Revenue vs Expenses (last 9 months)</p>
                    </div>
                    <button className={styles.iconButton}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <div className={styles.chartSummary}>
                    <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>
                            <span className={styles.dot} style={{ background: '#1E88E5' }}></span>
                            Revenue
                        </div>
                        <div className={styles.summaryValue}>
                            ₹8.4L
                            <span className={styles.trendUp}><ArrowUpRight size={14} /> 12%</span>
                        </div>
                    </div>
                    <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>
                            <span className={styles.dot} style={{ background: '#94a3b8' }}></span>
                            Expenses
                        </div>
                        <div className={styles.summaryValue}>
                            ₹4.8L
                            <span className={styles.trendDown}><ArrowDownRight size={14} /> 3%</span>
                        </div>
                    </div>
                </div>

                <div className={styles.barChart}>
                    <div className={styles.yAxis}>
                        <span>120k</span>
                        <span>80k</span>
                        <span>40k</span>
                        <span>0</span>
                    </div>
                    <div className={styles.chartArea}>
                        {revenueData.map((d, i) => (
                            <div key={i} className={styles.barGroup}>
                                <div className={styles.bars}>
                                    <div
                                        className={styles.bar}
                                        style={{ height: `${(d.revenue / maxVal) * 100}%`, background: 'linear-gradient(to top, #1E88E5, #42A5F5)' }}
                                    ></div>
                                    <div
                                        className={styles.bar}
                                        style={{ height: `${(d.expense / maxVal) * 100}%`, background: '#cbd5e1' }}
                                    ></div>
                                </div>
                                <span className={styles.xAxisLabel}>{d.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Occupancy Stats */}
            <div className={styles.chartCard}>
                <div className={styles.cardHeader}>
                    <div>
                        <h3 className={styles.cardTitle}>Room Occupancy</h3>
                        <p className={styles.cardSubtitle}>Current filling rate across properties</p>
                    </div>
                    <button className={styles.iconButton}>
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                <div className={styles.donutContainer}>
                    <svg viewBox="0 0 36 36" className={styles.donutChart}>
                        {/* Background Ring */}
                        <path
                            className={styles.donutBg}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        {/* Foreground Ring (78%) */}
                        <path
                            className={styles.donutFill}
                            strokeDasharray="78, 100"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="20.5" className={styles.donutText}>78%</text>
                    </svg>
                </div>

                <div className={styles.occupancyLegend}>
                    <div className={styles.legendRow}>
                        <span className={styles.legendLabel}>
                            <span className={styles.dot} style={{ background: '#10b981' }}></span>
                            Occupied (156)
                        </span>
                        <span className={styles.legendPercent}>78%</span>
                    </div>
                    <div className={styles.legendRow}>
                        <span className={styles.legendLabel}>
                            <span className={styles.dot} style={{ background: '#f59e0b' }}></span>
                            Maintenance (14)
                        </span>
                        <span className={styles.legendPercent}>7%</span>
                    </div>
                    <div className={styles.legendRow}>
                        <span className={styles.legendLabel}>
                            <span className={styles.dot} style={{ background: '#e2e8f0' }}></span>
                            Available (40)
                        </span>
                        <span className={styles.legendPercent}>15%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
