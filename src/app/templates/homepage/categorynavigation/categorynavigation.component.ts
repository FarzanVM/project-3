import { Component, HostListener, Input, OnInit } from '@angular/core';
import data from '../../../../data/browseStructureTree.json'
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-categorynavigation',
  templateUrl: './categorynavigation.component.html',
  styleUrls: ['./categorynavigation.component.scss']
})
export class CategorynavigationComponent implements OnInit {
  constructor(private productService: ProductService){}

  navOpen: boolean = false;

  childrenArray:any={}
  selectedIds:any={}
  data: any = data.navigationNode.children;

  // when menu btn clicked erase all data
  @Input() set navbarOpen(navbarOpen: boolean) {
    this.navOpen = navbarOpen
    if (!this.navOpen) {
      this.clearDataFrom(0)
    }
  }
  
  openOptions(index, id) {
    if (this.selectedIds[0] == id) {
      this.clearDataFrom(0)
      return
    }
    this.onOpenChildren(0, index)
  }

  clearDataFrom(index) {
    const len = Object.keys(this.selectedIds).length
    for (let i = index; i < len; i++) {
      this.selectedIds[i] = ""
    }
  }

  onOpenChildren(index, childIndex) {
    const children = this.childrenArray[index][childIndex].children
    const Id = this.childrenArray[index][childIndex].uid
    if (this.selectedIds[index] == Id) {
      if (this.selectedIds[index + 1]) {
        this.clearDataFrom(index + 1)
      }
      else {
        this.clearDataFrom(index)
      }
    }
    else {
      this.selectedIds={...this.selectedIds,[index]:Id}
      this.clearDataFrom(index + 1)
      this.childrenArray={...this.childrenArray,[index+1]:children}
      console.log(this.childrenArray)
    }
  }
  // reseting on window resizing
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 1000 || window.innerWidth >= 1000) {
      this.navOpen = false;
      this.clearDataFrom(0)
    }
  }
  // closing when clicked outside
  clickedOutside(event) {
    if (event) {
      this.clearDataFrom(0)
    }
  }
  ngOnInit(): void {
    // this.childrenArray={0:this.data};
    this.productService.getRootElements().subscribe(
      response => {
        this.childrenArray={0:response['navigationNode'].children}
      }
    )
    this.productService.getfirstChild().subscribe(
      response=>{    
        for(let item of this.childrenArray[0]){
          if(item.uid==='ELEC.NAV.0'){
            item.children=response
          }
        }
        // console.log(this.childrenArray[0][1].children)
      }
    )
    this.productService.getsecondChild().subscribe(
      response=>{
        // console.log("response",response)
        this.AssignChildren(this.childrenArray[0][1],'ELEC.NAV.0.4',response)
        console.log(this.childrenArray[0])
      }
    )
  }

  AssignChildren(node,id,children){
    // console.log("node",node)
    if(node.uid==id){
      node.children=children
      console.log("found")
      return
    }
    for(let item in node.children){
      this.AssignChildren(item,id,children)
    }

  }
}
