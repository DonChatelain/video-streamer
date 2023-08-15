import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, UrlSerializer } from '@angular/router';
import { VideoListItem } from '@org/types';

@Component({
  providers: [VideoService],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  selector: 'org-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  // video!: VideoListItem;
  videoFilename = '';
  videoFullPath = '';

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private urlSerializer: UrlSerializer
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.videoFilename = params.get('filename') || 'Filename Not Found';
      this.videoFullPath = params.get('fullPath') || '';
    });
  }

  getVideoSource(path: string) {
    return this.videoService.getVideoSourceUrl(path);
  }
}
