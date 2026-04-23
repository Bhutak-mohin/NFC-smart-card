import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <p>&copy; {new Date().getFullYear()} NFC Smart Card. All rights reserved.</p>
          <div className={styles.links}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
