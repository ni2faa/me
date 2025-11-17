'use client'

import type { ReactElement } from 'react'
import Script from 'next/script'

export function AnalyticsScripts(): ReactElement {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-6LTFZ4EHWK"
        strategy="afterInteractive"
        onError={() => {
          try {
            console.error('gtag load error')
          } catch {}
        }}
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6LTFZ4EHWK');
          gtag('consent', 'default', { analytics_storage: 'denied' });
          try {
            if (localStorage.getItem('cookie_consent') === 'granted') {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            }
            window.addEventListener('cookie-consent-granted', () => {
              gtag('consent', 'update', { analytics_storage: 'granted' });
            });
          } catch {}
        `}
      </Script>
      <Script id="touch-analytics" strategy="afterInteractive">
        {`
          (function(){
            var send = function(name, params){
              try {
                if (typeof window.gtag === 'function') {
                  window.gtag('event', name, params || {});
                } else if (Array.isArray(window.dataLayer)) {
                  window.dataLayer.push(Object.assign({ event: name }, params || {}));
                }
              } catch {}
            };
            var threshold = 30;
            var startX = 0, startY = 0, startDist = 0, raf = false, moveX = 0, moveY = 0, moveDist = 0;
            var dist = function(t){
              var a=t[0], b=t[1];
              if(!a||!b) return 0;
              var dx=a.clientX-b.clientX, dy=a.clientY-b.clientY;
              return Math.hypot(dx,dy);
            };
            var onStart = function(e){
              var t=e.touches;
              startX=t[0].clientX; startY=t[0].clientY;
              startDist=t.length>=2?dist(t):0;
              send('touch_start', { x: startX, y: startY, ts: Date.now() });
            };
            var onMove = function(e){
              if(raf) return; raf=true;
              requestAnimationFrame(function(){
                var t=e.touches;
                moveX=t[0].clientX; moveY=t[0].clientY;
                moveDist=t.length>=2?dist(t):0;
                raf=false;
              });
            };
            var onEnd = function(e){
              var dx=moveX - startX;
              var dy=moveY - startY;
              var absX=Math.abs(dx), absY=Math.abs(dy);
              var isTap=absX<10 && absY<10;
              if(isTap){
                send('tap', { x: moveX || startX, y: moveY || startY });
              } else {
                var dir='';
                if(absX>absY && absX>threshold) dir= dx>0 ? 'swipe_right':'swipe_left';
                else if(absY>threshold) dir= dy>0 ? 'swipe_down':'swipe_up';
                if(dir) send(dir, { dx: dx, dy: dy });
              }
              if(startDist>0 && moveDist>0){
                var delta=moveDist - startDist;
                if(Math.abs(delta)>20){
                  send(delta>0?'pinch_out':'pinch_in', { delta: delta });
                }
              }
              startX=0; startY=0; startDist=0; moveDist=0;
            };
            document.addEventListener('touchstart', onStart, { passive: true });
            document.addEventListener('touchmove', onMove, { passive: true });
            document.addEventListener('touchend', onEnd, { passive: true });
          })();
        `}
      </Script>
    </>
  )
}