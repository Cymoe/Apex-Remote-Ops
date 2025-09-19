export const analyticsConfig = {
  // Google Analytics 4
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  
  // Facebook Pixel
  facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || '',
  
  // Microsoft Clarity
  clarityProjectId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || '',
  
  // Google Ads
  googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || '',
  
  // TikTok Pixel
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '',
  
  // Custom conversion values
  conversionValues: {
    emailCapture: 10,
    applicationStart: 50,
    applicationSubmit: 100,
    territoryCheck: 25,
    videoWatch: 15,
    exitIntentSubmit: 20,
  }
};