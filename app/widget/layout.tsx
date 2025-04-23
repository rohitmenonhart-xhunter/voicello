'use client';

import '../../styles/globals.css';

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="widget-root">
      <div className="tech-background">
        <div className="grid"></div>
        <div className="ai-nodes"></div>
        <div className="grid-overlay"></div>
      </div>
      {children}
      <style jsx global>{`
        .widget-root {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .tech-background {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          overflow: hidden;
        }
        
        .grid {
          position: absolute;
          width: 150%;
          height: 150%;
          top: -25%;
          left: -25%;
          background-image: linear-gradient(rgba(0, 144, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 144, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
          transform: perspective(500px) rotateX(60deg);
          animation: grid-move 20s linear infinite;
        }
        
        .ai-nodes {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-image: radial-gradient(circle at 50% 30%, rgba(0, 144, 255, 0.07) 0%, transparent 40%),
                           radial-gradient(circle at 80% 60%, rgba(0, 144, 255, 0.07) 0%, transparent 30%),
                           radial-gradient(circle at 20% 70%, rgba(0, 144, 255, 0.07) 0%, transparent 35%);
          opacity: 0.8;
          animation: pulse-nodes 8s ease-in-out infinite alternate;
        }
        
        .grid-overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.01) 80%);
        }
        
        @keyframes grid-move {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(20px);
          }
        }
        
        @keyframes pulse-nodes {
          0% { opacity: 0.5; }
          100% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
} 