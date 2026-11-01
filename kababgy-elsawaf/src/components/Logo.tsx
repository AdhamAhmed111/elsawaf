import React, { useState } from 'react';
import logoImage from '../assets/images/logo.webp';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10 sm:w-11 sm:h-11',
    lg: 'w-14 h-14',
  };

  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden border-2 border-amber-500/90 shadow-md shadow-amber-950/40 bg-red-950 ${sizeClasses[size]} ${className}`}
    >
      {!hasError ? (
        <img
          src={logoImage}
          alt="شعار كبابجي الصواف"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-red-950 via-red-900 to-amber-950 flex items-center justify-center">
          <span className="text-[10px] font-black text-amber-300">الصواف</span>
        </div>
      )}
    </div>
  );
};
