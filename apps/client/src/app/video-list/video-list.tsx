import { useEffect, useState } from 'react';
import styles from './video-list.module.css';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface VideoListProps {}

export function VideoList(props: VideoListProps) {
  const [vids, setVids] = useState<string[]>([]);
  useEffect(() => {
    fetch('http://localhost:3333/videos')
      .then((res) => res.json())
      .then((data) => setVids(data.files));
  }, []);

  return (
    <div className={styles.movieList}>
      {vids.map((m, i) => (
        <div key={i} className={styles.movieItem}>
          <Link to={`/videos/${m}`}>
            <p>{m}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default VideoList;
