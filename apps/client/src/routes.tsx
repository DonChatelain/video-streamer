import { RouteObject } from 'react-router';
import App from './app/app';
import VideoList from './app/video-list/video-list';
import VideoDetail from './app/video-detail/video-detail';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/videos',
    element: <VideoList />,
  },
  {
    path: '/videos/:filename',
    element: <VideoDetail />,
  },
];
