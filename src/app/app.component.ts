import { Component, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageStorageService, ImageData } from './image-storage.service';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'video-text-prompt';
  imageChangedEvent: any = '';
  imageTempFile?: File;
  croppedImage: any = '';
  speechRecognition: SpeechRecognition | null = null;
  promptText: string = '';
  @ViewChild(VideoPlayerComponent, { static: false })
  videoPlayerComponent?: VideoPlayerComponent;

  folderPath = '';

  constructor(private imageStorageService: ImageStorageService, private apiService: ApiService) {}
  saveAllImagesAndDescriptions(folderPath: string) {
    this.imageStorageService.images.forEach((imageData) => {
      this.apiService.saveImageAndDescription(imageData, folderPath).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    });
  }
  
  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  startSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported by your browser. Please use Chrome.');
    } else {
      this.speechRecognition = new webkitSpeechRecognition();
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = false;
      this.speechRecognition.lang = 'en-US';
      this.speechRecognition.start();

      this.speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
        this.promptText = event.results[0][0].transcript;
      };
    }
  }

  stopSpeechRecognition() {
    if (this.speechRecognition) {
      this.speechRecognition.stop();
      this.speechRecognition = null;
    }
  }
  savePrompt() {
    this.imageStorageService.addImage(this.croppedImage, this.promptText);
  }
  
  setCurrentFrameAsImage() {
    const video = this.videoPlayerComponent?.videoPlayer?.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      if(blob)
      this.imageTempFile = new File([blob], 'cropped-image.png', {
        type: 'image/png',
      });
    })
  }
  
}
