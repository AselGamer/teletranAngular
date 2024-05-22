import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('videoElement') videoElement: ElementRef;
  @ViewChild('canvasElement') canvas: ElementRef;
  @ViewChild('responseElement') responseElement : ElementRef;
  private videoStream: MediaStream;
  private wait = false;
  public aiResponse = '';

  constructor(private socket: Socket) {}

  ngOnInit(): void {
    this.startCapture();
    this.socket.on('frame', (data: string) => {
      console.log(data);
      if (data != '[]') {
        let result = JSON.parse(data);
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            this.aiResponse += result[i].name;
          }
        }
      }
      this.wait = false;
    });
  }
  
  
  startCapture(): void {
    navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
      setInterval(() => {
        if (this.socket.ioSocket.connected) {
          this.convert();
        }
      }, 500);
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }

  async convert() {
    if (this.wait) {
      return;
    }
    let canvas = this.canvas.nativeElement as HTMLCanvasElement;
    const video = this.videoElement.nativeElement;
    canvas.width = 200;
    canvas.height = 200;
    canvas.getContext('2d').drawImage(video, 0, 0, 200, 200);
    await this.socket.emit('frame', canvas.toDataURL());
    this.wait = true;
  }
}
