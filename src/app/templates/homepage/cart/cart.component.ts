import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import data from '../../../../data/data.json'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItemId:number[]=[]
  cartitems:any[]=[];
  empty:boolean =true;
  total:number=0;

  constructor(private router:Router) { }

  ngOnInit(): void {
    const local:any = localStorage.getItem('cartitems');
    console.log("local",local,local.length)
    if(local.length>0){
      this.empty=false
      this.cartItemId = JSON.parse(local);
      console.log(this.cartItemId)
      
      this.cartitems = data.filter((item) =>{
        for(let itemid of this.cartItemId){
          if(itemid===item.id){
            return true
          }
        }
        return false
      })

      for(let item of this.cartitems){
        this.total+=item.price;
      }
      console.log("total",this.total)


    }
   
    console.log(this.cartitems);

    if(!local){
      this.empty=true;
      console.log("items empty")
    }
    
  }

  clearAll(){
    this.cartitems=[];
    localStorage.setItem('cartitems',"");
  }

  deletefromcart(id:number){
    let newlist:number[]=[]
    for(let i=0;i<this.cartitems.length;i++){
      if(this.cartitems[i]?.id == id){
        delete this.cartitems[i];
        
      }
      else{
        newlist.push(this.cartitems[i]?.id)
      }
    }
    console.log("newlist",newlist)
    if(newlist[0]==undefined){
      localStorage.setItem('cartitems',"");
    }
    else{
      localStorage.setItem('cartitems',JSON.stringify(newlist));
    }
    
  }

  gotocheckout(){
    this.router.navigate(['/','checkout'])
  }
}
