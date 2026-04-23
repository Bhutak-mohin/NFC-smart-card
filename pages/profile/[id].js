import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import { 
  Instagram, Linkedin, Twitter, Github, Youtube,
  Mail, Phone, Download, MapPin, ExternalLink, Loader2, Globe, Briefcase
} from 'lucide-react';
import styles from '@/styles/Profile.module.css';
import hStyles from '@/styles/Hero.module.css';

export default function PublicProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const userDoc = doc(db, 'users', id);
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile(data.profile);
          setDesign(data.design);
        } else {
          setError("Profile not found.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.profilePage} style={{ justifyContent: 'center', minHeight: '100vh' }}>
        <Loader2 className="animate-spin" size={48} style={{ color: 'hsl(var(--primary))' }} />
      </div>
    );
  }

  if (error || !profile || !design) {
    const isPermissionError = error?.includes('permission-denied') || error?.includes('insufficient permissions');

    return (
      <div className={styles.profilePage} style={{ justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '1rem' }}>{isPermissionError ? "🔒 Privacy Protection" : (error || "Profile not found.")}</h2>
          <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>
            {isPermissionError 
              ? "This profile exists but public access is restricted. Please ensure your Firestore Rules allow public reading of the 'users' collection." 
              : "The NFC tag might not be properly configured, or the user ID is invalid."}
          </p>
          {isPermissionError && (
            <div style={{ 
              marginTop: '2rem', padding: '1rem', 
              background: 'hsla(var(--foreground), 0.05)', 
              borderRadius: '12px', textAlign: 'left', 
              fontSize: '0.8rem', border: '1px solid hsla(var(--foreground), 0.1)' 
            }}>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>How to fix this (for Admin):</p>
              <code style={{ display: 'block', background: '#000', padding: '8px', borderRadius: '4px', color: '#10b981' }}>
                match /users/&#123;userId&#125; &#123;<br/>
                &nbsp;&nbsp;allow read: if true;<br/>
                &#125;
              </code>
            </div>
          )}
          <a href="/" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.75rem 1.5rem', background: 'hsl(var(--primary))', color: 'white', borderRadius: '8px', fontWeight: '500', textDecoration: 'none' }}>
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const { pattern, alignment, backgroundImage, template, decorations, fontFamily } = design;
  const patternClass = pattern && pattern !== 'none' ? hStyles[`pattern${pattern.charAt(0).toUpperCase() + pattern.slice(1)}`] : '';
  const alignmentClass = alignment ? hStyles[`align${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`] : hStyles.alignLeft;
  const templateClass = template ? hStyles[`template${template.charAt(0).toUpperCase() + template.slice(1)}`] : '';
  const decorationClass = decorations && decorations !== 'none' ? hStyles[`decoration${decorations.charAt(0).toUpperCase() + decorations.slice(1)}`] : '';

  const socialLinks = [
    { id: 'linkedin', Icon: Linkedin, label: 'LinkedIn', color: '#0077b5', href: profile?.socials?.linkedin },
    { id: 'instagram', Icon: Instagram, label: 'Instagram', color: '#e4405f', href: profile?.socials?.instagram },
    { id: 'twitter', Icon: Twitter, label: 'Twitter', color: '#1da1f2', href: profile?.socials?.twitter },
    { id: 'github', Icon: Github, label: 'GitHub', color: '#333', href: profile?.socials?.github },
    { id: 'youtube', Icon: Youtube, label: 'YouTube', color: '#ff0000', href: profile?.socials?.youtube }
  ]
    .filter(link => link.href)
    .map(link => ({
      ...link,
      displayName: profile?.socialDetails?.[link.id]?.handle || link.label
    }));

  // VCard generation function for "Save Contact" functionality
  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;${profile.name};;;\nFN:${profile.name}\nTITLE:${profile.role}\nNOTE:${profile.bio}\nTEL;TYPE=WORK,VOICE:${profile.phone || ''}\nEMAIL;TYPE=WORK:${profile.email || ''}\nURL:${window.location.href}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(/\s+/g, '_')}_contact.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.profilePage} style={{ paddingTop: '40px' }}>
      
      {/* Marketing Header specifically for the profile link */}
      <a href="/" target="_blank" rel="noopener noreferrer" style={{
        position: 'fixed', top: 0, left: 0, right: 0, 
        background: 'hsla(var(--foreground), 0.05)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid hsla(var(--foreground), 0.1)',
        color: 'hsl(var(--foreground))', 
        textAlign: 'center', padding: '12px', 
        fontSize: '0.9rem', zIndex: 100, 
        textDecoration: 'none', display: 'flex', 
        justifyContent: 'center', alignItems: 'center', gap: '8px',
        transition: 'background 0.2s'
      }} onMouseOver={(e) => e.currentTarget.style.background = 'hsla(var(--foreground), 0.08)'} onMouseOut={(e) => e.currentTarget.style.background = 'hsla(var(--foreground), 0.05)'}>
        <span>Want a digital profile like this?</span>
        <span style={{ fontWeight: 'bold', color: 'hsl(var(--primary))' }}>Get your own now &rarr;</span>
      </a>


      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`${styles.card} glass-card ${patternClass} ${alignmentClass} ${templateClass} ${decorationClass}`}
          style={{ 
            backgroundColor: design.cardColor, 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: backgroundImage ? 'overlay' : 'normal',
            borderColor: design.accentColor + '44',
            color: design.textColor,
            boxShadow: `0 20px 40px -10px ${design.accentColor}33`,
            position: 'relative',
            overflow: 'hidden',
            fontFamily: fontFamily || 'inherit'
          }}
        >
          {/* Accent header bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '6px',
            background: `linear-gradient(90deg, transparent, ${design.accentColor}, transparent)`
          }}></div>

          <div className={styles.header}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar} style={{ 
                background: `linear-gradient(135deg, ${design.accentColor}, ${design.accentColor}88)`,
                boxShadow: `0 10px 20px -5px ${design.accentColor}aa`
              }}>
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <div className={styles.mockAvatar} style={{ color: design.accentColor }}>
                    {profile.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
            </div>
            <h1 className={styles.name} style={{ fontFamily: fontFamily || 'inherit' }}>{profile.name}</h1>
            <p className={styles.role} style={{ color: design.textColor + 'aa' }}>{profile.role}</p>



            {profile.location && (
              <div className={styles.location} style={{ color: design.textColor + '88', marginTop: '1rem' }}>
                <MapPin size={14} />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          <div className={styles.bio} style={{ color: design.textColor }}>
            {profile.bio}
          </div>

          {((profile.customLinks?.website) || (profile.customLinks?.portfolio)) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '0 2rem 1.5rem', marginTop: '-0.5rem' }}>
              {profile.customLinks?.website && (
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.customLinks.website.startsWith('http') ? profile.customLinks.website : `https://${profile.customLinks.website}`} 
                  target="_blank" rel="noopener noreferrer" 
                  style={{ background: design.accentColor + '11', color: design.textColor, border: `1px solid ${design.accentColor}55`, padding: '0.8rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '500', textDecoration: 'none' }}
                >
                  <Globe size={18} color={design.accentColor} />
                  Personal Website
                </motion.a>
              )}
              {profile.customLinks?.portfolio && (
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={profile.customLinks.portfolio.startsWith('http') ? profile.customLinks.portfolio : `https://${profile.customLinks.portfolio}`} 
                  target="_blank" rel="noopener noreferrer" 
                  style={{ background: design.accentColor + '11', color: design.textColor, border: `1px solid ${design.accentColor}55`, padding: '0.8rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '500', textDecoration: 'none' }}
                >
                  <Briefcase size={18} color={design.accentColor} />
                  Portfolio
                </motion.a>
              )}
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.mainAction} style={{ background: design.accentColor }} onClick={handleSaveContact}>
              <Download size={18} />
              Save Contact
            </button>
            <div className={styles.subActions}>
              {(profile.email) && (
                <a href={`mailto:${profile.email}`} className={styles.iconAction} style={{ color: design.textColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Mail size={20} />
                </a>
              )}
              {(profile.phone) && (
                <a href={`tel:${profile.phone}`} className={styles.iconAction} style={{ color: design.textColor, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Phone size={20} />
                </a>
              )}
            </div>
          </div>

          {socialLinks.length > 0 && (
            <div className={styles.socialGrid}>
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i}
                  href={social.href.startsWith('http') ? social.href : `https://${social.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={styles.socialItem}
                  style={{ '--social-color': social.color }}
                >
                  <div className={styles.socialTextBlock}>
                    <span className={styles.socialPlatformLabel}>{social.label}</span>
                    <span className={styles.socialHandle}>{social.displayName}</span>
                  </div>
                  <ExternalLink size={11} className={styles.externalIcon} />
                </motion.a>
              ))}
            </div>
          )}

          <div className={styles.footer}>
            <p>Powered by NFC Smart Card</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
