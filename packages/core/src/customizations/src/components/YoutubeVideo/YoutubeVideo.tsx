type YoutubeVideoProps = {
  src: string
  title?: string
  height?: number
  width?: number
}

const YoutubeVideo = ({
  src,
  title = 'YouTube video player',
  height = 315,
  width = 560,
}: YoutubeVideoProps) => {
  return (
    <iframe
      height={height}
      width={width}
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  )
}

export default YoutubeVideo
