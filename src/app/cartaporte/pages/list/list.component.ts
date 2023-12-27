import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

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

  private displayedColumnsTablet: string[] = [
    'date',
    'key',
    'status',
    'archives',
    'actions',
  ];
  private displayedColumnsPhone: string[] = ['date', 'key', 'actions'];

  public dataSource = ELEMENT_DATA;
  public displayedColumns: string[] = [];
  public minWidth: number = 480;
  public screenWidth: number = window.innerWidth;
  public isLoading: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setColumns();
  }

  ngOnInit(): void {
    this.getList();
    this.setColumns();
  }

  public downloadFile(filename: string): void {
    this.downloadService.downloadFile(filename);
  }

  private getList(): void {
    interval(1500).subscribe(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  private setColumns(): void {
    this.screenWidth = window.innerWidth;
    this.displayedColumns =
      this.screenWidth > this.minWidth
        ? this.displayedColumnsTablet
        : this.displayedColumnsPhone;
  }
}
