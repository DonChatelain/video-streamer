import { Component, OnInit } from '@angular/core';
import { VideoService } from '../video-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  providers: [VideoService],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  selector: 'org-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css'],
})
export class VideoDetailComponent implements OnInit {
  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
