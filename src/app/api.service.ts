import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageData } from './image-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  saveImageAndDescription(imageData: ImageData, folderPath: string) {
    const formData = new FormData();
    formData.append('folderPath', folderPath);
    formData.append('description', imageData.description);
    formData.append('image', this.dataURLtoFile(imageData.image, 'image.png'));

    return this.http.post(`${this.apiUrl}/save`, formData);
  }

  private dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const firstArrayElem = arr[0];
    const mime = firstArrayElem.match(/:(.*?);/)?.[1] || '';

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
