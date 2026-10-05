import React from 'react';

interface EcgHeartbeatLineProps {
  color?: string;
  height?: number;
  className?: string;
  speed?: 'normal' | 'fast' | 'slow';
}

export const EcgHeartbeatLine: React.FC<EcgHeartbeatLineProps> = ({
  color = '#2563eb',
  height = 36,
  className = '',
  speed = 'normal'
}) => {
  const duration = speed === 'fast' ? '1.5s' : speed === 'slow' ? '3.5s' : '2.4s';

  return (
    <div className={`relative w-full overflow-hidden flex items-center ${className}`} style={{ height }}>
      {/* SVG Continuous ECG Path */}
      <svg
        viewBox="0 0 600 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="40%" stopColor={color} stopOpacity="0.8" />
            <stop offset="60%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
          <filter id="ecgGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint Grid Background */}
        <line x1="0" y1="30" x2="600" y2="30" stroke={color} strokeOpacity="0.15" strokeDasharray="3 3" />

        {/* ECG Wave Repeat 1 */}
        <path
          d="M0,30 L60,30 L75,25 L85,35 L95,30 L110,30 L120,8 L130,52 L140,20 L150,34 L160,30 L180,30 L195,24 L210,30 L300,30 L360,30 L375,25 L385,35 L395,30 L410,30 L420,8 L430,52 L440,20 L450,34 L460,30 L480,30 L495,24 L510,30 L600,30"
          stroke="url(#ecgGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ecgGlow)"
          className="ecg-wave-path"
          style={{
            strokeDasharray: '600',
            strokeDashoffset: '600',
            animation: `ecgDash ${duration} cubic-bezier(0.4, 0, 0.2, 1) infinite`
          }}
        />
      </svg>

      <style>{`
        @keyframes ecgDash {
          0% {
            stroke-dashoffset: 600;
            opacity: 0.3;
          }
          40% {
            opacity: 1;
          }
          90% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -100;
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};
