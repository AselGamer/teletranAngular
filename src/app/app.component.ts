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
  private videoStream: MediaStream;

  constructor(private socket: Socket) { }
  
  ngOnInit(): void {
    this.startCapture();
    this.socket.emit("chat_message", )
  }

  startCapture() : void {
    navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      this.videoStream = stream;
      this.videoElement.nativeElement.srcObject = stream;
    })
    .catch((error) => {
      console.error('Error accessing webcam:', error);
    });
  }
}
