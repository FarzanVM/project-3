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

  @Input() topright;
  title:string="";

  childrenArray: any = {}
  selectedIds: any = {}//holds the ids of the options we have clicked in respective section-for styling
  selectedIndex: any = {}//holds the index of the options in each section we are currently rendering for accesssing
  visited: any = {} //to keep track of  clicked options
  data: any = data.navigationNode.children;

  found: boolean = false;//a boolean to stop the recursive call again when item is found

  // when menu btn clicked erase all data
  @Input() set navbarOpen(navbarOpen: boolean) {
    this.navOpen = navbarOpen
    if (!this.navOpen) {
      this.clearDataFrom(0)
    }
  }

  openOptions(index, id) {
    console.log(this.topright)
    if (this.selectedIds[0] == id) {
      this.clearDataFrom(0)
      return
    }
    this.onOpenChildren(0, index, id)
    this.title=this.childrenArray[0][index].title
  }

  // clearing the Ids of button we have visited when its parent button is closed
  clearDataFrom(index) {
    const len = Object.keys(this.selectedIds).length
    for (let i = index; i < len; i++) {
      this.selectedIds[i] = ""
    }
  }
  /**
   * 
   * @param section_index -Refers to the which child section in the UI we are now
   * @param childIndex -Index of the option we clicked in the array of options button in the respective child section
   * @param Id -Id of the options button we clicked-to get its respective children from api
   */
  onOpenChildren(section_index, childIndex, Id) {
    // if the Ids in the respective section is again clicked
    if (this.selectedIds[section_index] == Id) {
      if (this.selectedIds[section_index + 1]) {
        this.clearDataFrom(section_index + 1)  //closing all its childrens if any one is opened
      }
      else {
        this.clearDataFrom(section_index) //else closing all including itself
      }
    }
    else {
      this.selectedIds = { ...this.selectedIds, [section_index]: Id }
      this.selectedIndex = { ...this.selectedIndex, [section_index]: childIndex }
      this.clearDataFrom(section_index + 1)
      // getting the respective children from api if it is not visited

      if (!this.visited[Id]) {
        this.visited[Id]=true
        this.productService.getAllChildren(Id).subscribe(
          response => {
            this.found = false //reseting found
            // passing only the newnode children to assign
            this.AssignChildren(this.childrenArray[0][this.selectedIndex[0]], Id, response.children)

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

  // assigning the children to its respective parent
  /**
   * 
   * @param node root node 
   * @param id Id of parent to which childrens are setting
   * @param children children array from the api
   * @returns Nothing
   */
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
    // getting root options- Metal finishing and Electonics when conponent initialized
    this.productService.getAllChildren("AtotechCategoryNavNode").subscribe(data => {

      this.childrenArray = { 0: data.children }
    })
  }

}
