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

  ngDoCheck(){
    // if any change happends in the application look for cartitems
    const item = localStorage.getItem('cartitems');
    if(item){
      const l = JSON.parse(item)
      this.cartlength=l.length;
    }
  }
 
  ngOnInit(): void {
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
