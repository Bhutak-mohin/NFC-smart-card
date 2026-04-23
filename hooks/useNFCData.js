import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const DEFAULT_PROFILE = {
  name: "Your Name",
  role: "Your Profession",
  bio: "Tell the world about what you do.",
  location: "City, Country",
  email: "hello@example.com",
  phone: "+1 234 567 890",
  avatarUrl: "",
  customLinks: {
    website: "",
    portfolio: ""
  },
  socials: {
    linkedin: "",
    instagram: "",
    twitter: "",
    github: "",
    youtube: ""
  },
  socialDetails: {
    linkedin: { show: false, handle: "" },
    instagram: { show: false, handle: "" },
    twitter: { show: false, handle: "" },
    github: { show: false, handle: "" },
    youtube: { show: false, handle: "" }
  }
};

const DEFAULT_DESIGN = {
  cardColor: "#111111",
  accentColor: "#3b82f6",
  textColor: "#ffffff",
  pattern: "none",
  alignment: "left",
  layout: "standard",
  backgroundImage: "",
  template: "default",
  decorations: "none",
  fontFamily: "'Inter', sans-serif"
};

export function useNFCData() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [design, setDesign] = useState(DEFAULT_DESIGN);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage initially
  useEffect(() => {
    if (!user) {
      const savedProfile = localStorage.getItem('nfc_profile');
      const savedDesign = localStorage.getItem('nfc_design');
      
      if (savedProfile) setProfile(JSON.parse(savedProfile));
      if (savedDesign) setDesign(JSON.parse(savedDesign));
      setIsLoaded(true);
    }
  }, [user]);

  // Sync with Firestore when logged in
  useEffect(() => {
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          if (data.profile) setProfile(data.profile);
          if (data.design) setDesign(data.design);
        } else {
          // If Firestore is empty but user just logged in, 
          // we can optionally migrate localStorage data to Firestore
          const localProfile = localStorage.getItem('nfc_profile');
          const localDesign = localStorage.getItem('nfc_design');
          
          if (localProfile || localDesign) {
            setDoc(userDoc, {
              profile: localProfile ? JSON.parse(localProfile) : DEFAULT_PROFILE,
              design: localDesign ? JSON.parse(localDesign) : DEFAULT_DESIGN
            });
          }
        }
        setIsLoaded(true);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const saveProfile = async (newProfile) => {
    setProfile(newProfile);
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { profile: newProfile }, { merge: true });
    } else {
      localStorage.setItem('nfc_profile', JSON.stringify(newProfile));
    }
  };

  const saveDesign = async (newDesign) => {
    setDesign(newDesign);
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { design: newDesign }, { merge: true });
    } else {
      localStorage.setItem('nfc_design', JSON.stringify(newDesign));
    }
  };

  return { profile, design, saveProfile, saveDesign, isLoaded, user };
}

