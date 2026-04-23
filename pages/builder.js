import { useState, useEffect } from 'react';
import { useNFCData } from '@/hooks/useNFCData';
import CardPreview from '@/components/CardPreview';
import * as Icons from 'lucide-react';
import styles from '@/styles/Builder.module.css';
import { TEMPLATES } from '@/lib/templates';

const SafeIcon = ({ name, size = 18 }) => {
  const IconComponent = Icons[name];
  if (!IconComponent) return <div style={{width: size, height: size, background: 'hsla(var(--primary), 0.1)', borderRadius: '4px', display: 'inline-block'}} />;
  return <IconComponent size={size} />;
};

export default function Builder() {
  const { profile, design, saveProfile, saveDesign, isLoaded, user } = useNFCData();
  const [formData, setFormData] = useState(null);
  const [formDesign, setFormDesign] = useState(null);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && profile && design) {
      setFormData(profile);
      setFormDesign(design);
    }
  }, [isLoaded, profile, design]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name.includes('.')) {
      const parts = name.split('.');
      setFormData(prev => {
        const newData = { ...prev };
        let current = newData;
        for (let i = 0; i < parts.length - 1; i++) {
          current[parts[i]] = { ...current[parts[i]] };
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = val;
        return newData;
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: val }));
    }
  };

  const handleDesignChange = (e) => {
    const { name, value } = e.target;
    setFormDesign(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    saveProfile(formData);
    saveDesign(formDesign);
    alert("Profile and Design saved! Tap the NFC card to see the result.");
  };

  if (!isLoaded || !formData || !formDesign) return <div className="container" style={{paddingTop: '120px'}}>Loading...</div>;

  return (
    <div className={styles.builderPage}>
      <div className="container">
        <h1 className={styles.pageTitle}>Create Your <span className="gradient-text">Digital Profile</span></h1>
        
        <div className={styles.layout}>
          {/* Form Side */}
          <div className={styles.formContainer}>
            <div className={styles.section}>
              <h3><SafeIcon name="User" /> Basic Information</h3>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className={styles.inputGroup}>
                <label>Professional Role</label>
                <input name="role" value={formData.role} onChange={handleChange} placeholder="Software Engineer" />
              </div>
              <div className={styles.inputGroup}>
                <label>Location</label>
                <input name="location" value={formData.location} onChange={handleChange} placeholder="New York, NY" />
              </div>
            </div>

            <div className={styles.section}>
              <h3><SafeIcon name="Image" /> Profile Media</h3>
              <div className={styles.inputGroup}>
                <label>Avatar Image URL</label>
                <input name="avatarUrl" value={formData.avatarUrl || ''} onChange={handleChange} placeholder="https://example.com/my-photo.jpg" />
              </div>
            </div>

            <div className={styles.section}>
              <h3><SafeIcon name="FileText" /> Bio</h3>
              <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} />
            </div>

            <div className={styles.section}>
              <h3><SafeIcon name="Share2" /> Social Links</h3>
              <div className={styles.grid}>
                {[
                  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', placeholder: 'linkedin.com/in/...' },
                  { id: 'instagram', label: 'Instagram', icon: 'Instagram', placeholder: '@username' },
                  { id: 'twitter', label: 'Twitter (X)', icon: 'Twitter', placeholder: 'twitter.com/...' },
                  { id: 'github', label: 'GitHub', icon: 'Github', placeholder: 'github.com/...' },
                  { id: 'youtube', label: 'YouTube', icon: 'Youtube', placeholder: 'youtube.com/@...' }
                ].map((social) => (
                  <div key={social.id} style={{ 
                    background: 'hsla(var(--foreground), 0.03)', 
                    padding: '1rem', 
                    borderRadius: '12px',
                    border: '1px solid hsla(var(--foreground), 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div className={styles.inputGroup}>
                      <label>{social.label} Link</label>
                      <input
                        name={`socials.${social.id}`}
                        value={formData.socials?.[social.id] || ''}
                        onChange={handleChange}
                        placeholder={social.placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <h3><SafeIcon name="Link2" /> Custom Links</h3>
              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Personal Website</label>
                  <input name="customLinks.website" value={formData.customLinks?.website || ''} onChange={handleChange} placeholder="https://mywebsite.com" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Portfolio</label>
                  <input name="customLinks.portfolio" value={formData.customLinks?.portfolio || ''} onChange={handleChange} placeholder="https://behance.net/..." />
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3><SafeIcon name="Palette" /> Card Design</h3>
              
              <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
                <label>Choose Template Base</label>
                <div className={styles.templateGrid} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '10px' }}>
                  {Object.values(TEMPLATES).map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setFormDesign(prev => ({
                          ...prev,
                          template: t.id,
                          cardColor: t.cardColor,
                          textColor: t.textColor,
                          accentColor: t.accentColor,
                          fontFamily: t.fontFamily,
                          alignment: t.alignment,
                          decorations: t.decorations
                        }));
                      }}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        background: formDesign.template === t.id ? 'hsla(var(--primary), 0.15)' : 'hsla(var(--foreground), 0.03)',
                        border: formDesign.template === t.id ? '2px solid hsl(var(--primary))' : '1px solid hsla(var(--foreground), 0.1)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontWeight: '600', fontSize: '0.9rem', color: formDesign.template === t.id ? 'hsl(var(--primary))' : 'inherit' }}>{t.name}</div>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.cardColor, border: '1px solid hsla(var(--foreground), 0.1)' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.textColor }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.accentColor }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.grid}>
                <div className={styles.inputGroup}>
                  <label>Background Color</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="color" name="cardColor" value={formDesign.cardColor} onChange={handleDesignChange} style={{ padding: '0', cursor: 'pointer', height: '40px', width: '40px', borderRadius: '8px' }} />
                    <input name="cardColor" value={formDesign.cardColor} onChange={handleDesignChange} style={{ flex: 1 }} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Accent Color</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="color" name="accentColor" value={formDesign.accentColor} onChange={handleDesignChange} style={{ padding: '0', cursor: 'pointer', height: '40px', width: '40px', borderRadius: '8px' }} />
                    <input name="accentColor" value={formDesign.accentColor} onChange={handleDesignChange} style={{ flex: 1 }} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Text Color</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="color" name="textColor" value={formDesign.textColor} onChange={handleDesignChange} style={{ padding: '0', cursor: 'pointer', height: '40px', width: '40px', borderRadius: '8px' }} />
                    <input name="textColor" value={formDesign.textColor} onChange={handleDesignChange} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
            </div>

            {user ? (
              <div className={styles.section}>
                <h3><SafeIcon name="Link" /> Public Profile Link</h3>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    readOnly 
                    value={`${baseUrl}/profile/${user.uid}`} 
                    style={{ 
                      flex: 1, 
                      padding: '0.8rem',
                      background: 'hsla(var(--foreground), 0.05)',
                      border: '1px solid hsla(var(--foreground), 0.1)',
                      borderRadius: '8px',
                      color: 'hsl(var(--primary))',
                      fontWeight: '500',
                      fontFamily: 'monospace'
                    }} 
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${baseUrl}/profile/${user.uid}`);
                      alert('Link copied to clipboard!');
                    }} 
                    style={{ 
                      padding: '0.8rem', 
                      background: 'hsl(var(--primary))', 
                      color: 'white',
                      cursor: 'pointer', 
                      borderRadius: '8px',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Copy Link"
                  >
                    <SafeIcon name="Copy" />
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.section}>
                <h3><SafeIcon name="Link" /> Public Profile Link</h3>
                <p style={{ fontSize: '0.9rem', color: 'hsl(var(--muted-foreground))' }}>
                  Please log in to claim your unique public profile link for your NFC card.
                </p>
              </div>
            )}

            <button className={styles.saveBtn} onClick={handleSave}>
              <SafeIcon name="Save" /> Save Profile
            </button>
          </div>

          {/* Preview Side */}
          <div className={styles.previewContainer}>
            <div className={styles.sticky}>
              <h3>Live Card Preview</h3>
              <CardPreview profile={formData} design={formDesign} />
              <p className={styles.previewHint}>This is how your physical card will Look.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
