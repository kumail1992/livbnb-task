import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { addMonths, startOfMonth } from 'date-fns';
import * as $ from 'jquery';
import 'round-slider';
import { DatePickerComponent } from './date-picker/date-picker.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  _dialog = inject(MatDialog);
  startDate!: Date;
  endDate!: Date;
  ngOnInit() {
    this.init();
    this.setupDates(new Date(), true);
  }

  init() {
    let slider: any = $('#monthWidget');
    slider.roundSlider({
      sliderType: 'min-range',
      min: 0,
      max: 12,
      value: 3,
      startAngle: 90,
      editableTooltip: false,
      radius: 150,
      width: 50,
      tooltipFormat: this.setToolTip,
      change: (args: any) => {
        let updatedValue = args.value === 0 ? 1 : args.value;
        if (args.value === 0) {
          slider.roundSlider('setValue', 1);
        }
        this.updateEndDate(updatedValue);
      },
    });
  }

  setToolTip(args: any) {
    let caption = args.value <= 1 ? 'month' : 'months';
    return `<span class="text-8xl font-bold">${args.value}</span><br><span class='font-bold text-base'>${caption}</span>`;
  }

  setupDates(startDate: Date, isInitial?: boolean) {
    let slider: any = $('#monthWidget');
    this.startDate = isInitial
      ? startOfMonth(addMonths(startDate, 1))
      : startDate;
    this.endDate = addMonths(this.startDate, slider.roundSlider('getValue'));
  }

  updateEndDate(val: number) {
    this.endDate = addMonths(this.startDate, val);
  }

  openDatePicker() {
    const dialogRef = this._dialog.open(DatePickerComponent, {
      data: this.startDate,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newStartDate: Date) => {
      if (newStartDate) {
        this.setupDates(newStartDate);
      }
    });
  }
}
