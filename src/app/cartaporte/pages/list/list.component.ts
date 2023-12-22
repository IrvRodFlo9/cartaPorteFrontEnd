import { Component, OnInit } from '@angular/core';
import { CartaPorteService } from '../../services/cartaporte.service';

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
export class ListComponent {
  public displayedColumns: string[] = [
    'date',
    'key',
    'status',
    'archives',
    'actions',
  ];
  public dataSource = ELEMENT_DATA;

  constructor(private cartaPorteService: CartaPorteService) {}

  public descargarArchivo(filename: string): void {
    this.cartaPorteService.downloadFile(filename);
  }
}
