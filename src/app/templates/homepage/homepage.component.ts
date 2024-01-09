import { } from '@angular/compiler';
import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from '../../../data/browseStructureTree.json'
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {

  navOpen: boolean = false;

  cartlength: number = 0;
  displaydiv: boolean = false
  open: boolean = false;
  btnclass = "";

  optionList: any[] = [];

  // beSubject = new BehaviorSubject('a');
  // beSubject = new Subject()

  constructor(private router: Router,private productservice:ProductService) { }
  ngOnInit(): void {
    // this.beSubject.next('b');
    // this.beSubject.subscribe(value=>{
    //   console.log("Getting data ",value)
    // })
    // this.beSubject.next('c'); 
    // this.beSubject.next('d');
    this.productservice.beSubject.subscribe(value =>{
      console.log("Behaviour Subject Value",value)
    })
    this.productservice.beSubject.next("Bhadra")
  } 




  ngDoCheck() {
    // if any change happends in the application look for cartitems
    const item = localStorage.getItem('cartitems');
    if (item) {
      const l = JSON.parse(item)
      this.cartlength = l.length;
    }
    else {
      this.cartlength = 0;
    }
  }

  clickedOutside(hasClickedOutside) {
  }

  openNav() {
    this.navOpen=!this.navOpen
  }
  @HostListener('window:resize', ['$event'])  
  onResize(event) {  
    if(window.innerWidth<1000 || window.innerWidth>=1000){
      this.navOpen=false;
    }
  }
 
  


  gotoallproduct() {
    this.router.navigate(['/', 'allproduct'])
  }
  gotocart() {
    this.router.navigate(['/', 'cart'])
  }
  displayDiv() {
    this.displaydiv = !this.displaydiv;
  }
  
}
