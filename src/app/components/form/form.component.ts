import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UnitsService } from '../../services/units.service';
import Location from '../../types/location.interface';
import { FilterUnitsService } from '../../services/filter-units.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitsService: UnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '06h às 12h',
      showClosed: true,
    });

    this.unitsService.getAllUnits().subscribe((response) => {
      this.results = response.locations;
      this.filteredResults = this.results;
    });
  }

  onSubmit(): void {
    this.filteredResults = this.filterUnitsService.filterUnits(
      this.results,
      this.formGroup.value.showClosed,
      this.formGroup.value.hour
    );
  }

  onClean(): void {
    this.formGroup.reset({
      hour: '06h às 12h',
      showClosed: true,
    });

    this.filteredResults = this.results;
  }
}
