import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-service';
import { Item } from '../Item';
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  items:any = [];
  doesItemsExist:boolean = false;
  constructor(private router: Router, private itemService: ItemService) {
    this.itemService.loadItems().subscribe((response)=>{
      console.log('response is ', response[0])
      this.items = response;
      this.doesItemsExist = this.items.length !== 0;
      console.log(this.doesItemsExist);
      
    },(error) => {
        console.log('error is ', error)
    });
  }

  deleteUser(item: Item): void {
    this.itemService.deleteUser(item._id)
      .subscribe( data => {
        this.items = this.items.filter(i => i._id !== item._id);
        this.doesItemsExist = this.items.length !== 0;
      })
  };

  editItem(item: Item): void {
    this.cacheItemId(item);
    this.router.navigate(['edit-item']);
  }

  itemsIn(item: Item) {
    this.cacheItemId(item);
    this.router.navigate(['item-go-in']);
  }

  itemsOut(item: Item) {
    try {
      this.cacheItemId(item);
      this.router.navigate(['item-come-out']);
    } catch (e) {
      throw e;
    }
  }


  cacheItemId(item) {
    window.localStorage.removeItem("editItemId");
    window.localStorage.setItem("editItemId", item._id);
  }
  ngOnInit(){  }
}
