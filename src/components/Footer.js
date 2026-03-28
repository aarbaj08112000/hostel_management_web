import styles from './Footer.module.css';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className={styles.footer}>
            <span className={styles.copy}>
                &copy; {year} <strong>HostelPro Corporate Suite</strong>. All rights reserved.
            </span>
            <span className={styles.version}>Version 1.0.0</span>
        </footer>
    );
}
