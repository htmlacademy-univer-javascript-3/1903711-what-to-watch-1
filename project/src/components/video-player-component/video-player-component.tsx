import { useEffect, useRef } from 'react';

type PreviewPlayerProps = {
  srcImage: string,
  previewVideo: string,
};

function VideoPlayerComponent({srcImage, previewVideo}: PreviewPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    const delay: NodeJS.Timeout = setTimeout( () => videoRef.current?.play(), 1000);

    return () => clearTimeout(delay);
  });

  return (
    <video ref={ videoRef } poster={ srcImage } loop muted width="280" height="175">
      <source src={ previewVideo } type="video/mp4" />
    </video>
  );
}

export default VideoPlayerComponent;
