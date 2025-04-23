/**
 * Voicello Widget - Embeddable video conferencing
 */
(function() {
  // Configuration with defaults
  const config = {
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    size: 'medium', // small, medium, large
    widgetUrl: window.location.origin + '/widget', // URL to widget page
    theme: 'light' // light, dark
  };

  let container = null;
  let iframe = null;
  let animatedOverlay = null;

  // Initialize the widget with user configuration
  function initWidget(userConfig = {}) {
    // Merge default config with user config
    Object.assign(config, userConfig);
    
    // Create iframe container
    container = document.createElement('div');
    container.id = 'voicello-widget-container';
    
    // Set the position based on config
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.backgroundColor = 'transparent';
    container.style.padding = '0';
    container.style.margin = '0';
    
    switch(config.position) {
      case 'bottom-right':
        container.style.bottom = '20px';
        container.style.right = '20px';
        break;
      case 'bottom-left':
        container.style.bottom = '20px';
        container.style.left = '20px';
        break;
      case 'top-right':
        container.style.top = '20px';
        container.style.right = '20px';
        break;
      case 'top-left':
        container.style.top = '20px';
        container.style.left = '20px';
        break;
    }
    
    // Initialize in minimized state
    container.style.width = '64px';
    container.style.height = '64px';
    
    // Create the animated overlay
    animatedOverlay = document.createElement('div');
    animatedOverlay.id = 'voicello-animated-overlay';
    animatedOverlay.style.position = 'absolute';
    animatedOverlay.style.width = '68px';
    animatedOverlay.style.height = '68px';
    animatedOverlay.style.borderRadius = '50%';
    animatedOverlay.style.top = '-2px';
    animatedOverlay.style.left = '-2px';
    animatedOverlay.style.pointerEvents = 'none';
    animatedOverlay.style.zIndex = '1';
    animatedOverlay.innerHTML = `
      <div class="pulse-ring"></div>
      <div class="tech-overlay">
        <div class="tech-circle"></div>
        <div class="tech-dots">
          <div class="dot dot1"></div>
          <div class="dot dot2"></div>
          <div class="dot dot3"></div>
        </div>
      </div>
    `;
    
    // Add styles for the animated overlay
    const style = document.createElement('style');
    style.textContent = `
      #voicello-widget-container {
        transition: width 0.3s ease, height 0.3s ease;
        border-radius: 50%;
      }
      #voicello-animated-overlay .pulse-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: pulse 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        border: 2px solid rgba(0, 144, 255, 0.6);
        box-sizing: border-box;
      }
      #voicello-animated-overlay::after {
        content: '';
        position: absolute;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
        border-radius: 50%;
        border: 1.5px solid rgba(0, 144, 255, 0.4);
        animation: pulse-inner 3s ease-in-out infinite alternate;
      }
      #voicello-animated-overlay .tech-overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
      #voicello-animated-overlay .tech-circle {
        position: absolute;
        width: 140%;
        height: 140%;
        top: -20%;
        left: -20%;
        border-radius: 50%;
        border: 1px solid rgba(0, 144, 255, 0.4);
        animation: rotate 12s linear infinite;
        box-shadow: 0 0 15px rgba(0, 144, 255, 0.25) inset;
      }
      #voicello-animated-overlay .tech-dots {
        position: absolute;
        width: 100%;
        height: 100%;
        animation: counterRotate 12s linear infinite;
      }
      #voicello-animated-overlay .dot {
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: rgba(0, 144, 255, 0.9);
        box-shadow: 0 0 8px rgba(0, 144, 255, 0.7);
      }
      #voicello-animated-overlay .dot1 {
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        animation: blink 1.5s ease-in-out infinite;
      }
      #voicello-animated-overlay .dot2 {
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%) rotate(120deg);
        animation: blink 1.5s ease-in-out infinite 0.5s;
      }
      #voicello-animated-overlay .dot3 {
        top: 50%;
        right: 5px;
        transform: translateY(-50%) rotate(240deg);
        animation: blink 1.5s ease-in-out infinite 1s;
      }
      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 0.5;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.2;
        }
        100% {
          transform: scale(1);
          opacity: 0.5;
        }
      }
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes counterRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-360deg);
        }
      }
      @keyframes blink {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
      @keyframes pulse-inner {
        0% { transform: scale(0.9); opacity: 0.3; }
        100% { transform: scale(1.1); opacity: 0.6; }
      }
      #voicello-widget-iframe {
        position: relative;
        z-index: 2;
        border-radius: 50%;
        transition: border-radius 0.3s ease;
        background: transparent;
      }
    `;
    document.head.appendChild(style);
    
    // Add animated overlay to container
    container.appendChild(animatedOverlay);
    
    // Create iframe element
    iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.borderRadius = config.size === 'minimized' ? '50%' : '12px';
    iframe.style.zIndex = '2';
    iframe.style.transition = 'border-radius 0.3s ease-in-out';
    iframe.style.backgroundColor = 'transparent';
    iframe.style.overflow = 'hidden';
    
    // Add permission attributes for camera and microphone
    iframe.allow = "camera; microphone; display-capture; autoplay; clipboard-write; clipboard-read";
    
    // Set the iframe source URL
    iframe.src = config.widgetUrl;
    
    // Add to container
    container.appendChild(iframe);
    
    // Add to document
    document.body.appendChild(container);

    // Set up message listener for iframe communication
    window.addEventListener('message', handleMessage);
  }

  // Handle messages from the iframe
  function handleMessage(event) {
    if (event.data && event.data.type === 'voicello-widget') {
      const { action, size } = event.data;
      
      if (action === 'resize') {
        if (size === 'minimized') {
          resizeToMinimized();
        } else if (size === 'expanded') {
          resizeToExpanded();
        }
      }
    }
  }

  // Resize the container to minimized state
  function resizeToMinimized() {
    if (container) {
      container.style.width = '64px';
      container.style.height = '64px';
      iframe.style.borderRadius = '50%';
      container.style.backgroundColor = 'transparent';
      
      // Show the animated overlay
      if (animatedOverlay) {
        animatedOverlay.style.display = 'block';
      }
    }
  }

  // Resize the container to expanded state
  function resizeToExpanded() {
    if (container) {
      container.style.width = '360px';
      container.style.height = '480px';
      iframe.style.borderRadius = '12px';
      container.style.backgroundColor = 'transparent';
      
      // Hide the animated overlay
      if (animatedOverlay) {
        animatedOverlay.style.display = 'none';
      }
    }
  }

  // Expose the widget to the window object
  window.VoicelloWidget = {
    init: initWidget,
    minimize: resizeToMinimized,
    expand: resizeToExpanded
  };

  // Auto-initialize if data attributes are present
  const autoInit = document.querySelector('[data-voicello-widget]');
  if (autoInit) {
    // Parse data attributes
    const userConfig = {};
    
    if (autoInit.dataset.position) {
      userConfig.position = autoInit.dataset.position;
    }
    
    if (autoInit.dataset.size) {
      userConfig.size = autoInit.dataset.size;
    }
    
    if (autoInit.dataset.theme) {
      userConfig.theme = autoInit.dataset.theme;
    }
    
    if (autoInit.dataset.widgetUrl) {
      userConfig.widgetUrl = autoInit.dataset.widgetUrl;
    }
    
    // Initialize with parsed config
    initWidget(userConfig);
  }
})(); 