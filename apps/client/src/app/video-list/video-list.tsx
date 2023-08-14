import { Suspense, useEffect, useRef, useState } from 'react';
import styles from './video-list.module.css';
import {
  Link,
  ScrollRestoration,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { VideoListItem } from '@org/video-repo';
import { humanFileSize } from '../util';
import { useScroll, useScrollIntoView } from '@react-hooks-library/core';

/* eslint-disable-next-line */
export interface VideoListProps {}

export function VideoList(props: VideoListProps) {
  const [searchParams] = useSearchParams();
  const [vids, setVids] = useState<VideoListItem[]>([]);
  const box = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(
      `http://localhost:3333/videos?fileExt=${
        searchParams.get('fileExt') || ''
      }`
    )
      .then((res) => res.json())
      .then((data) => setVids(data.files));

    // addEventListener('scroll', function (ev) {
    //   const listItems = document.querySelectorAll(`.${styles.movieItem}`);
    //   listItems.forEach(item => {
    //     if (this.scrollY)
    //   })
    // })
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.movieList} ref={box}>
        {vids.map((m, i) => (
          <div key={i} className={styles.movieItem} id={i.toString()}>
            <div>
              <Link
                to={`/videos/${m.filename}`}
                state={{
                  fullPath: m.fullPath,
                }}
              >
                <span>{m.filename}</span>
              </Link>
            </div>
            <div>
              <span>{humanFileSize(m.size)}</span>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}

export default VideoList;
