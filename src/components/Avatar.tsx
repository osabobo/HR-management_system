import React from 'react';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorIndex?: number;
  className?: string;
}

const colors = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-violet-500',
  'bg-amber-500', 'bg-rose-500', 'bg-teal-500', 'bg-orange-500',
  'bg-pink-500', 'bg-blue-500',
];

const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' };

const Avatar: React.FC<AvatarProps> = ({ initials, size = 'md', colorIndex, className = '' }) => {
  const idx = colorIndex !== undefined ? colorIndex % colors.length :
    initials.charCodeAt(0) % colors.length;

  return (
    <div className={`avatar ${sizes[size]} ${colors[idx]} text-white font-bold flex-shrink-0 ${className}`}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
      {initials.substring(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;
