import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

import { DownloadService } from '../../services/download.service';
<<<<<<< HEAD:src/app/cartaporte/pages/list/list.component.ts
import { interval } from 'rxjs';

const ELEMENT_DATA = [
  {
    date: '20/12/2023',
    key: '#TUL-1023-201223',
    generated: false,
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#PRM-1023-201223',
    generated: false,
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#PCH-1023-201223',
    generated: false,
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#UNI-1023-201223',
    generated: true,
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#CTR-1023-201223',
    generated: true,
    pdfLink: 'documentoPDF.pdfe',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#SLP-1023-201223',
    generated: true,
    pdfLink: 'documentoPDF.pdf',
    xmlLink: 'documentoXML.xml',
    completeLink: 'Ver',
  },
];
=======
import { CartaPorteService } from '../../services/cartaporte.service';
import { CartaPorte } from '../../interfaces/cartaporte.interface';
>>>>>>> develop:src/app/modules/carta-porte/pages/list/list.component.ts

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  private cartaPorteService: CartaPorteService = inject(CartaPorteService);
  private downloadService: DownloadService = inject(DownloadService);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  private displayedColumnsTablet: string[] = [
    'date',
    'key',
    'generated',
    'archives',
    'actions',
  ];
  private displayedColumnsPhone: string[] = ['date', 'key', 'actions'];

  public displayedColumns: string[] = [];
  public minWidth: number = 480;
  public screenWidth: number = window.innerWidth;
  public isLoading: boolean = true;
  public cartasPorte?: CartaPorte[];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setColumns();
  }

  ngOnInit(): void {
    this.setColumns();
    this.getCartasPorte();
  }

  public downloadFile(filename: string): void {
    this.downloadService.downloadFile(filename);
  }

  private getCartasPorte(): void {
    this.isLoading = true;
    this.cartaPorteService.getList().subscribe((cartasPorte: CartaPorte[]) => {
      this.cartasPorte = cartasPorte;
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
