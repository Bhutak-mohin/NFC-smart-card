import { motion } from 'framer-motion';
import { 
  Instagram, Linkedin, Twitter, Github, 
  Mail, Phone, Download, MapPin, ExternalLink 
} from 'lucide-react';
import styles from '@/styles/Profile.module.css';
import hStyles from '@/styles/Hero.module.css'; // For patterns
import { useNFCData } from '@/hooks/useNFCData';

export default function DemoProfile() {
  const { profile, design, isLoaded } = useNFCData();
  
  if (!isLoaded || !profile) return null;

  const { pattern } = design;
  const patternClass = pattern && pattern !== 'none' ? hStyles[`pattern${pattern.charAt(0).toUpperCase() + pattern.slice(1)}`] : '';

  const socialLinks = [
    { Icon: Linkedin, label: "LinkedIn", color: "#0077b5", href: profile?.socials?.linkedin },
    { Icon: Instagram, label: "Instagram", color: "#e4405f", href: profile?.socials?.instagram },
    { Icon: Twitter, label: "Twitter", color: "#1da1f2", href: profile?.socials?.twitter },
    { Icon: Github, label: "GitHub", color: "#333", href: profile?.socials?.github }
  ].filter(link => link.href); // Only show links that are filled

  return (
    <div className={styles.profilePage}>
      {/* Simulation Overlay */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={styles.tapNotification}
      >
        <div className={styles.tapRipple}></div>
        <span>Success! Card Tapped</span>
      </motion.div>

      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`${styles.card} glass-card ${patternClass}`}
          style={{ 
            backgroundColor: design.cardColor, 
            borderColor: design.accentColor + '44',
            color: design.textColor
          }}
        >
          <div className={styles.header}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar} style={{ background: `linear-gradient(135deg, ${design.accentColor}, #60a5fa)` }}>
                <div className={styles.mockAvatar} style={{ color: design.accentColor }}>
                  {profile?.name?.charAt(0) || 'U'}
                </div>
              </div>
            </div>
            <h1 className={styles.name}>{profile.name}</h1>
            <p className={styles.role} style={{ color: design.textColor + 'aa' }}>{profile.role}</p>
            <div className={styles.location} style={{ color: design.textColor + '88' }}>
              <MapPin size={14} />
              <span>{profile.location}</span>
            </div>
          </div>

          <div className={styles.bio} style={{ color: design.textColor }}>
            {profile.bio}
          </div>

          <div className={styles.actions}>
            <button className={styles.mainAction} style={{ background: design.accentColor }}>
              <Download size={18} />
              Save Contact
            </button>
            <div className={styles.subActions}>
              <button className={styles.iconAction} style={{ color: design.textColor }}><Mail size={20} /></button>
              <button className={styles.iconAction} style={{ color: design.textColor }}><Phone size={20} /></button>
            </div>
          </div>

          <div className={styles.socialGrid}>
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i}
                href={social.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={styles.socialItem}
                style={{ '--social-color': social.color }}
              >
                {social.Icon && <social.Icon size={24} />}
                <span>{social.label}</span>
                {ExternalLink && <ExternalLink size={12} className={styles.externalIcon} />}
              </motion.a>
            ))}
          </div>

          <div className={styles.footer}>
            <p>Created with NFC Smart Card</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
