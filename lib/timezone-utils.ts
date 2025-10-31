// Utility functions for date formatting with timezone support

/**
 * Get the timezone setting from the admin settings
 */
export async function getTimezone(): Promise<string> {
  try {
    const response = await fetch('/api/settings');
    if (response.ok) {
      const data = await response.json();
      const timezoneSetting = data.settings.find((s: any) => s.key === 'timezone');
      return timezoneSetting?.value || 'UTC';
    }
  } catch (error) {
    console.error('Error fetching timezone setting:', error);
  }
  return 'UTC';
}

/**
 * Format a date with the configured timezone
 */
export function formatDateWithTimezone(
  date: Date | string,
  timezone: string = 'UTC',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-GB', {
    ...options,
    timeZone: timezone
  });
}

/**
 * Format a date and time with the configured timezone
 */
export function formatDateTimeWithTimezone(
  date: Date | string,
  timezone: string = 'UTC',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-GB', {
    ...options,
    timeZone: timezone
  });
}

/**
 * Format a date in the specific format: HH:MM DD/MM/YYYY
 */
export function formatTimeDate(
  date: Date | string,
  timezone: string = 'UTC'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const timeStr = dateObj.toLocaleTimeString('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  
  const dateStr = dateObj.toLocaleDateString('en-GB', {
    timeZone: timezone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  
  return `${timeStr} ${dateStr}`;
}

/**
 * Hook to get timezone setting on client side
 */
export function useTimezone() {
  const [timezone, setTimezone] = React.useState<string>('UTC');
  
  React.useEffect(() => {
    getTimezone().then(setTimezone);
  }, []);
  
  return timezone;
}

// For React components
import React from 'react';