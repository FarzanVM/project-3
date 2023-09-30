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
    // if cartitems exist in local storage
    if(local){
      this.empty=false
      this.cartItemId = JSON.parse(local);  
      this.cartitems = data.filter((item) =>{
        for(let itemid of this.cartItemId){
          if(itemid===item.id){
            return true
          }
        }
        return false
      })
      // finding the total price
      for(let item of this.cartitems){
        this.total+=item.price;
      }
    }

    if(!local){
      this.empty=true;
    }
    
  }

  clearAll(){
    this.cartitems=[];
    this.empty=true;
    localStorage.setItem('cartitems',"");
  }

  // deleting from cart items and updating the localstorage
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
    newlist=newlist.filter(item=>{
      return item!=undefined
    })
    if(newlist.length==0){
      this.empty=true;
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
