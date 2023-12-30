import { Component, Input } from '@angular/core';

@Component({
  selector: 'info-label',
  templateUrl: './info-label.component.html',
  styleUrls: ['./info-label.component.scss'],
})
export class InfoLabelComponent {
  @Input() public labelName: string = '';
}
