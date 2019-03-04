import { VideoService } from './../../services/video.service';
import { Component, OnInit } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css']
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;
  selectedVideo: Video;
  hideNewVideo = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.selectedVideo);
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.hideNewVideo = true;
      this.selectedVideo = resNewVideo;
    });
  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video)
    .subscribe(resUpdateVideo => video = resUpdateVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    const videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeletedVideo => {
      for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i]._id === video._id) {
          videoArray.splice(i, 1);
        }
      }
    });
    this.selectedVideo = null;
  }

  newVideo() {
    this.hideNewVideo = false;
  }

}
