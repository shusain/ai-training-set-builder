import { Injectable } from '@angular/core';

export interface ImageData {
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  images: ImageData[] = [];

  addImage(image: string, description: string): void {
    this.images.push({ image, description });
  }

  saveImagesToFolder(folderPath: string): void {
    // Implement logic to save images and their descriptions to the target folder
    // You may need to use a server-side solution like Node.js to save files to the local file system
  }
}
