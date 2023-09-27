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

  msglist:string[] = ["Added to wishlist","Added to Cart","Added to Compare"]
  msg:string|any="";

  itemlist:any[] =[];
  // cartitem:number[]=[];
  qckview:boolean=false;
  quickviewitem:any[]=[]

  constructor(private sanitizer: DomSanitizer,private router:Router) { 
    
  }
 
  ngOnInit(): void {
    this.itemlist = data;
    console.log(this.itemlist)
    for(let item of this.itemlist){
      console.log(item.imgsrc)
    }
  }
  gotoproduct(id:number){
    console.log(id)
    this.router.navigate(['/','product',id])
  }
}
