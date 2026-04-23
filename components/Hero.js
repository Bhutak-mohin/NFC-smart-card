import { motion } from 'framer-motion';
import { Share2, Zap, ShieldCheck } from 'lucide-react';
import styles from '../styles/Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.content}
        >
          <span className={styles.badge}>Next-Gen Networking</span>
          <h1 className={styles.title}>
            The Last Business Card <br />
            <span className="gradient-text">You'll Ever Need</span>
          </h1>
          <p className={styles.description}>
            Instantly share your contact info, social links, and portfolio with a simple tap.
            No app required. Pure NFC magic.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Get Started</button>
            <button className={styles.secondaryBtn}>See Demo</button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Zap size={18} className={styles.statIcon} />
              <span>Instant Share</span>
            </div>
            <div className={styles.statItem}>
              <Share2 size={18} className={styles.statIcon} />
              <span>Eco Friendly</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.visual}
        >
          <div className={styles.cardContainer}>
            {/* Animated Smart Card */}
            <motion.div
              animate={{
                rotateY: [0, 10, 0, -10, 0],
                rotateX: [0, 5, 0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
              }}
              className={styles.nfcCard}
            >
              <div className={styles.cardGlow}></div>
              <div className={styles.cardContent}>
                <div className={styles.cardTop}>
                  <div className={styles.chip}></div>
                  <Zap className={styles.nfcIcon} />
                </div>
                <div className={styles.cardBottom}>
                  <div className={styles.cardName}>MOHIN UNIVERSAL</div>
                  <div className={styles.cardRole}>NFC SMART CARD</div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className={`${styles.floating} ${styles.f1}`}
            >
              <ShieldCheck size={20} />
              <span>Secure</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
