import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {

  constructor() { }

  enterFullscreen(): void {
    if (document.documentElement.requestFullscreen) {
      console.log('Requesting Fullscreen mode;')
      document.documentElement.requestFullscreen();
    }
  }

  exitFullscreen(): void {
    if (document.exitFullscreen) {
      console.log('Requesting exit Fullscreen mode;')
      document.exitFullscreen();
    }
  }
}
