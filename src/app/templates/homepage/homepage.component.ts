import { } from '@angular/compiler';
import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from '../../../data/browseStructureTree.json'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
  
  constructor(private router: Router) { }
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
 
  ngOnInit(): void {
  
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
