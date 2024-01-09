import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from "@angular/core";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatCalendar } from "@angular/material/datepicker";
import moment from "moment";
import { Observable, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DateRangePickerHeaderService } from "./date-rangepicker-header.service";
// import { LanguageService } from "@spartacus/core";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from "@angular/material-moment-adapter";


/** Custom header component for datepicker. */
export const MY_FORMATS = {
  parse: {
    dateInput: 'll',
  },
  display: {
    dateInput: 'll',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'll',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export class CustomDateAdapter extends MomentDateAdapter {
  private _localesData: any;
  private _locales;

  override setLocale(locale: string | any) {
  super.setLocale(locale);
  this._locales = locale;
  let momentLocaleData = moment.localeData(locale);
  this._localesData = {
      narrowDaysOfWeek: momentLocaleData.weekdaysMin()
  };
}
  override getDayOfWeekNames(style) {
  return this._localesData.narrowDaysOfWeek;
}
  override clone(date) {
  return moment(date).clone().locale(this._locales);
}
}
@Component({
    selector: 'date-rangepicker-header',
    templateUrl: './date-rangepicker-header.component.html',
    styleUrls: ['./date-rangepicker-header.component.scss'],
    providers: [
      {
        provide: DateAdapter,
        useClass: CustomDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DateRagePickerHeader<D> implements OnDestroy, OnInit {
    private _destroyed = new Subject<void>();
    editStartDate;

  dateRangeError:Observable<String>;
  
  editEndDate: any;
  
    constructor(
        private _calendar: MatCalendar<D>, 
        private _dateAdapter: DateAdapter<Date>,
        // protected languageService: LanguageService,
        cdr: ChangeDetectorRef,
        protected dateRangePickerHeaderService:DateRangePickerHeaderService
    ) {
      // this.languageService.getActive().subscribe((language) => {
      //   let selectedLanguage;
      //   switch (language) {
      //     case 'zh':
      //       selectedLanguage = 'zh-CN';
      //       break;
      //     case 'zh_TW':
      //       selectedLanguage = 'zh-TW';
      //       break;
      //     case 'pt':
      //       selectedLanguage = 'pt-BR';
      //       break;
      //     default:
      //       selectedLanguage = language;
      //       break;
      //   }
      //   this._dateAdapter.setLocale(selectedLanguage);
      //   this._dateAdapter.getDayOfWeekNames('narrow');
      // });
      // _calendar.stateChanges
      //     .pipe(takeUntil(this._destroyed))
      //     .subscribe(() => cdr.markForCheck());
    }
  
    ngOnDestroy() {
      // this.dateRangePickerHeaderService.resetValidation();
      this._destroyed.next();
      this._destroyed.complete();
    }
  
    get selectedStartDate() {
      if(this._calendar.selected?.['start'] != null){
        console.log("start",this._calendar.selected['start'])
        return moment(this._calendar.selected['start']).format('DD.MM.YYYY');
      }
      if(this.editStartDate){
        return this.editStartDate;
      }
    }
  
    get selectedEndDate() {
      if(this._calendar.selected?.['end']){
        return moment(this._calendar.selected['end']).format('DD.MM.YYYY');
      }
      if(this.editEndDate){
        return this.editEndDate;
      }
    }
  
    setStartDate(event?){
      let startDate = moment(event.target.value, 'DD.MM.YYYY', true);
      if(startDate.isValid()){
        this.dateRangePickerHeaderService.setValidationError('invalidStartDate', false);
        this.dateRangePickerHeaderService.setValidationError('invalidDateRange', false);
        this.editStartDate = null;
        this._calendar.selected['start'] =  new Date(startDate.format('MM/DD/YYYY'));
         this._calendar.updateTodaysDate();
      }else{
        this.dateRangePickerHeaderService.setValidationError('invalidStartDate', true);
        this.editStartDate = event.target.value;
        this._calendar.selected['start'] =  null;
        this._calendar.updateTodaysDate();
      }
    }
  
    setEndDate(event){
      let endDate = moment(event.target.value, 'DD.MM.YYYY', true);
      if(endDate.isValid()){
        this.dateRangePickerHeaderService.setValidationError('invalidEndDate', false);
        this.dateRangePickerHeaderService.setValidationError('invalidDateRange', false);
        this.editEndDate = null;
        this._calendar.selected['end'] =  new Date(endDate.format('MM/DD/YYYY'));
        this._calendar.updateTodaysDate();
      }else{
        this.dateRangePickerHeaderService.setValidationError('invalidEndDate', true);
        this.editEndDate = event.target.value;
        this._calendar.selected['end'] =  null;
        this._calendar.updateTodaysDate();
      }
    }
  
    ngOnInit(): void {
      this.dateRangeError = this.dateRangePickerHeaderService.getValidationError().pipe(
        map((data) => {
          return data;
        })
      )

      this._calendar.stateChanges.subscribe(() => {
        let start = this._calendar.selected?.['start'];
        let end = this._calendar.selected?.['end'];
  
        if(start){
          this.dateRangePickerHeaderService.setValidationError('invalidStartDate', false);
        }

        if(end){
          this.dateRangePickerHeaderService.setValidationError('invalidEndDate', false);
        }
      })
    }
  }
  