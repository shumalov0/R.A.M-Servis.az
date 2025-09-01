'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  href?: string;
  lightSrc?: string;
  darkSrc?: string;
  alt?: string;
  heightClass?: string; // e.g. 'h-8'
}

export default function Logo({
  href = '/',
  lightSrc = '/icons/black.svg',
  darkSrc = '/icons/white.svg',
  alt = 'Ram Servis',
  heightClass = 'h-8',
}: LogoProps) {
  return (
    <Link href={href} className="flex items-center group">
      <span className={`relative ${heightClass} w-[140px] md:w-[200px]`}>
        <span className="absolute inset-0 block dark:hidden">
          <Image src={lightSrc} alt={alt} fill sizes="200px" className="object-contain" priority={false} />
        </span>
        <span className="absolute inset-0 hidden dark:block">
          <Image src={darkSrc} alt={alt} fill sizes="200px" className="object-contain" priority={false} />
        </span>
      </span>
    </Link>
  );
}


