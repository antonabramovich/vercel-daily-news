import {ComponentProps} from 'react';
import Image from 'next/image';
import notFoundImage from '../../../public/not-found.png';

export function NotFoundImage({ alt, ...rest }: Omit<ComponentProps<typeof Image>, 'src'>) {
  return (
    <Image
      preload
      src={notFoundImage}
      width={96}
      height={174}
      sizes="(max-width: 48rem) 100vw, 96px"
      alt={alt}
      placeholder="blur"
      {...rest}
    />
  );
}
