'use client';

import {ComponentProps, useState} from 'react';
import Link from 'next/link';

export function HoverPrefetchLink({ href, children, ...rest }: ComponentProps<typeof Link>) {
  const [active, setActive] = useState(false);

  return (
    <Link
      {...rest}
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
    >
      {children}
    </Link>
  );
}
