import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

const config: SocketIoConfig = { url: 'http://socketteletraan.duckdns.org:5000/', options: {} };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    CommonModule,
    SocketIoModule.forRoot(config)
  ],
  bootstrap: [AppComponent]
})
export class AppModule 
{
  
}
