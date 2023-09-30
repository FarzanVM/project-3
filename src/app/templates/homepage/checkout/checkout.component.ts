import { Component, OnInit, Renderer2 } from '@angular/core';
import data from '../../../../data/data.json'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './custom-validator';
import { countries, states, month, year } from './country';
import { distinctUntilChanged } from 'rxjs';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { myHolidayDates } from './holidays';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addressForm: FormGroup | any;
  paymentForm: FormGroup | any;
  deliveryForm: FormGroup | any;
 
  cartItemId: number[] = []
  cartitems: any[] = [];
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

  constructor(private fb: FormBuilder,private renderer:Renderer2,private dialog:MatDialog) { }

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

    this.addressForm.valueChanges.subscribe((data: any) => {
      // console.log(data)
    })
    this.paymentForm.valueChanges.subscribe((data: any) => {
      // console.log(data)
    })

    // getting iems which are gonna purchase
    const local: any = localStorage.getItem('cartitems');
    if (local) {
      this.cartItemId = JSON.parse(local);
      this.cartitems = data.filter((item) => {
        for (let itemid of this.cartItemId) {
          if (itemid === item.id) {
            return true
          }
        }
        return false
      })

      for (let item of this.cartitems) {
        this.grandTotal += item.price;
      }

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
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getTime();

    if (view == 'month') {
      return this.myHolidayDates.find(x => x.date.getTime() == date) ? 'holiday' : "";
    }
    return "";
  }
  
// function to get the holiday on each month and adding description
  displayHoliday(){
    let elements = document.querySelectorAll(".holiday");
    elements.forEach(el=>{
      let date=el.getAttribute("aria-label")
      if (date){
        let newdate=new Date(date)

        for(let item of this.myHolidayDates){
          if(item.date.getTime() == newdate.getTime()){

            el.setAttribute('title',item.name)
            let div = el.querySelectorAll('div')[0];
  
            div.classList.add('tooltip')
      
            let spans = el.querySelectorAll('span');
            if(spans.length>0){
              let span = spans[0];
              span.innerHTML=item.name;
            }
            else{
              let span = document.createElement('span');
              span.innerHTML=item.name;
              span.classList.add('tooltiptext')
              div.appendChild(span);
            }
            
            break;
          }
        }
        
      }
    })
  }
  // function to adding a description/tooltip to holidays triggered for each month change
  calOpened(event: Event | void) {
    setTimeout(() =>{
      let buttons = document.querySelectorAll("mat-calendar .mat-icon-button");
      buttons.forEach(btn=>
        this.renderer.listen(btn,'click',()=>{
          setTimeout(()=>{
            this.displayHoliday();
          })   
        })
      )
      this.displayHoliday();
    })
   
  }

  // filtering weekends and disabling them
  filterWeekends = (d: Date | null): boolean => {
    const day = d?.getDay();
    const time = d?.getTime();

    return day !== 0 && day !== 6 && !this.myHolidayDates.find(x => x.date.getTime() == time) ;

  }
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
  }
  gotopayment() {
    this.payment = true;
    console.log("here arrived")
    this.section.delivery = "none"
    this.section.billing = "none"
    this.section.payment = "flex"
    this.section.review = "none"
    this.section.confirm = "none";
  }
  gotoreview() {
    this.review = true
    this.section.delivery = "none"
    this.section.billing = "none"
    this.section.payment = "none"
    this.section.review = "flex"
    this.section.confirm = "none";
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
    console.log("cart items deleted")
  }

}
