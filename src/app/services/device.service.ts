// src/app/services/device.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private isMobile: boolean = false;

  constructor() {
    this.detectDevice();
  }

  private detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    // Simple mobile detection
    this.isMobile = /android|iphone|ipad|iPod|blackberry|iemobile|opera mini/i.test(userAgent);
  }

  public isMobileDevice(): boolean {
    return this.isMobile;
  }
}
