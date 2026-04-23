import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CreditCard, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from '../styles/Navbar.module.css';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          <CreditCard className={styles.icon} />
          <span>NFC<span>Smart</span></span>
        </Link>

        <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/features">Features</Link>
          <Link href="/builder">Builder</Link>
          <Link href="/demo-profile" className={styles.cta}>Demo Tap</Link>
          
          {user ? (
            <div className={styles.authLinks}>
              <button onClick={logout} className={styles.logoutBtn} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginBtn}>Login</Link>
          )}
        </div>


        <button className={styles.mobileMenu} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.mobileLinks}
        >
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/features" onClick={() => setIsOpen(false)}>Features</Link>
          <Link href="/builder" onClick={() => setIsOpen(false)}>Builder</Link>
          <Link href="/demo-profile" className={styles.cta} onClick={() => setIsOpen(false)}>Demo Tap</Link>
        </motion.div>
      )}
    </nav>
  );
}
