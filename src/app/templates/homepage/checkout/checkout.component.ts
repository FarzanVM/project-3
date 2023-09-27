import { Component, OnInit, Renderer2 } from '@angular/core';
import data from '../../../../data/data.json'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from './custom-validator';
import { countries, states, month, year } from './country';
import { distinctUntilChanged } from 'rxjs';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addressForm: FormGroup | any;
  paymentForm: FormGroup | any;
  deliveryForm: FormGroup | any;
  // delivary:any;
  // delivarydate:any;
  cartItemId: number[] = []
  cartitems: any[] = [];
  section = { billing: "none", delivery: "none", payment: "none", review: "none", confirm: "none" }

  countries: string[] = []
  states: string[] = []
  months: string[] = []
  years: string[] = []

  opencountry: boolean = false;
  openstate: boolean = false;
  countrydirty: boolean = false;
  statedirty: boolean = false;
  openmonth: boolean = false;
  openyear: boolean = false;
  monthdirty: boolean = false;
  yeardirty: boolean = false;
  grandTotal: number = 0;

  confirm: boolean = false;
  payment: boolean = false;
  delivery: boolean = false;
  review: boolean = false;

  // getting todays and last of 7 days
  today: Date = new Date(new Date().toISOString().split('T')[0]);
  lastdate: any = new Date(new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);




  numberPattern = "^\d{10}$";

  constructor(private fb: FormBuilder,private renderer:Renderer2) { }

  ngOnInit(): void {

    this.countries = countries;
    this.states = states;
    this.months = month;
    this.years = year;
    console.log("today", this.today);
    console.log("lastdate", this.lastdate)
    // creating forms
    this.addressForm = this.fb.group({
      firstname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(1)]),
      middlename: new FormControl(''),
      company: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    })

    // formcontrol for delivary
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
    // adding validation  to deliverydate type is express delivery
    this.deliveryForm.get('deliverymthd').valueChanges.subscribe((data: any) => {
      console.log(data)
      if (data == "Express delivery") {
        this.deliveryForm.get('deliverydate').setValidators([Validators.required, CustomValidator.validdate])
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
      console.log(data)
    })
    this.paymentForm.valueChanges.subscribe((data: any) => {
      console.log(data)
    })

    const local: any = localStorage.getItem('cartitems');
    // this.cartItemId = JSON.parse(local);
    console.log(this.cartItemId)
    if (local) {
      this.cartItemId = JSON.parse(local);
      this.cartitems = data.filter((item) => {
        console.log(item.id)
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
    console.log(this.cartitems);
    this.section.billing = "flex"
  }
  myHolidayDates = [
    {
      date:new Date("10/1/2023"),
      name:"Christmas"
    },
    {
      date:new Date("10/20/2023"),
      name:"Vishu"
    },
    {
      date: new Date("11/17/2023"),
      name:"Onam"
    },
    {
      date:new Date("11/25/2023"),
      name:"Diwali"
    },
    {
      date:new Date("10/4/2023"),
      name:"New Year"
    },
    {
      date: new Date("12/7/2023"),
      name:"Independence Day"
    },
    {
      date:new Date("12/12/2023"),
      name:"Republic Day"
    },
    {
      date:new Date("9/11/2023"),
      name:"World Cup"
    },
    {
      date:new Date("12/26/2023"),
      name:"Anime Day"
    },
    {
      date:new Date("12/25/2023"),
      name:"National Day"
    }
  ];
  // styling holidays
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {

    const date = cellDate.getTime();

    if (view == 'month') {
      return this.myHolidayDates.find(x => x.date.getTime() == date) ? 'holiday' : "";
    }
    return "";
  }
  displayHoliday(){
    console.log("yeap")
    let elements = document.querySelectorAll(".holiday");
    console.log("elements",elements)
    // let x = elements[0].querySelectorAll(".mat-calendar-body-cell");
    // console.log("body cells",x)
    elements.forEach(el=>{
      let date=el.getAttribute("aria-label")
      if (date){
        let newdate=new Date(date)
        let spec:any;
        for(let item of this.myHolidayDates){
          if(item.date.getTime() == newdate.getTime()){
            el.setAttribute('title',item.name)
            break;
          }
        }
        
      }
      console.log(date)

    })
    // const label:string|null = elements[0].getAttribute("aria-label")
    // console.log("label",label);
    // if(label){
    //   const date = new Date(label)
    //   const date2= new Date("10/1/2023")
    //   console.log("date",date);
    //   console.log("date2",date2);
    // }
    
    // elements[0].setAttribute('title',"Happy Christmas")
    // elements[0].ariaLabel = "Happy Christmas"
  }
  calOpened(event: Event | void) {
    setTimeout(() =>{
      console.log("here arrived")
      let buttons = document.querySelectorAll("mat-calendar .mat-icon-button");
      console.log(buttons)
      buttons.forEach(btn=>
        this.renderer.listen(btn,'click',()=>{
          setTimeout(()=>{
            this.displayHoliday();
            console.log("hovered",btn)
          })   
        })
      )
      this.displayHoliday();
    })
   
  }

  // myHolidayFilter = (d: Date | null): boolean => {

  //   const time = d?.getTime();
  //   return !this.myHolidayDates.find(x => x.getTime() == time);

  // }
  // styling holiday
  // filtering weekends
  filterWeekends = (d: Date | null): boolean => {
    const day = d?.getDay();
    const time = d?.getTime();

    return day !== 0 && day !== 6 && !this.myHolidayDates.find(x => x.date.getTime() == time) ;
    // && !this.myHolidayDates.find(x => x.getTime() == time)
  }
  openCountry() {
    this.opencountry = !this.opencountry;
    this.countrydirty = true
  }

  openState() {
    this.openstate = !this.openstate;
    this.statedirty = true;
  }

  openMonth() {
    this.openmonth = !this.openmonth;
    this.monthdirty = true;
  }

  openYear() {
    this.openyear = !this.openyear;
    this.yeardirty = true;
  }
  selectCountry(val: string) {
    this.opencountry = !this.opencountry
    this.addressForm.get('country').setValue(val);
    console.log(this.addressForm.get('country').value)
  }

  selectState(val: string) {
    this.openstate = !this.openstate;
    this.addressForm.get('state').setValue(val);
  }
  selectMonth(val: string) {
    this.openmonth = !this.openmonth;
    this.paymentForm.get('expmonth').setValue(val);
  }
  selectYear(val: string) {
    this.openyear = !this.openyear;
    this.paymentForm.get('expyear').setValue(val);
  }

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
