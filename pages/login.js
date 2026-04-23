import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import styles from '@/styles/Login.module.css';
import { LogIn, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/builder');
    }
  }, [user, router]);

  const [loginError, setLoginError] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      setLoginError(null);
    } catch (err) {
      // Capture Firebase auth errors (e.g., unauthorized-domain)
      setLoginError(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginPage}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.loginCard}
      >
        <div className={styles.iconWrapper}>
          <Globe size={32} />
        </div>
        <h1 className={styles.title}>Welcome to <span className="gradient-text">NFC Smart</span></h1>
        <p className={styles.subtitle}>Sign in to manage your digital profiles and custom designs securely in the cloud.</p>
        
        <button className={styles.googleBtn} onClick={handleGoogleLogin}>
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/stats/google.png" 
            alt="Google" 
            className={styles.googleIcon} 
          />
          <span>Sign in with Google</span>
        </button>

        {loginError && (
          <p style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center' }}>
            {loginError}
          </p>
        )}

        <p className={styles.footer}>
          By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
