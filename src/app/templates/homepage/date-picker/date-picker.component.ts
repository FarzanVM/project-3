import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { myHolidayDates } from './holidays';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  myHolidayDates: any[] = myHolidayDates
  today: Date = new Date(new Date().toISOString().split('T')[0]);
  // delivery Form
  deliveryForm = this.fb.group({
    deliverydate: new FormControl('')
  })
  constructor(private renderer: Renderer2, private fb: FormBuilder) { }
  ngOnInit(){
    
  }


  // styling holidays
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate: { getTime: () => any; }, view: string) => {

    const date = cellDate.getTime();

    if (view == 'month') {
      return this.myHolidayDates.find(x => x.date.getTime() == date) ? 'holiday' : "";
    }
    return "";
  }

  // function to get the holiday on each month and adding description
  displayHoliday() {
    let elements = document.querySelectorAll(".holiday");
    console.log("holi",elements)
    elements.forEach(el => {
      let date = el.getAttribute("aria-label")
      if (date) {
        let newdate = new Date(date)

        for (let item of this.myHolidayDates) {
          if (item.date.getTime() == newdate.getTime()) {

            let span = el.querySelectorAll('span')[0];
            span.classList.add('tooltip')
            let nxtspan = document.createElement('span');
            nxtspan.innerHTML = item.name
            nxtspan.classList.add('tooltiptext')
            span.appendChild(nxtspan);
            break;
            break;
          }
        }

      }
    })
  }

  // function to format the date(month and year)
  customizeCal() {

    let dateBtn = document.querySelectorAll(".mat-mdc-button .mdc-button__label")
    let fullDate = dateBtn[0].childNodes[0].childNodes[0].nodeValue; // Ex. Oct 2023

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
            this.displayHoliday();
          // })
        })
      )
      this.customizeCal();
      this.displayHoliday();
    })

  }

  // filtering weekends and disabling them
  filterWeekends = (d: Date | null): boolean => {
    const day = d?.getDay();
    const time = d?.getTime();
    const dateRange = [new Date(new Date().getFullYear(), 0, 1),
    new Date(new Date().getFullYear(), 23, 31)]

    return day !== 0 && day !== 6 && !this.myHolidayDates.find(x => x.date.getTime() == time) && (d >= dateRange[0] && d <= dateRange[1]);

  }

}
