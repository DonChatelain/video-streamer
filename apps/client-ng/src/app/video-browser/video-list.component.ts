import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSerializer, UrlTree } from '@angular/router';
import { VideoService } from '../video-service.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { VideoListItem } from '@org/types';

@Component({
  providers: [VideoService],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  selector: 'org-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit {
  movies: VideoListItem[] = [];
  videos: VideoListItem[] = [];
  @Input()
  viewToggle!: SupportedTab;
  videoSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private urlSerializer: UrlSerializer
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.viewToggle = (params.get('folder') as SupportedTab) || 'movies';
      this.setQueryParams(this.viewToggle);
    });

    this.videoSub = this.videoService
      .getVideos('movies')
      .subscribe((m) => (this.movies = m.files));

    this.videoSub = this.videoService
      .getVideos('videos')
      .subscribe((m) => (this.videos = m.files));
  }

  toggleMovies() {
    const tab = 'movies';
    this.setQueryParams(tab);
    this.viewToggle = tab;
  }

  toggleVideos() {
    const tab = 'videos';
    this.setQueryParams(tab);
    this.viewToggle = tab;
  }

  isToggleActive(tab: SupportedTab) {
    return this.viewToggle === tab;
  }

  private setQueryParams(folder: SupportedTab) {
    const url = new URL(location.href);
    url.searchParams.set('folder', folder);
    history.pushState({}, '', url);
  }
}

type SupportedTab = 'movies' | 'videos';
