# Android PKG Download

## App Install Service

```ts
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
export interface AppVersion {
  version: string;
  minAndroidVersion: string;
  downloadUrl: string;
}
@Injectable({ providedIn: "root" })
export class AppInstallService {
  private readonly APP_INFO: AppVersion = {
    version: "0.0.1",
    minAndroidVersion: "7.0",
    downloadUrl:
    "https://pkgs.dev.azure.com/" +
    "<companycloud>" +
    "/_apis/packaging/feeds/<FEEDNAME>" +
    "/packages/<artifact-name-app>" +
    "/versions/0.0.1/content",
  };
  constructor(private http: HttpClient) {}

  isAndroidDevice(): boolean {
    return /android/i.test(navigator.userAgent);
  }
  getAppInfo(): Observable<AppVersion> {
    return of(this.APP_INFO);
  }
  downloadApp(): void {
    window.location.href = this.APP_INFO.downloadUrl;
  }
}
```

## App Download Button Component

```ts
// components/app-download-button.component.ts
import { Component, OnInit } from "@angular/core";
import { AppInstallService, AppVersion } from "../services/app-install.service";
@Component({
  selector: "app-download-button",
  template: `
    <div *ngIf="showButton" class="download-container">
      <button (click)="onDownloadClick()" class="download-button">
        Download Android App
      </button>
      <div class="version-info">Version {{ appInfo?.version }}</div>
    </div>
  `,
  styles: [
    `
      .download-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 16px;
      }
      .download-button {
        padding: 12px 24px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.3s ease;
      }
      .download-button:hover {
        background-color: #45a049;
      }
      .version-info {
        font-size: 0.875rem;
        color: #666;
      }
    `,
  ],
})
export class AppDownloadButtonComponent implements OnInit {
  showButton = false;
  appInfo: AppVersion | null = null;
  constructor(private appInstallService: AppInstallService) {}
  ngOnInit() {
    // Only show for Android devices
    this.showButton = this.appInstallService.isAndroidDevice();
    if (this.showButton) {
      this.appInstallService.getAppInfo().subscribe((info) => {
        this.appInfo = info;
      });
    }
  }
  onDownloadClick() {
    this.appInstallService.downloadApp();
  }
}
```

## Registration in AppModule

```ts
// app.module.ts
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppDownloadButtonComponent } from "./components/app-download-button.component";
import { AppInstallService } from "./services/app-install.service";
@NgModule({
  declarations: [AppDownloadButtonComponent],
  imports: [HttpClientModule],
  providers: [AppInstallService],
  exports: [AppDownloadButtonComponent],
})
export class AppModule {}
```

## Usage in HTML

```html
<app-download-button></app-download-button>
```

## Optional: Notifying Unsupported Devices

```ts
showNotSupportedMessage(): void {
  if (!this.appInstallService.isAndroidDevice()) {
    alert("This app is only available for Android devices");
  }
}
```

## Optional: Download Progress

```ts
// services/app-install.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface AppVersion {
  version: string;
  minAndroidVersion: string;
  downloadUrl: string;
  releaseDate: string;
  changes?: string[];
}

export interface DownloadProgress {
  progress: number;
  status: 'idle' | 'downloading' | 'completed' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class AppInstallService {
  private readonly STORAGE_KEY = 'app-install-preferences';
  private readonly APP_INFO: AppVersion = {
    version: '0.0.1',
    minAndroidVersion: '7.0',
   downloadUrl:
    "https://pkgs.dev.azure.com/" +
    "<companycloud>" +
    "/_apis/packaging/feeds/<FEEDNAME>" +
    "/packages/<artifact-name-app>" +
    "/versions/0.0.1/content",
    releaseDate: '2024-11-11',
    changes: [
      'Initial release',
      'Basic functionality implemented'
    ]
  };

  private downloadProgress = new BehaviorSubject<DownloadProgress>({
    progress: 0,
    status: 'idle'
  });

  constructor(private http: HttpClient) {}

  isAndroidDevice(): boolean {
    return /android/i.test(navigator.userAgent);
  }

  getAppInfo(): Observable<AppVersion> {
    return of(this.APP_INFO);
  }

  getDownloadProgress(): Observable<DownloadProgress> {
    return this.downloadProgress.asObservable();
  }

  downloadApp(): Observable<number> {
    this.downloadProgress.next({ progress: 0, status: 'downloading' });

    return this.http.get(this.APP_INFO.downloadUrl, {
      responseType: 'blob',
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.DownloadProgress) {
          const progress = Math.round((event.loaded / (event.total || 100)) * 100);
          this.downloadProgress.next({ progress, status: 'downloading' });
          return progress;
        }
        if (event.type === HttpEventType.Response) {
          this.downloadProgress.next({ progress: 100, status: 'completed' });
          this.triggerDownload(event.body!);
          return 100;
        }
        return 0;
      })
    );
  }

  private triggerDownload(blob: Blob): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `<package-name>-${this.APP_INFO.version}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  getUserPreferences(): { dontShowAgain: boolean, lastDismissedVersion: string } {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { dontShowAgain: false, lastDismissedVersion: '' };
  }

  setUserPreferences(preferences: { dontShowAgain: boolean, lastDismissedVersion: string }): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
  }

  shouldShowPrompt(): boolean {
    const prefs = this.getUserPreferences();
    if (prefs.dontShowAgain && prefs.lastDismissedVersion === this.APP_INFO.version) {
      return false;
    }
    return true;
  }

  compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;

      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }

    return 0;
  }
}
```

## Optional: Download Button with Progress

```ts
// components/app-download-button.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppInstallService, AppVersion, DownloadProgress } from '../services/app-install.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-download-button',
  template: `
    <div *ngIf="showPrompt" class="download-container">
      <div class="card">
        <div class="card-header">
          <h3>New version available!</h3>
          <span class="version">v{{ appInfo?.version }}</span>
        </div>

        <div class="card-body">
          <div class="changes" *ngIf="appInfo?.changes">
            <h4>What's new:</h4>
            <ul>
              <li *ngFor="let change of appInfo.changes">{{ change }}</li>
            </ul>
          </div>

          <div class="actions">
            <button
              [disabled]="downloadStatus.status === 'downloading'"
              (click)="onDownloadClick()"
              class="download-button">
              <span *ngIf="downloadStatus.status === 'idle'">
                Download Android App
              </span>
              <span *ngIf="downloadStatus.status === 'downloading'">
                Downloading... {{ downloadStatus.progress }}%
              </span>
              <span *ngIf="downloadStatus.status === 'completed'">
                Download Complete!
              </span>
            </button>

            <div class="progress-bar" *ngIf="downloadStatus.status === 'downloading'">
              <div class="progress" [style.width.%]="downloadStatus.progress"></div>
            </div>
          </div>

          <div class="preferences">
            <label class="checkbox-label">
              <input
                type="checkbox"
                [checked]="dontShowAgain"
                (change)="onDontShowAgainChange($event)">
              Don't show this again for this version
            </label>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .download-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 300px;
      overflow: hidden;
    }

    .card-header {
      padding: 16px;
      background: #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-header h3 {
      margin: 0;
      font-size: 1.1rem;
    }

    .version {
      font-size: 0.9rem;
      color: #666;
    }

    .card-body {
      padding: 16px;
    }

    .changes {
      margin-bottom: 16px;
    }

    .changes h4 {
      margin: 0 0 8px 0;
      font-size: 0.9rem;
      color: #666;
    }

    .changes ul {
      margin: 0;
      padding-left: 20px;
      font-size: 0.9rem;
    }

    .download-button {
      width: 100%;
      padding: 12px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .download-button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }

    .download-button:not(:disabled):hover {
      background-color: #45a049;
    }

    .progress-bar {
      margin-top: 8px;
      height: 4px;
      background: #e0e0e0;
      border-radius: 2px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: #4CAF50;
      transition: width 0.3s ease;
    }

    .preferences {
      margin-top: 16px;
      font-size: 0.8rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  `]
})
export class AppDownloadButtonComponent implements OnInit, OnDestroy {
  showPrompt = false;
  appInfo: AppVersion | null = null;
  dontShowAgain = false;
  downloadStatus: DownloadProgress = {
    progress: 0,
    status: 'idle'
  };

  private subscription = new Subscription();

  constructor(private appInstallService: AppInstallService) {}

  ngOnInit() {
    if (this.appInstallService.isAndroidDevice()) {
      this.showPrompt = this.appInstallService.shouldShowPrompt();
      this.dontShowAgain = !this.showPrompt;

      if (this.showPrompt) {
        this.appInstallService.getAppInfo().subscribe(info => {
          this.appInfo = info;
        });

        this.subscription.add(
          this.appInstallService.getDownloadProgress().subscribe(status => {
            this.downloadStatus = status;
          })
        );
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDownloadClick() {
    this.appInstallService.downloadApp().subscribe();
  }

  onDontShowAgainChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.dontShowAgain = checkbox.checked;

    this.appInstallService.setUserPreferences({
      dontShowAgain: this.dontShowAgain,
      lastDismissedVersion: this.appInfo?.version || ''
    });
  }
}
```
