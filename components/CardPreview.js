import { motion } from 'framer-motion';
import styles from '../styles/Hero.module.css'; // Reusing card styles for preview
import pStyles from '../styles/Profile.module.css';
import { Zap } from 'lucide-react';

// Help debug icon loading
const SafeZap = (props) => {
  try {
    return Zap ? <Zap {...props} /> : null;
  } catch (e) {
    return null;
  }
};

export default function CardPreview({ profile, design }) {
  if (!profile || !design) return null;
  
  const { cardColor, accentColor, textColor, pattern, alignment, layout, backgroundImage, template, decorations, fontFamily } = design;

  // Resolve dynamic classes
  const patternClass = pattern && pattern !== 'none' ? styles[`pattern${pattern.charAt(0).toUpperCase() + pattern.slice(1)}`] : '';
  const alignmentClass = alignment ? styles[`align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`] : styles.alignLeft;
  const layoutClass = layout ? styles[`layout${layout.charAt(0).toUpperCase() + layout.slice(1)}`] : '';
  const templateClass = template ? styles[`template${template.charAt(0).toUpperCase() + template.slice(1)}`] : '';
  const decorationClass = decorations ? styles[`decoration${decorations.charAt(0).toUpperCase() + decorations.slice(1)}`] : '';

  return (
    <div className={pStyles.previewWrapper}>
      <motion.div 
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, 2, 0, -2, 0],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className={`${styles.nfcCard} ${patternClass} ${layoutClass} ${templateClass} ${decorationClass}`}
        style={{ 
          backgroundColor: cardColor, 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: backgroundImage ? 'overlay' : 'normal',
          borderColor: accentColor + '44',
          color: textColor,
          fontFamily: fontFamily || 'inherit'
        }}
      >
        <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at center, ${accentColor}22 0%, transparent 60%)` }}></div>
        <div className={styles.cardContent}>
          <div className={`${styles.cardTop} ${alignmentClass}`}>
            <div className={styles.chip}></div>
            <SafeZap className={styles.nfcIcon} style={{ color: accentColor }} />
          </div>
          <div className={`${styles.cardBottom} ${alignmentClass}`}>
            <div className={styles.cardName} style={{ color: textColor, fontFamily: fontFamily }}>{profile?.name || "YOUR NAME"}</div>
            <div className={styles.cardRole} style={{ color: textColor + 'aa' }}>{profile?.role || "PROFESSION"}</div>
            
            {/* Template Specific Profile Pic (e.g. for Fashion template) */}
            {decorations === 'fashion' && profile?.avatarUrl && (
              <div style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '24px', 
                overflow: 'hidden',
                border: `3px solid ${accentColor}`,
                marginTop: '1rem',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}>
                <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            
            {/* Social Handles on Card */}
            <div style={{ 
              marginTop: '1rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '6px',
              fontSize: '0.8rem',
              opacity: 0.9,
              textAlign: alignment === 'center' ? 'center' : (alignment === 'right' ? 'right' : 'left'),
              alignItems: alignment === 'center' ? 'center' : (alignment === 'right' ? 'flex-end' : 'flex-start')
            }}>
              {Object.entries(profile?.socialDetails || {}).map(([id, details]) => {
                if (!details?.show || !details?.handle) return null;
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ opacity: 0.7 }}>
                      {/* Using simple text labels if icons aren't imported, but Lucide icons would be better */}
                      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{id}:</span>
                    </div>
                    <span>{details.handle}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
