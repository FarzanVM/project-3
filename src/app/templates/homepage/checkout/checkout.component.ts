import { Component, OnInit } from '@angular/core';
import data from '../../../../data/data.json'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addressForm:FormGroup | any;
  paymentForm:FormGroup|any;
  delivary:any;
  cartItemId:number[]=[]
  cartitems:any[]=[];
  section ={billing:"none",delivery:"none",payment:"none",review:"none",confirm:"none"}

  grandTotal:number=0;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    // creating forms
    this.addressForm = this.fb.group({
      firstname:new FormControl('',[Validators.required]),
      lastname:new FormControl('',Validators.required),
      middlename:new FormControl('',Validators.required),
      company:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      phone:new FormControl('',Validators.required),
      country:new FormControl('',Validators.required),
      city:new FormControl('',Validators.required),
      state:new FormControl('',Validators.required),
      zip:new FormControl('',Validators.required),
      address:new FormControl('',Validators.required),
    })

    // formcontrol for delivary
    this.delivary=new FormControl('',[Validators.required]);
    // payment form
    this.paymentForm = this.fb.group({
      holdername:new FormControl('',[Validators.required]),
      cardnumber:new FormControl('',[Validators.required]),
      expmonth:new FormControl('',[Validators.required]),
      expyear:new FormControl('',[Validators.required]),
      cvv:new FormControl('',[Validators.required]),
    })

    this.delivary.valueChanges.subscribe((data:any) =>{
      console.log(data)
    })

    this.addressForm.valueChanges.subscribe((data: any)=>{
      console.log(data)
    })
    this.paymentForm.valueChanges.subscribe((data: any)=>{
      console.log(data)
    })

    const local:any = localStorage.getItem('cartitems');
    this.cartItemId = JSON.parse(local);
    console.log(this.cartItemId)
    
    this.cartitems = data.filter((item) =>{
      console.log(item.id)
      for(let itemid of this.cartItemId){
        if(itemid===item.id){
          return true
        }
      }
      return false
    })

    console.log(this.cartitems);

    for(let item of this.cartitems){
      this.grandTotal+=item.price;
    }


    this.section.billing = "flex"
  }



  clicked(){
    console.log("yessss")
  }

  gotobilling(){
    this.section.delivery="none"
    this.section.billing="flex"
    this.section.payment="none"
    this.section.review="none"
    this.section.confirm="none";
  }

  gotodelivery(){
    this.section.delivery="flex"
    this.section.billing="none"
    this.section.payment="none"
    this.section.review="none"
    this.section.confirm="none";
  }
  gotopayment(){
    this.section.delivery="none"
    this.section.billing="none"
    this.section.payment="flex"
    this.section.review="none"
    this.section.confirm="none";
  }
  gotoreview(){
    this.section.delivery="none"
    this.section.billing="none"
    this.section.payment="none"
    this.section.review="flex"
    this.section.confirm="none";
  }
  gotoconfirm(){
    this.section.delivery="none"
    this.section.billing="none"
    this.section.payment="none"
    this.section.review="none"
    this.section.confirm="flex";
    this.addressForm.reset();
    this.paymentForm.reset();
    localStorage.setItem('cartitems',"");
  }

}
