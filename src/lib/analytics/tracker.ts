'use client';

import { analyticsConfig } from './config';

// Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && analyticsConfig.googleAnalyticsId) {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    function gtag() { dataLayer.push(arguments); }
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', analyticsConfig.googleAnalyticsId);
  }
};

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && analyticsConfig.googleAnalyticsId) {
    // @ts-ignore
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && analyticsConfig.facebookPixelId) {
    // @ts-ignore
    window.fbq?.('track', action, {
      category,
      label,
      value,
    });
  }

  // TikTok Pixel
  if (typeof window !== 'undefined' && analyticsConfig.tiktokPixelId) {
    // @ts-ignore
    window.ttq?.track(action, {
      category,
      label,
      value,
    });
  }
};

// Conversion tracking
export const trackConversion = (type: keyof typeof analyticsConfig.conversionValues) => {
  const value = analyticsConfig.conversionValues[type];
  
  // Google Analytics conversion
  trackEvent('conversion', type, undefined, value);
  
  // Facebook Pixel conversion
  if (typeof window !== 'undefined' && analyticsConfig.facebookPixelId) {
    // @ts-ignore
    window.fbq?.('track', 'Lead', {
      value: value,
      currency: 'USD',
      content_name: type,
    });
  }

  // Google Ads conversion
  if (typeof window !== 'undefined' && analyticsConfig.googleAdsId) {
    // @ts-ignore
    window.gtag?.('event', 'conversion', {
      send_to: `${analyticsConfig.googleAdsId}/conversion_label`,
      value: value,
      currency: 'USD',
    });
  }
};

// Page view tracking
export const trackPageView = (url: string) => {
  // Google Analytics
  if (typeof window !== 'undefined' && analyticsConfig.googleAnalyticsId) {
    // @ts-ignore
    window.gtag?.('config', analyticsConfig.googleAnalyticsId, {
      page_path: url,
    });
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && analyticsConfig.facebookPixelId) {
    // @ts-ignore
    window.fbq?.('track', 'PageView');
  }
};

// Video tracking
export const trackVideoWatch = (percentage: number) => {
  trackEvent('video_progress', 'engagement', `watched_${percentage}%`, percentage);
  
  if (percentage >= 50) {
    trackConversion('videoWatch');
  }
};

// Form tracking
export const trackFormInteraction = (formName: string, field: string) => {
  trackEvent('form_interaction', formName, field);
};

// Exit intent tracking
export const trackExitIntent = (shown: boolean, submitted: boolean) => {
  if (shown) {
    trackEvent('exit_intent_shown', 'engagement');
  }
  if (submitted) {
    trackConversion('exitIntentSubmit');
  }
};

// Territory check tracking
export const trackTerritoryCheck = (territory: string, available: boolean) => {
  trackEvent('territory_check', 'engagement', territory, available ? 1 : 0);
  trackConversion('territoryCheck');
};

// Application tracking
export const trackApplicationStep = (step: number, stepName: string) => {
  trackEvent(`application_step_${step}`, 'application', stepName);
  
  if (step === 1) {
    trackConversion('applicationStart');
  } else if (step === 'complete') {
    trackConversion('applicationSubmit');
  }
};

// Email capture tracking
export const trackEmailCapture = (source: string) => {
  trackEvent('email_captured', 'lead_generation', source);
  trackConversion('emailCapture');
};

// A/B test tracking
export const trackABTest = (testName: string, variant: string) => {
  trackEvent('ab_test_view', testName, variant);
};

// Scroll depth tracking
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`, percentage);
};

// Time on page tracking
export const trackTimeOnPage = (seconds: number) => {
  if (seconds % 30 === 0) { // Track every 30 seconds
    trackEvent('time_on_page', 'engagement', `${seconds}s`, seconds);
  }
};

// Click tracking for CTAs
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', ctaName, location);
};