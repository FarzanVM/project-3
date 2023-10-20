import { Component, HostListener, Input, OnInit } from '@angular/core';
import data from '../../../../data/browseStructureTree.json'
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-categorynavigation',
  templateUrl: './categorynavigation.component.html',
  styleUrls: ['./categorynavigation.component.scss']
})
export class CategorynavigationComponent implements OnInit {
  constructor(private productService: ProductService) { }

  navOpen: boolean = false;

  childrenArray: any = {}
  selectedIds: any = {}
  selectedIndex: any = {}
  data: any = data.navigationNode.children;

  found: boolean = false;

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
    this.onOpenChildren(0, index, id)
  }

  clearDataFrom(index) {
    const len = Object.keys(this.selectedIds).length
    for (let i = index; i < len; i++) {
      this.selectedIds[i] = ""
    }
  }
/**
 * 
 * @param section_index ''
 * @param childIndex 
 * @param Id 
 */
  onOpenChildren(section_index, childIndex, Id) {
    console.log("children",this.childrenArray[0])
    if (this.selectedIds[section_index] == Id) {
      if (this.selectedIds[section_index + 1]) {
        this.clearDataFrom(section_index + 1)
      }
      else {
        this.clearDataFrom(section_index)
      }
    }
    else {
      this.selectedIds = { ...this.selectedIds, [section_index]: Id }
      this.selectedIndex = { ...this.selectedIndex, [section_index]: childIndex }
      this.clearDataFrom(section_index + 1)
      if (section_index == 0) {
        this.productService.getfirstChild().subscribe(
          response => {
            for(let item of this.childrenArray[0]){
              if(item.uid==Id){
                item.children=response
              }
            }
          }
        )
      }

      else if (section_index == 1) {
        this.productService.getsecondChild().subscribe(
          response => {
            this.found = false
            this.AssignChildren(this.childrenArray[0][1], 'ELEC.NAV.0.4', response)
          }
        )
      }
      else if (section_index == 2) {
        this.productService.getthirdChild().subscribe(
          response => {
            this.found = false;
            this.AssignChildren(this.childrenArray[0][1], 'ELEC.NAV.0.4.1', response)
          }
        )
      }
      else if (section_index == 3) {
        this.productService.getfourthChild().subscribe(
          response => {
            this.found = false;
            this.AssignChildren(this.childrenArray[0][1], 'ELEC.NAV.0.4.1.1', response)

          }
        )
      }
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
  AssignChildren(node: any, id: any, children: any) {
    if (node.uid == id) {
      node.children = children
      this.found = true
      return
    }
    if (node.hasOwnProperty('children')) {
      node.children.forEach((element: any) => {
        if (!this.found) {
          this.AssignChildren(element, id, children)
        }
      });
    }

  }

  ngOnInit(): void {
    // this.childrenArray={0:this.data};
    this.productService.getRootElements().subscribe(
      response => {
        this.childrenArray = { 0: response['navigationNode'].children }
      }
    )
  }

}
