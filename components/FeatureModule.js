import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import styles from '../styles/FeatureModule.module.css';

export default function FeatureModule({ icon: Icon, title, description, details, reverse = false, delay = 0, visualType }) {
  return (
    <section className={`${styles.module} ${reverse ? styles.reverse : ''}`}>
      <div className={`${styles.container} container`}>
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay }}
          className={styles.content}
        >
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} />
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          
          <ul className={styles.detailsList}>
            {details.map((detail, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: delay + (index * 0.1) }}
                className={styles.detailItem}
              >
                <div className={styles.checkWrapper}>
                  <Check size={14} />
                </div>
                <span>{detail}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: reverse ? -50 : 50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.2 }}
          className={styles.visual}
        >
          {visualType === 'cards' ? (
            <div className={styles.visualBoxCards}>
              <div className={styles.glow} />
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={styles.paperCard}
                  animate={{
                    y: [0, -10 + i * 5, 0],
                    rotate: [-5 + i * 15, -8 + i * 15, -5 + i * 15]
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                  style={{ zIndex: 3 - i }}
                >
                  <div className={styles.paperLine} style={{ width: '40%' }}></div>
                  <div className={styles.paperLine} style={{ width: '80%' }}></div>
                  <div className={styles.paperLine} style={{ width: '60%' }}></div>
                </motion.div>
              ))}
            </div>
          ) : visualType === 'phone' ? (
            <div className={styles.visualBoxPhone}>
              <div className={styles.glowPhone} />
              <motion.div
                className={styles.digitalCard}
                animate={{
                  y: [0, -15, 0],
                  rotateY: [-5, 5, -5]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className={styles.digitalHeader}></div>
                <div className={styles.digitalAvatar}></div>
                <div className={styles.digitalLines}>
                  <div className={styles.digitalLine} style={{ width: '60%' }}></div>
                  <div className={styles.digitalLine} style={{ width: '40%' }}></div>
                </div>
                <Zap className={styles.digitalZapIcon} size={32} />
              </motion.div>
            </div>
          ) : (
            <div className={styles.visualBox}>
              <div className={styles.glow} />
              <Icon size={80} className={styles.visualIcon} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
