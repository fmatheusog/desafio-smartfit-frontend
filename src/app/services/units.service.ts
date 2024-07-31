import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import UnitsResponse from '../types/units-response.interface';
import Location from '../types/location.interface';

@Injectable({
  providedIn: 'root',
})
export class UnitsService {
  readonly url =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([]);
  private allUnits$: Observable<Location[]> = this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<UnitsResponse>(this.url).subscribe((response) => {
      this.allUnitsSubject.next(response.locations);
      this.filteredUnits = response.locations;
    })
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits(): Location[] {
    return this.filteredUnits;
  }

  setFilteredUnits(filteredUnits: Location[]): void {
    this.filteredUnits = filteredUnits;
  }
}
