import { Injectable } from '@angular/core';

import Location from '../types/location.interface';

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  getWeekDays() {
    const day = new Date().getDay();

    switch (day) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  formatHour(hour: string) {
    return hour
      .replace('h', '')
      .trim()
      .split('às')
      .map((h) => parseInt(h));
  }

  validateHour(
    showClosed: boolean,
    hour: string,
    weekDays: string,
    unit: Location
  ) {
    if (unit.schedules) {
      return unit.schedules.some((schedule) => {
        if (schedule.weekdays === weekDays) {
          if (!showClosed && schedule.hour !== 'Fechada') {
            const [start, end] = this.formatHour(hour);
            const [scheduleStart, scheduleEnd] = this.formatHour(schedule.hour);

            return start >= scheduleStart && end <= scheduleEnd;
          } else {
            return showClosed;
          }
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }

  filterUnits(
    units: Location[],
    showClosed: boolean,
    hour: string
  ): Location[] {
    return units.filter((unit) => {
      return this.validateHour(showClosed, hour, this.getWeekDays(), unit);
    });
  }
}
