'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsConfig } from '@/lib/analytics/config';
import { initGA, trackPageView, trackScrollDepth, trackTimeOnPage } from '@/lib/analytics/tracker';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Initialize analytics and track engagement metrics
  useEffect(() => {
    initGA();

    // Track scroll depth
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        trackScrollDepth(scrollPercent);
      }
    };

    // Track time on page
    let timeOnPage = 0;
    const timeInterval = setInterval(() => {
      timeOnPage += 1;
      trackTimeOnPage(timeOnPage);
    }, 1000);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      {/* Google Analytics 4 */}
      {analyticsConfig.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${analyticsConfig.googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Facebook Pixel */}
      {analyticsConfig.facebookPixelId && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${analyticsConfig.facebookPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {analyticsConfig.clarityProjectId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${analyticsConfig.clarityProjectId}");
          `}
        </Script>
      )}

      {/* TikTok Pixel */}
      {analyticsConfig.tiktokPixelId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${analyticsConfig.tiktokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}

      {/* Google Ads */}
      {analyticsConfig.googleAdsId && (
        <Script id="google-ads" strategy="afterInteractive">
          {`
            gtag('config', '${analyticsConfig.googleAdsId}');
          `}
        </Script>
      )}

      {children}
    </>
  );
}