import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Socket } from 'ngx-socket-io';



@Component({
selector: 'app-root',
standalone: false,
templateUrl: './app.component.html',
styleUrl: './app.component.css'
})
export class AppComponent {
@ViewChild('videoElement') videoElement: ElementRef;
@ViewChild('canvasElement') canvas: ElementRef;
private videoStream: MediaStream;

constructor(private socket: Socket) { }

ngOnInit(): void {
  this.startCapture();
  this.socket.emit('chat_message', 'Test');
}

startCapture(): void {
  navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    this.videoStream = stream;
    this.videoElement.nativeElement.srcObject = stream;
    const recorder: MediaRecorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
      console.log(this.convert());
    }
    recorder.start(500);
  })
  .catch((error) => {
    console.error('Error accessing webcam:', error);
  });
}

convert() {
  let canvas = this.canvas.nativeElement as HTMLCanvasElement;
  const video = this.videoElement.nativeElement;
  canvas.width = 200;
  canvas.height = 200;
  canvas.getContext('2d').drawImage(video, 0, 0, 200,200);  
  this.socket.emit('frame', canvas.toDataURL()); 
}
}
