'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { generateRoomId } from '@/lib/client-utils';

export default function WidgetPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMinimized, setIsMinimized] = useState(true);

  // Send message to parent window to resize iframe
  const sendResizeMessage = (size: 'minimized' | 'expanded') => {
    if (window.parent) {
      window.parent.postMessage({
        type: 'voicello-widget',
        action: 'resize',
        size
      }, '*');
    }
  };

  // Initialize widget in minimized state and ensure proper size when returning from a room
  useEffect(() => {
    // If we're on the base widget page (not in a room), make sure we're minimized
    if (pathname === '/widget') {
      setIsMinimized(true);
      sendResizeMessage('minimized');
    }
  }, [pathname]);

  // Start a meeting when the widget is expanded
  const startMeeting = () => {
    router.push(`/widget/${generateRoomId()}`);
  };

  // Toggle widget state
  const toggleWidget = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    
    if (newState) {
      // Minimizing
      sendResizeMessage('minimized');
      router.push('/widget'); // Go back to widget page
    } else {
      // Expanding
      sendResizeMessage('expanded');
      startMeeting();
    }
  };

  return (
    <div className="widget-container">
      {isMinimized ? (
        <button 
          className="floating-button"
          onClick={toggleWidget}
          aria-label="Start AI video call"
        >
          <svg width="44" height="44" viewBox="-2 -2 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.05)"/>
            <rect x="6" y="10" width="8" height="6" rx="1" stroke="white" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.1)"/>
            <path d="M14 12.5L17 10.5V15.5L14 13.5" stroke="white" strokeWidth="1.5" fill="rgba(255, 255, 255, 0.1)" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      ) : (
        <div className="widget-expanded">
          <div className="widget-header">
            <button 
              className="close-button"
              onClick={toggleWidget}
              aria-label="Close video call"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
          <div className="widget-content">
            {/* The room content will be loaded by the Next.js router */}
          </div>
        </div>
      )}
      <style jsx>{`
        .widget-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .floating-button {
          width: 74px;
          height: 74px;
          border-radius: 50%;
          background: rgba(17, 21, 30, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 144, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.25);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          pointer-events: auto;
          margin-left: auto;
        }
        
        .floating-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }
        
        .floating-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 144, 255, 0.5);
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(21, 25, 40, 0.75);
        }
        
        .floating-button:hover::before {
          left: 100%;
        }
        
        .widget-expanded {
          width: 100%;
          height: 100%;
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .widget-header {
          display: flex;
          justify-content: flex-end;
          padding: 8px;
          background-color: #f5f5f5;
        }
        
        .close-button {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          padding: 4px;
          border-radius: 50%;
        }
        
        .close-button:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        
        .widget-content {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
} 