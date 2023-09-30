import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import data from '../../../../data/data.json';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  id:number=0;
  itemlist:any[]=[]
  item:any[] =[]
  constructor(private queryroute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.id = this.queryroute.snapshot.params['id'];
    this.item = data.filter(data=>data.id==this.id)
    this.itemlist=data
  }
  gotoproduct(id:number){
    this.router.navigate(['/','product',id]);
  }
  
}
