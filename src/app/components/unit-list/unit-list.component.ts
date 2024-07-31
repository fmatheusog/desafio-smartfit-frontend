import { Component, Input } from '@angular/core';

import Location from '../../types/location.interface';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss'
})
export class UnitListComponent {
  @Input() unitsLits: Location[] = [];

  constructor() {}
}
