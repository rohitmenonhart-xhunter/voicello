'use client';

import { useEffect } from 'react';

export default function RemoveNextJsBadge() {
  useEffect(() => {
    // Remove Next.js badge function
    function removeNextJsBadge() {
      // Target Next.js dev indicator elements by attribute or class or id
      const possibleElements = [
        ...document.querySelectorAll('[data-nextjs-dev-indicator]'),
        ...document.querySelectorAll('[id^="__nextjs"]'),
        ...document.querySelectorAll('a[href*="nextjs.org"]'), 
        ...document.querySelectorAll('a[href*="vercel.com"]')
      ];
      
      // Also find any elements positioned at bottom left corner
      const bottomLeftElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.position === 'fixed' && 
               style.bottom === '0px' && 
               style.left === '0px' && 
               (el.tagName === 'A' || el.querySelector('a'));
      });
      
      // Remove all matched elements
      [...possibleElements, ...bottomLeftElements].forEach(el => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    }
    
    // Run immediately and then at intervals to catch delayed rendering
    removeNextJsBadge();
    const intervals = [
      setTimeout(removeNextJsBadge, 500),
      setTimeout(removeNextJsBadge, 1500),
      setTimeout(removeNextJsBadge, 3000)
    ];
    
    // Cleanup on unmount
    return () => {
      intervals.forEach(clearTimeout);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 