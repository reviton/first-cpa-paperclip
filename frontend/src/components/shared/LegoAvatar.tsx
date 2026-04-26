import React from 'react';

interface LegoAvatarProps {
  agentId: string;
  size?: number;
}

// Each agent gets a unique combo: hair style, hair color, torso color, accessory
type AvatarConfig = {
  hair: 'short' | 'long' | 'bald' | 'pony' | 'curly' | 'cap' | 'tophat' | 'crown' | 'hijab' | 'beanie' | 'beard';
  hairColor: string;
  torsoColor: string;
  accessory: 'briefcase' | 'laptop' | 'phone' | 'calc' | 'megaphone' | 'headset' | 'gear' | 'chart' | 'scroll' | 'coin' | 'wrench' | 'star' | 'shield' | 'book' | 'mail' | 'none';
  accessoryColor?: string;
};

const AVATAR_MAP: Record<string, AvatarConfig> = {
  // הנהלה
  'chair-tomer': { hair: 'crown', hairColor: '#FFD700', torsoColor: '#0f172a', accessory: 'star', accessoryColor: '#FFD700' },
  'agent-ceo': { hair: 'long', hairColor: '#8B4513', torsoColor: '#2dd4bf', accessory: 'chart', accessoryColor: '#fff' },
  // HR
  'agent-hr': { hair: 'pony', hairColor: '#D2691E', torsoColor: '#8e44ad', accessory: 'scroll', accessoryColor: '#fff' },
  // דוחות וביקורת
  'agent-auditor': { hair: 'short', hairColor: '#2C2C2C', torsoColor: '#1e293b', accessory: 'calc', accessoryColor: '#fff' },
  // חשבונאות
  'agent-case-manager': { hair: 'long', hairColor: '#8B4513', torsoColor: '#3b82f6', accessory: 'book', accessoryColor: '#fff' },
  // שירות לקוחות
  'agent-client-relations': { hair: 'curly', hairColor: '#4A2C2A', torsoColor: '#2dd4bf', accessory: 'headset', accessoryColor: '#fff' },
  'agent-onboarding': { hair: 'short', hairColor: '#000', torsoColor: '#2dd4bf', accessory: 'star', accessoryColor: '#FFD700' },
  // גבייה
  'agent-collection': { hair: 'cap', hairColor: '#1a1a1a', torsoColor: '#f59e0b', accessory: 'coin', accessoryColor: '#FFD700' },
  // תזכורות
  'agent-reminders': { hair: 'beanie', hairColor: '#dc2626', torsoColor: '#f59e0b', accessory: 'phone', accessoryColor: '#fff' },
  // חברות וירטואליות
  'agent-virtual-co': { hair: 'short', hairColor: '#8B4513', torsoColor: '#22c55e', accessory: 'gear', accessoryColor: '#fff' },
  // שכר
  'agent-payroll': { hair: 'tophat', hairColor: '#000', torsoColor: '#dc2626', accessory: 'calc', accessoryColor: '#fff' },
  // פנסיוני
  'agent-pension': { hair: 'pony', hairColor: '#FFD700', torsoColor: '#22c55e', accessory: 'shield', accessoryColor: '#fff' },
  // עצמאים
  'agent-bookkeeping': { hair: 'short', hairColor: '#4A2C2A', torsoColor: '#0f172a', accessory: 'book', accessoryColor: '#fff' },
  // בקרת איכות
  'agent-reasonability': { hair: 'long', hairColor: '#2C2C2C', torsoColor: '#ef4444', accessory: 'shield', accessoryColor: '#fff' },
  // חברות
  'agent-corporate': { hair: 'tophat', hairColor: '#000', torsoColor: '#1e293b', accessory: 'briefcase', accessoryColor: '#8B4513' },
  // וואטסאפ
  'agent-whatsapp': { hair: 'curly', hairColor: '#4A2C2A', torsoColor: '#3b82f6', accessory: 'phone', accessoryColor: '#22c55e' },
  // שידור
  'agent-broadcast': { hair: 'short', hairColor: '#000', torsoColor: '#3b82f6', accessory: 'megaphone', accessoryColor: '#fff' },
  // צמיחה
  'agent-growth': { hair: 'long', hairColor: '#D2691E', torsoColor: '#10b981', accessory: 'chart', accessoryColor: '#fff' },
  // טכנולוגיה
  'agent-portal': { hair: 'beanie', hairColor: '#1a1a1a', torsoColor: '#6366f1', accessory: 'laptop', accessoryColor: '#fff' },
  // CRM
  'agent-crm': { hair: 'short', hairColor: '#8B4513', torsoColor: '#ec4899', accessory: 'gear', accessoryColor: '#fff' },
};

const DEFAULT: AvatarConfig = { hair: 'short', hairColor: '#4A2C2A', torsoColor: '#64748b', accessory: 'star', accessoryColor: '#fff' };

const renderHair = (h: AvatarConfig['hair'], color: string) => {
  switch (h) {
    case 'short':
      return <path d="M 25 30 Q 50 8 75 30 L 75 42 L 25 42 Z" fill={color} />;
    case 'long':
      return <>
        <path d="M 22 35 Q 50 5 78 35 L 78 55 L 22 55 Z" fill={color} />
        <path d="M 18 38 Q 18 65 28 70 L 30 50 Z" fill={color} />
        <path d="M 82 38 Q 82 65 72 70 L 70 50 Z" fill={color} />
      </>;
    case 'bald':
      return null;
    case 'pony':
      return <>
        <path d="M 25 32 Q 50 8 75 32 L 75 42 L 25 42 Z" fill={color} />
        <ellipse cx="78" cy="48" rx="8" ry="14" fill={color} />
      </>;
    case 'curly':
      return <>
        <circle cx="35" cy="25" r="10" fill={color} />
        <circle cx="50" cy="20" r="11" fill={color} />
        <circle cx="65" cy="25" r="10" fill={color} />
        <circle cx="28" cy="35" r="8" fill={color} />
        <circle cx="72" cy="35" r="8" fill={color} />
      </>;
    case 'cap':
      return <>
        <path d="M 22 32 Q 50 12 78 32 L 78 38 L 22 38 Z" fill={color} />
        <rect x="22" y="36" width="56" height="6" fill={color} />
        <ellipse cx="78" cy="38" rx="14" ry="4" fill={color} />
      </>;
    case 'tophat':
      return <>
        <rect x="32" y="5" width="36" height="22" fill={color} />
        <ellipse cx="50" cy="27" rx="26" ry="4" fill={color} />
        <rect x="32" y="20" width="36" height="3" fill="#8B0000" />
      </>;
    case 'crown':
      return <>
        <path d="M 25 30 L 30 12 L 38 22 L 50 8 L 62 22 L 70 12 L 75 30 Z" fill={color} stroke="#B8860B" strokeWidth="1.5" />
        <circle cx="38" cy="22" r="2" fill="#FF1744" />
        <circle cx="50" cy="14" r="2.5" fill="#00C853" />
        <circle cx="62" cy="22" r="2" fill="#2962FF" />
      </>;
    case 'beanie':
      return <>
        <path d="M 22 35 Q 50 8 78 35 L 78 42 L 22 42 Z" fill={color} />
        <ellipse cx="50" cy="42" rx="28" ry="3" fill="#fff" opacity="0.3" />
        <circle cx="50" cy="10" r="4" fill={color} />
      </>;
    case 'hijab':
      return <>
        <path d="M 15 40 Q 50 0 85 40 Q 85 60 80 70 L 20 70 Q 15 60 15 40 Z" fill={color} />
      </>;
    case 'beard':
      return <path d="M 25 30 Q 50 8 75 30 L 75 42 L 25 42 Z" fill={color} />;
    default:
      return null;
  }
};

const renderAccessory = (a: AvatarConfig['accessory'], color: string) => {
  // Positioned in left hand area (right side from viewer)
  const cx = 75;
  const cy = 110;
  switch (a) {
    case 'briefcase':
      return <>
        <rect x={cx - 8} y={cy - 6} width="16" height="12" fill={color} stroke="#000" strokeWidth="0.8" rx="1" />
        <rect x={cx - 3} y={cy - 9} width="6" height="3" fill="none" stroke={color} strokeWidth="1.2" />
      </>;
    case 'laptop':
      return <>
        <rect x={cx - 9} y={cy - 6} width="18" height="11" fill={color} stroke="#000" strokeWidth="0.8" rx="1" />
        <rect x={cx - 7} y={cy - 4} width="14" height="7" fill="#1e293b" />
        <line x1={cx - 4} y1={cy + 1} x2={cx + 4} y2={cy + 1} stroke="#2dd4bf" strokeWidth="0.5" />
      </>;
    case 'phone':
      return <>
        <rect x={cx - 4} y={cy - 7} width="8" height="14" fill={color} stroke="#000" strokeWidth="0.8" rx="1.5" />
        <rect x={cx - 3} y={cy - 5} width="6" height="9" fill="#1e293b" />
        <circle cx={cx} cy={cy + 5} r="0.8" fill="#fff" />
      </>;
    case 'calc':
      return <>
        <rect x={cx - 5} y={cy - 7} width="10" height="14" fill={color} stroke="#000" strokeWidth="0.8" rx="1" />
        <rect x={cx - 4} y={cy - 6} width="8" height="3" fill="#1e293b" />
        {[0, 1, 2].map(r => [0, 1, 2].map(c => (
          <rect key={`${r}-${c}`} x={cx - 4 + c * 3} y={cy - 1 + r * 2.5} width="2" height="1.5" fill="#334155" />
        )))}
      </>;
    case 'megaphone':
      return <>
        <path d={`M ${cx - 8} ${cy - 4} L ${cx + 6} ${cy - 8} L ${cx + 6} ${cy + 8} L ${cx - 8} ${cy + 4} Z`} fill={color} stroke="#000" strokeWidth="0.8" />
        <rect x={cx - 10} y={cy - 2} width="3" height="4" fill="#64748b" />
      </>;
    case 'headset':
      return <>
        <path d={`M ${cx - 8} ${cy} Q ${cx} ${cy - 10} ${cx + 8} ${cy}`} fill="none" stroke={color} strokeWidth="2" />
        <ellipse cx={cx - 8} cy={cy + 2} rx="3" ry="4" fill={color} />
        <ellipse cx={cx + 8} cy={cy + 2} rx="3" ry="4" fill={color} />
      </>;
    case 'gear':
      return <>
        <circle cx={cx} cy={cy} r="7" fill={color} stroke="#000" strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r="2.5" fill="#1e293b" />
        {[0, 60, 120, 180, 240, 300].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const x = cx + Math.cos(rad) * 8.5;
          const y = cy + Math.sin(rad) * 8.5;
          return <rect key={deg} x={x - 1.5} y={y - 1.5} width="3" height="3" fill={color} stroke="#000" strokeWidth="0.5" />;
        })}
      </>;
    case 'chart':
      return <>
        <rect x={cx - 8} y={cy - 7} width="16" height="14" fill={color} stroke="#000" strokeWidth="0.8" rx="1" />
        <rect x={cx - 6} y={cy + 2} width="2" height="4" fill="#22c55e" />
        <rect x={cx - 3} y={cy - 1} width="2" height="7" fill="#22c55e" />
        <rect x={cx} y={cy - 4} width="2" height="10" fill="#22c55e" />
        <rect x={cx + 3} y={cy - 6} width="2" height="12" fill="#22c55e" />
      </>;
    case 'scroll':
      return <>
        <rect x={cx - 7} y={cy - 6} width="14" height="12" fill={color} stroke="#000" strokeWidth="0.8" />
        <line x1={cx - 5} y1={cy - 3} x2={cx + 5} y2={cy - 3} stroke="#1e293b" strokeWidth="0.6" />
        <line x1={cx - 5} y1={cy} x2={cx + 5} y2={cy} stroke="#1e293b" strokeWidth="0.6" />
        <line x1={cx - 5} y1={cy + 3} x2={cx + 3} y2={cy + 3} stroke="#1e293b" strokeWidth="0.6" />
      </>;
    case 'coin':
      return <>
        <circle cx={cx} cy={cy} r="7" fill={color} stroke="#B8860B" strokeWidth="1" />
        <text x={cx} y={cy + 3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#8B6914">₪</text>
      </>;
    case 'wrench':
      return <path d={`M ${cx - 8} ${cy - 8} L ${cx + 4} ${cy + 4} L ${cx + 6} ${cy + 8} L ${cx + 8} ${cy + 6} L ${cx + 4} ${cy + 4} M ${cx - 8} ${cy - 8} L ${cx - 6} ${cy - 4} L ${cx - 4} ${cy - 6} Z`} fill={color} stroke="#000" strokeWidth="0.8" />;
    case 'star':
      return <path d={`M ${cx} ${cy - 8} L ${cx + 2.4} ${cy - 2.4} L ${cx + 8} ${cy - 2.4} L ${cx + 3.6} ${cy + 1.2} L ${cx + 5.6} ${cy + 7} L ${cx} ${cy + 3.6} L ${cx - 5.6} ${cy + 7} L ${cx - 3.6} ${cy + 1.2} L ${cx - 8} ${cy - 2.4} L ${cx - 2.4} ${cy - 2.4} Z`} fill={color} stroke="#B8860B" strokeWidth="0.6" />;
    case 'shield':
      return <>
        <path d={`M ${cx} ${cy - 8} L ${cx + 7} ${cy - 5} L ${cx + 7} ${cy + 2} Q ${cx + 7} ${cy + 7} ${cx} ${cy + 9} Q ${cx - 7} ${cy + 7} ${cx - 7} ${cy + 2} L ${cx - 7} ${cy - 5} Z`} fill={color} stroke="#000" strokeWidth="0.8" />
        <path d={`M ${cx - 3} ${cy} L ${cx - 1} ${cy + 2} L ${cx + 3} ${cy - 2}`} fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      </>;
    case 'book':
      return <>
        <rect x={cx - 8} y={cy - 6} width="16" height="12" fill={color} stroke="#000" strokeWidth="0.8" rx="0.5" />
        <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#000" strokeWidth="0.6" />
        <line x1={cx - 6} y1={cy - 3} x2={cx - 2} y2={cy - 3} stroke="#1e293b" strokeWidth="0.5" />
        <line x1={cx - 6} y1={cy} x2={cx - 2} y2={cy} stroke="#1e293b" strokeWidth="0.5" />
        <line x1={cx + 2} y1={cy - 3} x2={cx + 6} y2={cy - 3} stroke="#1e293b" strokeWidth="0.5" />
      </>;
    case 'mail':
      return <>
        <rect x={cx - 8} y={cy - 5} width="16" height="11" fill={color} stroke="#000" strokeWidth="0.8" />
        <path d={`M ${cx - 8} ${cy - 5} L ${cx} ${cy + 1} L ${cx + 8} ${cy - 5}`} fill="none" stroke="#000" strokeWidth="0.8" />
      </>;
    case 'none':
    default:
      return null;
  }
};

const LegoAvatar: React.FC<LegoAvatarProps> = ({ agentId, size = 80 }) => {
  const cfg = AVATAR_MAP[agentId] || DEFAULT;
  const skin = '#FDD835'; // classic LEGO yellow
  const skinShadow = '#F9A825';

  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 100 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Body group */}
      <g>
        {/* Neck */}
        <rect x="44" y="58" width="12" height="6" fill={skin} />

        {/* Torso (trapezoid) */}
        <path d="M 28 64 L 72 64 L 78 110 L 22 110 Z" fill={cfg.torsoColor} stroke="#000" strokeWidth="1" />
        {/* Torso shadow/highlight */}
        <path d="M 28 64 L 72 64 L 73 70 L 27 70 Z" fill="#000" opacity="0.15" />
        {/* Shirt buttons / detail */}
        <line x1="50" y1="66" x2="50" y2="100" stroke="#000" strokeWidth="0.5" opacity="0.4" />

        {/* Arms */}
        <path d="M 22 66 Q 14 70 14 90 L 22 100 Q 28 95 28 80 Z" fill={cfg.torsoColor} stroke="#000" strokeWidth="1" />
        <path d="M 78 66 Q 86 70 86 90 L 78 100 Q 72 95 72 80 Z" fill={cfg.torsoColor} stroke="#000" strokeWidth="1" />

        {/* Hands (yellow) */}
        <ellipse cx="18" cy="105" rx="5" ry="4" fill={skin} stroke="#000" strokeWidth="0.8" />
        <ellipse cx="82" cy="105" rx="5" ry="4" fill={skin} stroke="#000" strokeWidth="0.8" />

        {/* Legs (hint) */}
        <rect x="32" y="110" width="14" height="20" fill="#1e293b" stroke="#000" strokeWidth="1" />
        <rect x="54" y="110" width="14" height="20" fill="#1e293b" stroke="#000" strokeWidth="1" />

        {/* Accessory in right hand */}
        {renderAccessory(cfg.accessory, cfg.accessoryColor || '#fff')}

        {/* Head */}
        <rect x="42" y="54" width="16" height="6" fill={skinShadow} />
        <ellipse cx="50" cy="40" rx="22" ry="22" fill={skin} stroke="#000" strokeWidth="1.2" />
        {/* Face shading */}
        <ellipse cx="50" cy="48" rx="20" ry="6" fill={skinShadow} opacity="0.4" />

        {/* Eyes */}
        <circle cx="42" cy="40" r="2.2" fill="#000" />
        <circle cx="58" cy="40" r="2.2" fill="#000" />
        {/* Eye shine */}
        <circle cx="42.7" cy="39.3" r="0.6" fill="#fff" />
        <circle cx="58.7" cy="39.3" r="0.6" fill="#fff" />

        {/* Smile */}
        <path d="M 44 47 Q 50 52 56 47" fill="none" stroke="#000" strokeWidth="1.4" strokeLinecap="round" />

        {/* Hair / Hat (drawn last so it's on top) */}
        {renderHair(cfg.hair, cfg.hairColor)}
      </g>
    </svg>
  );
};

export default LegoAvatar;
