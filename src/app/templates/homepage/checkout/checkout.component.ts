import { Component, OnInit, Renderer2 } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './custom-validator';
import { countries, states, month, year } from './country';
import { Observable, distinctUntilChanged } from 'rxjs';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { myHolidayDates } from './holidays';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { AlertComponent } from './alert/alert.component';
import { Store, select } from '@ngrx/store';
import * as AllActions from '../../../store/product.action';
import { cartItemsSelector, userSelector } from '../../../store/store.selector';
import { Product, User } from 'src/shared/interfaces';
import { DateRagePickerHeader} from '../date-rangepicker-header/date-rangepicker-header.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  user:User;

  addressForm: FormGroup | any;
  paymentForm: FormGroup | any;
  deliveryForm: FormGroup | any;
 
  cartItemId: number[] = []
  cartitems: any[] = [];
  cartitems$:Observable<Product[]>
  section = { billing: "none", delivery: "none", payment: "none", review: "none", confirm: "none" }

  countries: string[] = []
  states: string[] = []
  months: string[] = []
  years: string[] = []

  grandTotal: number = 0;

  confirm: boolean = false;
  payment: boolean = false;
  delivery: boolean = false;
  review: boolean = false;
  billing:boolean=false;

  myHolidayDates:any[]=[]

  // getting todays and last of 7 days
  today: Date = new Date(new Date().toISOString().split('T')[0]);
  lastdate: any = new Date(new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
dateRagePickerHeader= DateRagePickerHeader;
submissionDateRange: FormGroup<any>;

  constructor( private fb: FormBuilder,private renderer:Renderer2,private dialog:MatDialog,private store:Store) { }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {
    this.billing = true;
    this.myHolidayDates=myHolidayDates;

    this.countries = countries;
    this.states = states;
    this.months = month;
    this.years = year;
   
    // Address Form
    this.addressForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      middlename: new FormControl(''),
      company: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    })

    // delivery Form
    this.deliveryForm = this.fb.group({
      deliverymthd: new FormControl('Free delivery', Validators.required),
      deliverydate: new FormControl('')
    })

    // payment form
    this.paymentForm = this.fb.group({
      holdername: new FormControl('', [Validators.required]),
      cardnumber: new FormControl('', [Validators.required]),
      expmonth: new FormControl('', [Validators.required]),
      expyear: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required]),
    })
    // adding validation  to deliverydate when type is express delivery
    this.deliveryForm.get('deliverymthd').valueChanges.subscribe((data: any) => {
      if (data == "Express delivery") {
        this.deliveryForm.get('deliverydate').setValidators([Validators.required])
        this.deliveryForm.get('deliverydate').updateValueAndValidity();
      }
      else {
        if (this.deliveryForm.get('deliverydate').hasValidator(Validators.required)) {
          this.deliveryForm.get('deliverydate').clearValidators();
          this.deliveryForm.get('deliverydate').updateValueAndValidity()
        }
      }
    })
    
    // getting cartitems
    this.store.pipe(select(cartItemsSelector)).subscribe(item =>{
      this.cartitems=item
    })

    for(let items of this.cartitems){
      this.grandTotal += items.price
    }
    this.section.billing = "flex"
  }

  // opening warning
  openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let dialogRef = this.dialog.open(AlertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.gotoconfirm();
      }    
    })
  }

 
  // styling holidays
  // dateClass: MatCalendarCellClassFunction<Date> = (cellDate: { getTime: () => any; }, view: string) => {

  //   const date = cellDate.getTime();

  //   if (view == 'month') {
  //     return this.myHolidayDates.find(x => x.date.getTime() == date) ? 'holiday' : "";
  //   }
  //   return "";
  // }
  
// function to get the holiday on each month and adding description
  displayHoliday(){
    let elements = document.querySelectorAll(".holiday");
    elements.forEach(el=>{
      let date=el.getAttribute("aria-label")
      if (date){
        let newdate=new Date(date)

        for(let item of this.myHolidayDates){
          if(item.date.getTime() == newdate.getTime()){
           
            let span =  el.querySelectorAll('span')[0];
            span.classList.add('tooltip')
            let nxtspan = document.createElement('span');
            nxtspan.innerHTML=item.name
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
  customizeCal(){
  
      let dateBtn = document.querySelectorAll(".mat-mdc-button .mdc-button__label")
      let fullDate = dateBtn[0].childNodes[0].childNodes[0].nodeValue; // Ex. Oct 2023

      let newMonth:any = (new Date(fullDate)).toLocaleString('en', {month:'long'});

      if(newMonth=='Invalid Date'){
        newMonth=""
      }
      let newYear:any=new Date(fullDate).getFullYear();
      if(!newYear){
        newYear="Select Year"
      }
      const newFormat = newMonth+' '+newYear
      dateBtn[0].childNodes[0].childNodes[0].nodeValue=newFormat
  }
   // customzing the month label again when new month is selected
   customizeMonth(){
    setTimeout(()=>{
      this.customizeCal();
    }) 
    }
    
  // function to adding a description/tooltip to holidays triggered for each month change
  calOpened(event: Event | void) {
    setTimeout(() =>{
      let buttons = document.querySelectorAll("mat-calendar button");
      let yearbtn = document.querySelectorAll(".mat-calendar-controls button")[0]
      let navbtns = document.querySelectorAll(".mat-calendar-controls .mat-mdc-icon-button.mat-mdc-button-base") 

      navbtns[0].insertAdjacentElement('beforebegin',navbtns[1])
      yearbtn.classList.add('monthlabel')
      
      navbtns[1].insertAdjacentElement('afterend',yearbtn)
    
      buttons.forEach(btn=>
        this.renderer.listen(btn,'click',()=>{
          setTimeout(()=>{
            this.customizeCal();
            // this.displayHoliday();
          })   
        })
      )
      this.customizeCal();
      // this.displayHoliday();
    })
   
  }

  // filtering weekends and disabling them
  // filterWeekends = (d: Date | null): boolean => {
  //   const day = d?.getDay();
  //   const time = d?.getTime();
  //   const dateRange = [new Date(new Date().getFullYear(), 0, 1),
  //     new Date(new Date().getFullYear(), 23, 31)]

  //   return day !== 0 && day !== 6 && !this.myHolidayDates.find(x => x.date.getTime() == time) && (d >= dateRange[0] && d <= dateRange[1]);

  // }
//  navigation through section
  gotobilling() {
    this.section.delivery = "none"
    this.section.billing = "flex"
    this.section.payment = "none"
    this.section.review = "none"
    this.section.confirm = "none";
  }
  gotodelivery() {
    this.delivery = true;
    this.section.delivery = "flex"
    this.section.billing = "none"
    this.section.payment = "none"
    this.section.review = "none"
    this.section.confirm = "none";

    const billinginfo = {
      name:this.addressForm.get('firstname').value,
      email:this.addressForm.get('email').value,
      phone:this.addressForm.get('phone').value,
      country:this.addressForm.get('country').value,
      city:this.addressForm.get('city').value,
      state:this.addressForm.get('state').value,
      zip:this.addressForm.get('zip').value,
      address:this.addressForm.get('address').value
    }
    this.store.dispatch(AllActions.postBilling({billinginfo}));
    // this.store.subscribe(state =>{
    //   console.log("Sttae",state)
    // })

  }
  gotopayment() {
    this.payment = true;
    this.section.delivery = "none"
    this.section.billing = "none"
    this.section.payment = "flex"
    this.section.review = "none"
    this.section.confirm = "none";

    const deliveryinfo = {
      deliverytype:this.deliveryForm.get('deliverymthd').value,
      deliverydate:this.deliveryForm.get('deliverydate').value
    }
    this.store.dispatch(AllActions.postDelivery({deliveryinfo}))

  }
  gotoreview() {
    this.review = true
    this.section.delivery = "none"
    this.section.billing = "none"
    this.section.payment = "none"
    this.section.review = "flex"
    this.section.confirm = "none";
    const cardno = this.paymentForm.get('cardnumber').value;
    this.store.dispatch(AllActions.postCard({cardno}))
   
    this.store.pipe(select(userSelector)).subscribe(data =>{
      this.user = data
    });
  }
  gotoconfirm() {
    this.confirm = true;
    this.delivery = false;
    this.review = false;
    this.payment = false;
    this.billing=false;
    this.section.delivery = "none"
    this.section.billing = "none"
    this.section.payment = "none"
    this.section.review = "none"
    this.section.confirm = "flex";
    this.deliveryForm.reset();
    this.addressForm.reset();
    this.paymentForm.reset();
    localStorage.removeItem('cartitems');
    localStorage.removeItem('user');
  }

}
