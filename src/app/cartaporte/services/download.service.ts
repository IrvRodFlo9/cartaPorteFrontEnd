import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  private http: HttpClient = inject(HttpClient);

  public downloadFile(filename: string): void {
    const fileUrl = `${environment.download.baseURL}/${filename}`;

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });

      const downloadInstance = document.createElement('a');
      downloadInstance.href = window.URL.createObjectURL(blob);
      downloadInstance.download = filename;
      document.body.appendChild(downloadInstance);
      downloadInstance.click();
      document.body.removeChild(downloadInstance);
      window.URL.revokeObjectURL(downloadInstance.href);
    });
  }
}
