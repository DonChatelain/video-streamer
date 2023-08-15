import { Route } from '@angular/router';
import { VideoListComponent } from './video-browser/video-list.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'videos',
  },
  {
    path: 'videos',
    component: VideoListComponent,
  },
  {
    path: 'videos/watch',
    component: VideoDetailComponent,
    // redirectTo: 'videos',
    // pathMatch: 'full',
  },
];
