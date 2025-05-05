import Image, { ImageProps } from 'next/image';

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt?: string;
};

const Logo = ({ src, alt = 'Logo', width = 32, height = 32, ...props }: LogoProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  );
}

export { Logo };
