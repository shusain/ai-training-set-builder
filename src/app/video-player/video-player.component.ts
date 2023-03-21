import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent {
  @ViewChild('videoPlayer', { static: false }) videoPlayer?: ElementRef;

  selectedFile?: File;
  videoSrc: any;
  isPlaying: boolean = false;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.videoSrc = reader.result;
    };
    if(this.selectedFile)
      reader.readAsDataURL(this.selectedFile);
  }

  playPauseVideo(): void {
    const video = this.videoPlayer?.nativeElement;
    if (this.isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  moveFrame(step: number): void {
    const video = this.videoPlayer?.nativeElement;
    video.pause();
    this.isPlaying = false;
    video.currentTime += step / video.playbackRate;
  }
}
