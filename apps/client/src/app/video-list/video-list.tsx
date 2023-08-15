import { Suspense, useEffect, useRef, useState } from 'react';
import styles from './video-list.module.css';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { VideoItem } from './video-item';
import { VideoListItem } from '@org/types';

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

  if (movieQuery.error instanceof Error || videoQuery.error instanceof Error) {
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

export default VideoList;
