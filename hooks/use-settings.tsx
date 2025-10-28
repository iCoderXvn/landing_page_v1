"use client";

import { useState, useEffect } from 'react';

export interface PublicSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  twitterUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  youtubeUrl: string;
  telegramUrl: string;
  postsPerPage: number;
  enableComments: boolean;
}

// Cache settings in memory for instant access across components
let cachedSettings: PublicSettings | null = null;
let fetchPromise: Promise<void> | null = null;

const defaultSettings: PublicSettings = {
  siteName: 'iCoderX',
  siteDescription: 'Xây dựng tương lai với tự động hóa. Từng bot một.',
  siteUrl: 'https://icoderx.vn',
  contactEmail: 'admin@icoderx.vn',
  twitterUrl: 'https://x.com/iCoderXvn',
  facebookUrl: 'https://www.facebook.com/iCoderXvn',
  linkedinUrl: '',
  githubUrl: 'https://github.com/iCoderXvn',
  youtubeUrl: 'https://www.youtube.com/@iCoderX_vn',
  telegramUrl: 'https://t.me/iCoderXvn',
  postsPerPage: 10,
  enableComments: true,
};

export function useSettings() {
  // Start with cached settings if available, otherwise use null to avoid showing defaults
  const [settings, setSettings] = useState<PublicSettings>(() => cachedSettings || defaultSettings);
  const [loading, setLoading] = useState(!cachedSettings);

  useEffect(() => {
    // If we already have cached settings, use them immediately
    if (cachedSettings) {
      setSettings(cachedSettings);
      setLoading(false);
      return;
    }

    // If a fetch is already in progress, wait for it
    if (fetchPromise) {
      fetchPromise.then(() => {
        if (cachedSettings) {
          setSettings(cachedSettings);
        }
        setLoading(false);
      });
      return;
    }

    // Start new fetch
    fetchPromise = (async () => {
      try {
        const response = await fetch('/api/settings/public');
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            cachedSettings = data.settings;
            setSettings(data.settings);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
        fetchPromise = null;
      }
    })();
  }, []);

  return { settings, loading };
}
