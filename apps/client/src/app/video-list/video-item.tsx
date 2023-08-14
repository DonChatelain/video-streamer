import { VideoListItem } from '@org/video-repo';
import styles from './video-list.module.css';
import { Link } from 'react-router-dom';
import { humanFileSize } from '../util';

interface VideoItemProps {
  videoItem: VideoListItem;
}

export function VideoItem({ videoItem }: VideoItemProps) {
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
