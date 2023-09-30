import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import data from '../../../../data/data.json'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {

  index=0;
  imglist:string[]=["assets/images/background/shoes.jpg","assets/images/background/shirts.jpg","assets/images/background/watch.jpg"]
  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  itemlist:any[] =[];
  // cartitem:number[]=[];
  qckview:boolean=false;
  quickviewitem:any[]=[]

  constructor(private sanitizer: DomSanitizer,private router:Router) { 
    
  }
 
  ngOnInit(): void {
    // getting item data from json
    this.itemlist = data;
  }

  goleft(i:number){
    this.index+=i
    if(this.index<0){
      this.index=this.imglist.length-1
    }

  }
  goright(i:number){
    this.index+=i
    if(this.index>=this.imglist.length){
      this.index=0;
    }

  }
  gotoproduct(id:number){
    this.router.navigate(['/','product',id])
  }
}
