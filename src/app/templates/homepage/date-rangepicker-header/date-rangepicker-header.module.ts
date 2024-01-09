import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { SharedModule } from 'src/app/customisation/shared/shared.module';
import { DateRagePickerHeader } from './date-rangepicker-header.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [DateRagePickerHeader],
  imports: [
    CommonModule,
    // SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatMomentDateModule
    // MatSelectModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DateRagePickerHeader]
})
export class DateRagePickerHeaderModule {}
