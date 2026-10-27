'use client';

import React from 'react';

interface PackageSelectButtonProps {
  packageTier: string;
  className?: string;
  children: React.ReactNode;
}

export default function PackageSelectButton({
  packageTier,
  className,
  children,
}: PackageSelectButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('mvmnt_select_package', {
          detail: {
            packageTier,
          },
        })
      );
    }

    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
