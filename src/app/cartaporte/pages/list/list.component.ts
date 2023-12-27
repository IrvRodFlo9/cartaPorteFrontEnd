import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';

import { DownloadService } from '../../services/download.service';
import { interval } from 'rxjs';

const ELEMENT_DATA = [
  {
    date: '20/12/2023',
    key: '#TUL-1023-201223',
    status: 'Por Generar',
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#PRM-1023-201223',
    status: 'Por Generar',
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#PCH-1023-201223',
    status: 'Por Generar',
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#UNI-1023-201223',
    status: 'Generada',
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#CTR-1023-201223',
    status: 'Generada',
    pdfLink: 'documentoPDF.pdfe',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#SLP-1023-201223',
    status: 'Generada',
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private downloadService: DownloadService = inject(DownloadService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public displayedColumns: string[] = [
    'date',
    'key',
    'status',
    'archives',
    'actions',
  ];
  public dataSource = ELEMENT_DATA;
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.getList();
  }

  public getList(): void {
    interval(1500).subscribe(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  public downloadFile(filename: string): void {
    this.downloadService.downloadFile(filename);
  }
}
