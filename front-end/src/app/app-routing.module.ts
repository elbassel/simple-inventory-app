import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListItemsComponent } from './list-items/list-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemGoInComponent } from './item-go-in/item-go-in.component'
import { ItemComeOutComponent } from './item-come-out/item-come-out.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path: 'list-items', component: ListItemsComponent},
  { path: 'addItem', component: AddItemComponent },
  { path: 'edit-item', component: EditItemComponent},
  { path: 'item-go-in', component: ItemGoInComponent},
  { path: 'item-come-out', component: ItemComeOutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
