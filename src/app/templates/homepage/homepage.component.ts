import {  } from '@angular/compiler';
import {Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit{

  cartlength:number=0;
  displaydiv:boolean=false
  constructor(private router:Router) { }
 
  ngOnInit(): void {
    const item = localStorage.getItem('cartitems');
    console.log("cart",item)
    if(item){
      const l = JSON.parse(item)
      this.cartlength=l.length;
    }
  }
  gotoallproduct(){
    this.router.navigate(['/','allproduct'])
  }
  gotocart(){
    this.router.navigate(['/','cart'])
  }
  displayDiv(){
    this.displaydiv = !this.displaydiv;
  }
}
