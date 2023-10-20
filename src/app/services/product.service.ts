import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/shared/interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  found:boolean=false; //a boolean to stop the recursive call again when item is found
  newNode:any;
  constructor(private http:HttpClient) { }

  // finding the children of given parentId
  findChildren(node: any, id: any) {
    if (node.uid == id) {
      // reseting the each childrens children property & returning a new node
      for(let item of node.children){
        if(item.children.length>0){
          item.children=[]
          item.hasChildren=true
        }  
      }
      this.newNode=node  
      this.found=true   
      return 
    }
    if (node.hasOwnProperty('children')) {
      node.children.forEach((element: any) => {
        if (!this.found) {
          this.findChildren(element, id)
        }
      });
    }
  }

  // service to get all products from api
  getAllProducts(){
    return this.http.get<Product[]>("http://localhost:3000/allproducts");
  }
  /**
   * 
   * @param Id Id of parent to get its children
   * @returns A new parent with its children and their respective children set to empty
   */
  getAllChildren(Id){
    return this.http.get('http://localhost:4200/data/allBrowseStructure.json').pipe(map(
      (response )=>{
        this.newNode={}
        this.found=false
        this.findChildren(response['navigationNode'],Id)
       
        return this.newNode
      }
    )
    )

  }
}
