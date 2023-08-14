import { Suspense, useEffect, useRef, useState } from 'react';
import styles from './video-list.module.css';
import { Link, useSearchParams } from 'react-router-dom';
import { VideoListItem } from '@org/video-repo';
import { humanFileSize } from '../util';
import { useQuery } from '@tanstack/react-query';

/* eslint-disable-next-line */
export interface VideoListProps {}

async function getMovies(): Promise<{ files: VideoListItem[] }> {
  return (await fetch(`http://localhost:3333/videos?folder=Movies`)).json();
}
async function getNrop(): Promise<{ files: VideoListItem[] }> {
  return (await fetch(`http://localhost:3333/videos?folder=Videos`)).json();
}

export function VideoList(props: VideoListProps) {
  const box = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = new URLSearchParams(searchParams);
  const [viewToggle, setViewToggle] = useState<string>(
    queryParams.get('viewToggle') || 'movies'
  );

  useEffect(() => {
    setSearchParams({ viewToggle: viewToggle });
  }, [viewToggle, setSearchParams]);

  const movieQuery = useQuery({
    queryKey: ['movies'],
    queryFn: getMovies,
  });

  const videoQuery = useQuery({
    queryKey: ['videos'],
    queryFn: getNrop,
  });

  if (movieQuery.error instanceof Error) {
    return <div>Failed to fetch data</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.controls}>
        <button
          value={'movies'}
          className={viewToggle === 'movies' ? styles.buttonActive : ''}
          onClick={() => setViewToggle('movies')}
        >
          Movies
        </button>
        <button
          value={'videos'}
          className={viewToggle === 'videos' ? styles.buttonActive : ''}
          onClick={() => setViewToggle('videos')}
        >
          Videos
        </button>
      </div>
      <div className={styles.stats}>
        {viewToggle === 'movies' && (
          <span>{movieQuery.data?.files.length + ' movies'}</span>
        )}
        {viewToggle === 'videos' && (
          <span>{videoQuery.data?.files.length + ' videos'}</span>
        )}
      </div>
      <div className={styles.movieList} ref={box}>
        {viewToggle === 'movies' &&
          movieQuery.data?.files.map((m, i) => (
            <VideoItem videoItem={m} key={i} />
          ))}

        {viewToggle === 'videos' &&
          videoQuery.data?.files.map((m, i) => (
            <VideoItem videoItem={m} key={i} />
          ))}
      </div>
    </Suspense>
  );
}

interface VideoItemProps {
  videoItem: VideoListItem;
}

function VideoItem({ videoItem }: VideoItemProps) {
  return (
    <div className={styles.movieItem} id={videoItem.filename}>
      <div>
        <Link
          to={`/videos/${videoItem.filename}`}
          state={{
            fullPath: videoItem.fullPath,
          }}
        >
          <span>{videoItem.filename}</span>
        </Link>
      </div>
      <div>
        <span>{humanFileSize(videoItem.size)}</span>
      </div>
    </div>
  );
}

export default VideoList;
