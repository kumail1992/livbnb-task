import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { addMonths, endOfMonth } from 'date-fns';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  selected!: Date;
  minDate = new Date();
  maxDate = endOfMonth(addMonths(this.minDate, 23));
  constructor(
    public dialogRef: MatDialogRef<DatePickerComponent>,
    @Inject(MAT_DIALOG_DATA) public startDate: Date
  ) {}
  ngOnInit(): void {
    this.selected = this.startDate;
  }
}
