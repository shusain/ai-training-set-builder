import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageData {
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  private imageList$ = new BehaviorSubject<ImageData[]>([]);
  images: ImageData[] = [];

  addImage(image: string, description: string): void {
    this.images.push({ image, description });
    this.imageList$.next(this.images.slice(0))
  }
  getImageList() {
    return this.imageList$.asObservable();
  }

  updateImageList(index: number, imageData: ImageData) {
    const newList = this.imageList$.getValue();
    newList[index] = imageData;
    this.imageList$.next(newList);
  }

  saveImagesToFolder(folderPath: string): void {
    // Implement logic to save images and their descriptions to the target folder
    // You may need to use a server-side solution like Node.js to save files to the local file system
  }
}
