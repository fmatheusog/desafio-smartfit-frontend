import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import Location from './types/location.interface';
import { UnitsService } from './services/units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showlist = new BehaviorSubject<boolean>(false);
  unitsList: Location[] = [];

  constructor(private unitsService: UnitsService) {}

  onSubmit() {
    this.unitsList = this.unitsService.getFilteredUnits();
    this.showlist.next(true);
  }

  onClear() {
    this.unitsList = [];
    this.showlist.next(false);
  }
}
