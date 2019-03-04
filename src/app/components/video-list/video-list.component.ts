import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Video } from '../video';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {

  @Input() videos: String;
  @Output() SelectVideo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(vid: Video) {
    this.SelectVideo.emit(vid);
  }

}
