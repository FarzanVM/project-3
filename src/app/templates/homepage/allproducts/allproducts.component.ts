import { Component, OnInit } from '@angular/core';
import data from '../../../../data/data.json'

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {
  itemlist:any[]=[];
  constructor() { }
  h:string="300px"
  showcat:boolean=false;
  slideheight:number=0;

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  cartitem:number[]=[];
  qckview:boolean=false;
  quickviewitem:any[]=[]

  ngOnInit(): void {
    this.itemlist = data;
  }
  showslide(){
    this.showcat=!this.showcat;
  }
}
