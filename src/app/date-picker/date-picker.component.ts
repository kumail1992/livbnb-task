import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { addMonths, endOfMonth } from 'date-fns';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatDatepickerModule, MatButtonModule],
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
