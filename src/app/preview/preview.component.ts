import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageData, ImageStorageService } from '../image-storage.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input() croppedImage?: string;
  imageList: ImageData[] = [];
  selectedIndex: number | null = null;
  private imageListSubscription?: Subscription;
  folderPath = '';
  // Add this code inside the PreviewComponent class
  @Output() saveAll = new EventEmitter<string>();

  constructor(private imageService: ImageStorageService) { }

  ngOnInit() {
    this.imageListSubscription = this.imageService.getImageList().subscribe((list) => {
      this.imageList = list;
      if (list.length > 0) {
        this.selectedIndex = list.length - 1;
      }
    });
  }

  ngOnDestroy() {
    this.imageListSubscription?.unsubscribe();
  }

  previous() {
    if (this.selectedIndex !== null && this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  next() {
    if (this.selectedIndex !== null && this.selectedIndex < this.imageList.length - 1) {
      this.selectedIndex++;
    }
  }


  saveAllImagesAndDescriptions(folderPath: string) {
    this.saveAll.emit(folderPath);
  }

  updatePromptText(promptText: string) {
    if (this.selectedIndex !== null) {
      const updatedImageData = { ...this.imageList[this.selectedIndex], promptText };
      this.imageService.updateImageList(this.selectedIndex, updatedImageData);
    }
  }
}
