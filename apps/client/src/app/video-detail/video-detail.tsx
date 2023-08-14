import { useLoaderData, useLocation, useParams } from 'react-router';
import styles from './video-detail.module.css';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface VideoDetailProps {}

const STREAM_URL = 'http://localhost:3333/videos';

export function VideoDetail(props: VideoDetailProps) {
  const { filename } = useParams();
  const location = useLocation();

  // useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <h1>{filename}</h1>
      <video className={styles.video} controls preload="auto" autoPlay>
        <source
          src={`${STREAM_URL}/watch?path=${location.state.fullPath}`}
          type="video/mp4"
        ></source>
      </video>
    </div>
  );
}

export default VideoDetail;
