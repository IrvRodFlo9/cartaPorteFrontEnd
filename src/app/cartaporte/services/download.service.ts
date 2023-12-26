import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/envitonment';

@Injectable({ providedIn: 'root' })
export class DownloadService {
  private http: HttpClient = inject(HttpClient);

  public downloadFile(filename: string): void {
    const fileUrl = `${environment.download.baseURL}/${filename}`;

    this.http.get(fileUrl, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });

      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(a.href);
    });
  }
}
