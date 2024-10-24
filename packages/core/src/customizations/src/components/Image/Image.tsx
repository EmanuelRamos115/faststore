import { memo } from 'react'
import type { ImageProps as NextImageProps } from 'next/image'
import NextImage from 'next/image'
import loader from 'src/components/ui/Image/loader'

export type ImageProps = NextImageProps

// Next loader function does not handle all props as height and options
// so we use a custom loader to handle images using thumbor server with VTEX CDN
// https://nextjs.org/docs/api-reference/next/image#loader
const Image = ({
  loading = 'lazy',
  ...otherProps
}: ImageProps & { src: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const isSVG = /.svg/.test(otherProps.src)

  return (
    <NextImage
      data-fs-image
      loader={isSVG ? undefined : loader}
      loading={loading}
      {...otherProps}
    />
  )
}

Image.displayName = 'Image'
export default memo(Image)
