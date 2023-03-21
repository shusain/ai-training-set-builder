import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { PreviewComponent } from './preview/preview.component'
@NgModule({
  declarations: [AppComponent, VideoPlayerComponent, PreviewComponent],
  imports: [BrowserModule, ImageCropperModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MatTabsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
