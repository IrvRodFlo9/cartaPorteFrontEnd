import { Injectable, inject } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  private baseURL = `${environment.api.baseURL}/invoices`;

  public downloadFile(fileName: string): void {
    const fileUrl = `${this.baseURL}/${fileName}`;

    const downloadInstance = document.createElement('a');
    downloadInstance.href = fileUrl;
    downloadInstance.target = '_blank';
    downloadInstance.download = fileName;
    document.body.appendChild(downloadInstance);
    downloadInstance.click();
    document.body.removeChild(downloadInstance);
  }
}
