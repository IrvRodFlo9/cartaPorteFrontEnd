import { Component } from '@angular/core';

const ELEMENT_DATA = [
  {
    date: '20/12/2023',
    key: '#TUL-1023-201223',
    status: 'Generada',
    pdfLink: 'H',
    xmlLink: 'H',
    completeLink: 'Ver',
  },
  {
    date: '20/12/2023',
    key: '#CTR-1023-201223',
    status: 'Por Generar',
    pdfLink: 'He',
    xmlLink: 'H',
    completeLink: 'Ver',
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns: string[] = ['date', 'key', 'status', 'archives', 'actions'];
  dataSource = ELEMENT_DATA;
}
