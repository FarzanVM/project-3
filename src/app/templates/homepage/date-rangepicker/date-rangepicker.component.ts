import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateRagePickerHeader } from '../date-rangepicker-header/date-rangepicker-header.component';

@Component({
  selector: 'app-date-rangepicker',
  templateUrl: './date-rangepicker.component.html',
  styleUrls: ['./date-rangepicker.component.scss']
})
export class DateRangepickerComponent implements OnInit {

  //daterangepicker header component
  dateRagePickerHeader = DateRagePickerHeader;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });


  constructor(private renderer: Renderer2) { }
  ngOnInit(){
  
  }
  // function to format the date(month and year)
  customizeCal() {

    let dateBtn = document.querySelectorAll(".mat-mdc-button .mdc-button__label")

    let fullDate = dateBtn[0].childNodes[0].childNodes[0].nodeValue; // Ex. Oct 2023
    console.log("Default date",fullDate)

    let newMonth: any = (new Date(fullDate)).toLocaleString('en', { month: 'long' });

    if (newMonth == 'Invalid Date') {
      newMonth = ""
    }
    let newYear: any = new Date(fullDate).getFullYear();
    if (!newYear) {
      newYear = "Select Year"
    }
    const newFormat = newMonth + ' ' + newYear
    dateBtn[0].childNodes[0].childNodes[0].nodeValue = newFormat
  }
  // customzing the month label again when new month is selected
  customizeMonth() {
    setTimeout(() => {
      this.customizeCal();
    })
  }

  // function to adding a description/tooltip to holidays triggered for each month change
  calOpened(event: Event | void) {
    setTimeout(() => {
      let buttons = document.querySelectorAll("mat-calendar button");
      let yearbtn = document.querySelectorAll(".mat-calendar-controls button")[0]
      let navbtns = document.querySelectorAll(".mat-calendar-controls .mat-mdc-icon-button.mat-mdc-button-base")

      navbtns[0].insertAdjacentElement('beforebegin', navbtns[1])
      yearbtn.classList.add('monthlabel')

      navbtns[1].insertAdjacentElement('afterend', yearbtn)

      buttons.forEach(btn =>
        this.renderer.listen(btn, 'click', () => {
          // setTimeout(() => {
            this.customizeCal();
            // this.displayHoliday();
          // })
        })
      )
      this.customizeCal();
      // this.displayHoliday();
    })

  }

}
