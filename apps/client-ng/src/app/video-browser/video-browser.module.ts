import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list.component';
import { VideoDetailComponent } from '../video-detail/video-detail.component';
import { VideoService } from '../video-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [VideoDetailComponent],
  providers: [VideoService],
  imports: [RouterModule, HttpClientModule],
})
export class VideoBrowserModule {}
